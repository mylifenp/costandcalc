use crate::redis::connection::RedisConnection;
use crate::redis::error::Result as CacheResult;
use redis::AsyncCommands;
use serde::{Serialize, de::DeserializeOwned};

#[derive(Clone)]
pub struct RedisCache {
    conn: RedisConnection,
    prefix: String,
}

impl RedisCache {
    pub fn new(conn: RedisConnection, prefix: impl Into<String>) -> Self {
        Self {
            conn,
            prefix: prefix.into(),
        }
    }

    fn k(&self, key: &str) -> String {
        format!("{}:{}", self.prefix, key)
    }

    pub async fn get_json<T: DeserializeOwned>(&self, key: &str) -> CacheResult<Option<T>> {
        let mut c = self.conn.multiplexed().await?;
        let raw: Option<String> = c.get(self.k(key)).await?;
        Ok(match raw {
            Some(s) => serde_json::from_str::<T>(&s).ok(),
            None => None,
        })
    }

    pub async fn set_json<T: Serialize>(
        &self,
        key: &str,
        value: &T,
        ttl_secs: usize,
    ) -> CacheResult<()> {
        let mut c = self.conn.multiplexed().await?;
        let s = serde_json::to_string(value)?;
        // SET key value EX ttl
        let _: () = redis::pipe()
            .cmd("SET")
            .arg(self.k(key))
            .arg(s)
            .arg("EX")
            .arg(ttl_secs)
            .query_async(&mut c)
            .await?;
        Ok(())
    }

    pub async fn del(&self, key: &str) -> CacheResult<()> {
        let mut c = self.conn.multiplexed().await?;
        let _: () = c.del(self.k(key)).await?;
        Ok(())
    }

    pub async fn get_or_set_json<T, F>(&self, key: &str, ttl_secs: usize, f: F) -> CacheResult<T>
    where
        T: Serialize + DeserializeOwned + Clone,
        F: (FnOnce() -> T),
    {
        if let Some(v) = self.get_json::<T>(key).await? {
            return Ok(v);
        }
        let v = f();
        self.set_json(key, &v, ttl_secs).await?;
        Ok(v)
    }
}
