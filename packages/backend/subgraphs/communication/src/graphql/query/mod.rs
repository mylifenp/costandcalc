pub mod communication;
use async_graphql::{MergedObject, Object, Result};

use crate::graphql::{query::communication::CommunicationQuery, schema::health_status::CommunicationHealthStatus};

#[derive(Default)]
pub struct CommunicationHealthQuery;

#[Object]
impl CommunicationHealthQuery {
    async fn communication_health(&self) -> Result<CommunicationHealthStatus> {
        Ok(CommunicationHealthStatus::status().await)
    }
}

#[derive(Default, MergedObject)]
pub struct Query(CommunicationHealthQuery, CommunicationQuery);
