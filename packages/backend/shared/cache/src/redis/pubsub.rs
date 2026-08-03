use futures_util::StreamExt;
use redis::Client;
use serde::{de::DeserializeOwned, Serialize};
use std::{collections::HashMap, sync::Arc, time::Duration};
use tokio::sync::{broadcast, Mutex};
use tokio_stream::wrappers::BroadcastStream;

use crate::redis::{
    connection::RedisConnection, 
    error::{
        Error as CacheError, Result as CacheResult,
    }
};

#[derive(Clone)]
pub struct RedisPubSub {
    client: Client,
    channels: Arc<Mutex<HashMap<String, broadcast::Sender<String>>>>,
}

impl RedisPubSub {
    pub fn new(url: String) -> CacheResult<Arc<Self>> {
        let client = RedisConnection::new(url)?.get_client().clone();

        Ok(Arc::new(Self {
            client,
            channels: Arc::new(Mutex::new(HashMap::new())),
        }))
    }

    pub fn publish<T: Serialize>(&self, channel: &str, msg: &T) -> CacheResult<()> {
        let mut con = self.client.get_connection()?;
        let payload = serde_json::to_string(msg)?;
        redis::cmd("PUBLISH")
            .arg(channel)
            .arg(payload)
            .query::<i32>(&mut con)?;
        Ok(())
    }

    pub async fn publish_async<T: Serialize>(
        self: &Arc<Self>,
        channel: &str,
        msg: &T,
    ) -> CacheResult<()> {
        let this = self.clone();
        let channel = channel.to_string();
        let payload = serde_json::to_string(msg)?;

        let join_res = tokio::task::spawn_blocking(move || {
            let mut con = this.client.get_connection()?;
            redis::cmd("PUBLISH")
                .arg(&channel)
                .arg(payload)
                .query::<i32>(&mut con)?;
            Ok::<(), CacheError>(())
        })
            .await?; // JoinError -> CacheError via From
        join_res?; // propagate CacheError if inner task returned Err
        Ok(())
    }

    pub async fn stream<T>(self: &Arc<Self>, channel: &str) -> impl futures_util::Stream<Item = T>
    where
        T: DeserializeOwned + Send + 'static,
    {
        let rx = self.ensure_channel(channel).await;
        BroadcastStream::new(rx).filter_map(|item| async move {
            match item {
                Ok(raw) => serde_json::from_str::<T>(&raw).ok(),
                Err(_) => None,
            }
        })
    }

    async fn ensure_channel(&self, channel: &str) -> broadcast::Receiver<String> {
        {
            let map = self.channels.lock().await;
            if let Some(tx) = map.get(channel) {
                return tx.subscribe();
            }
        }

        let (tx, _first_rx) = broadcast::channel::<String>(1024);
        {
            let mut map = self.channels.lock().await;
            map.insert(channel.to_string(), tx.clone());
        }

        let client = self.client.clone();
        let channel_name = channel.to_string();
        let tx_for_task = tx.clone();

        tokio::task::spawn_blocking(move || {
            loop {
                let mut con = match client.get_connection() {
                    Ok(c) => c,
                    Err(_) => {
                        std::thread::sleep(Duration::from_secs(2));
                        continue;
                    }
                };

                let mut pubsub = con.as_pubsub();
                if pubsub.subscribe(&channel_name).is_err() {
                    std::thread::sleep(Duration::from_secs(2));
                    continue;
                }

                loop {
                    match pubsub.get_message() {
                        Ok(msg) => {
                            if let Ok(payload) = msg.get_payload::<String>() {
                                let _ = tx_for_task.send(payload);
                            }
                        }
                        Err(_) => {
                            break; // Exit inner loop to reconnect
                        }
                    }
                }
            }
        });

        tx.subscribe()
    }
}
