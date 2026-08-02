use std::sync::Arc;
// use backend_libs_cache::RedisCache;
use async_graphql::{Context, ID, Object, Result};

use crate::{
    graphql::schema::communication::Communication,
    repositories::{Repositories, communication::CommunicationRepository}
};

#[derive(Default)]
pub struct CommunicationQuery;

#[Object]
impl CommunicationQuery {
    async fn communications(&self, ctx: &Context<'_>) -> Result<Vec<Communication>> {
        let repos = ctx.data::<Arc<Repositories>>()?;

        // let cache_key = "communications:all";
        // let cache = ctx.data::<RedisCache>()?;
        // if let Some(cached_communications) = cache.get_json::<Vec<Communication>>(cache_key).await? {
        //     return Ok(cached_communications);
        // }

        let communication = repos.communication_repo.list().await?;
        let communication_models: Vec<Communication> = communication.into_iter().map(Communication::from).collect();

        // cache.set_json(cache_key, &communication_models, 300).await?;

        Ok(communication_models)
    }
    async fn communication(&self, ctx: &Context<'_>, id: ID) -> Result<Option<Communication>> {
        // let cache_key = format!("communications:{}", id.to_string());
        // let cache = ctx.data::<RedisCache>()?;
        // if let Some(cached_communication) = cache.get_json::<Communication>(&cache_key).await? {
        //     return Ok(Some(cached_communication));
        // }

        let repos = ctx.data::<Arc<Repositories>>()?;
        let communication_opt = repos.communication_repo.get_by_id(&id).await?;

        // if let Some(communication) = &communication_opt {
        //     cache.set_json(&cache_key, communication, 3000).await?;
        // }
        Ok(communication_opt.map(Communication::from))
    }
}
