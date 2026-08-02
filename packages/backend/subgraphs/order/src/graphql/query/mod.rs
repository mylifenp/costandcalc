pub mod order;
use async_graphql::{MergedObject, Object, Result};

use crate::graphql::{query::order::OrderQuery, schema::health_status::OrderHealthStatus};


#[derive(Default)]
pub struct OrderHealthQuery;

#[Object]
impl OrderHealthQuery {
    async fn order_health(&self) -> Result<OrderHealthStatus> {
        Ok(OrderHealthStatus::status().await)
    }
}

#[derive(Default, MergedObject)]
pub struct Query(OrderHealthQuery, OrderQuery);