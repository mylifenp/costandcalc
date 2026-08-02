mod redis;

use std::error::Error;
use std::sync::Arc;

pub use redis::cache::RedisCache;
pub use redis::channels::*;
pub use redis::connection::RedisConnection;
pub use redis::pubsub::RedisPubSub;

pub fn init_cache(
    redis_url: String,
    cache_name: &str,
) -> Result<RedisCache, Box<dyn Error + Send + Sync>> {
    let redis_conn = RedisConnection::new(redis_url).expect("redis connection");
    let cache = RedisCache::new(redis_conn.clone(), cache_name);
    Ok(cache)
}

pub fn init_pubsub(pubsub_url: String) -> Result<Arc<RedisPubSub>, Box<dyn Error + Send + Sync>> {
    let pubsub = RedisPubSub::new(pubsub_url)?;
    Ok(pubsub)
}
