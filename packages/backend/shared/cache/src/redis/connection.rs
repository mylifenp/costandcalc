use redis::{aio::MultiplexedConnection, Client, RedisError};

#[derive(Clone)]
pub struct RedisConnection {
    client: Client,
}

impl RedisConnection {
    pub fn new(url: String) -> Result<Self, RedisError> {
        Ok(Self {
            client: Client::open(url)?,
        })
    }

    pub fn get_client(&self) -> &Client {
        &self.client
    }

    pub async fn multiplexed(&self) -> redis::RedisResult<MultiplexedConnection> {
        self.client.get_multiplexed_async_connection().await
    }
}
