use async_graphql::SimpleObject;
use crate::communication_db::connect::mongo_ping;


#[derive(SimpleObject)]
pub struct CommunicationHealthStatus {
    pub api_status: String,
    pub db_status: String,
}
impl CommunicationHealthStatus {
    pub async fn status() -> Self {
        let db_status = mongo_ping()
            .await
            .map(|_| "OK".to_string())
            .unwrap_or_else(|_| "ERROR".to_string());

        Self {
            api_status: "OK".to_string(),
            db_status,
        }
    }
}
