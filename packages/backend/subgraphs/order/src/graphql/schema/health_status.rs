use async_graphql::SimpleObject;
use crate::order_db::connect::mongo_ping;


#[derive(SimpleObject)]
pub struct OrderHealthStatus {
    pub api_status: String,
    pub db_status: String,
}
impl OrderHealthStatus {
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