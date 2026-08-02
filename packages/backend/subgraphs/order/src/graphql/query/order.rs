use async_graphql::{Context, ID, Object, Result};
// use backend_libs_cache::RedisCache;
use std::sync::Arc;

use crate::{
    graphql::schema::order::Order,
    repositories::{Repositories, order::OrderRepository},
};

#[derive(Default)]
pub struct OrderQuery;

#[Object]
impl OrderQuery {
    async fn orders(&self, ctx: &Context<'_>) -> Result<Vec<Order>> {
        let repos = ctx.data::<Arc<Repositories>>()?;

        // let cache_key = "orders:all";
        // let cache = ctx.data::<RedisCache>()?;
        // if let Some(cached_orders) = cache.get_json::<Vec<Order>>(cache_key).await? {
        //     return Ok(cached_orders);
        // }

        let orders = repos.order_repo.list().await?;
        let order_models: Vec<Order> = orders.into_iter().map(Order::from).collect();

        // cache.set_json(cache_key, &order_models, 300).await?;

        Ok(order_models)
    }
    async fn order(&self, ctx: &Context<'_>, id: ID) -> Result<Option<Order>> {
        // let cache_key = format!("orders:{}", id.to_string());
        // let cache = ctx.data::<RedisCache>()?;
        // if let Some(cached_order) = cache.get_json::<Order>(&cache_key).await? {
        //     return Ok(Some(cached_order));
        // }

        let repos = ctx.data::<Arc<Repositories>>()?;
        let order_opt = repos.order_repo.get_by_id(&id).await?;

        // if let Some(order) = &order_opt {
        //     cache.set_json(&cache_key, order, 300).await?;
        // }
        Ok(order_opt.map(Order::from))
    }
}
