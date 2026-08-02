pub mod enums;
pub mod models;
pub mod utils;

use mongodb::{
    Client, Database,
    bson::{Bson, doc},
    error::{Error as MongoError, Result as MongoResult},
    options::ClientOptions,
};
use std::{env, sync::OnceLock, time::Duration};

static CLIENT: OnceLock<Client> = OnceLock::new();
static DB_NAME: OnceLock<String> = OnceLock::new();

async fn build_client(uri: &str) -> MongoResult<Client> {
    let mut opts = ClientOptions::parse(uri).await?;
    // Connection tuning
    opts.max_pool_size = Some(16);
    opts.min_pool_size = Some(4);
    opts.connect_timeout = Some(Duration::from_secs(10));
    opts.server_selection_timeout = Some(Duration::from_secs(10));
    Client::with_options(opts)
}

async fn init_client(uri: &str) -> MongoResult<&'static Client> {
    if let Some(client) = CLIENT.get() {
        return Ok(client);
    }
    let client = build_client(uri).await?;
    Ok(CLIENT.get_or_init(|| client))
}

fn init_db_name() -> &'static str {
    DB_NAME.get_or_init(|| env::var("COMMUNICATION_MONGODB_DB").unwrap_or_else(|_| "communication_db".to_string()))
}

pub async fn init_db(mongo_uri: String) -> MongoResult<()> {
    let client = init_client(&mongo_uri).await?;
    let db_name = init_db_name();
    let db = client.database(db_name);

    // Verify connection
    db.run_command(doc! { "ping": 1 }).await?;
    println!("Connected to MongoDB database '{}'", db_name);

    Ok(())
}

pub async fn get_database() -> MongoResult<Database> {
    let client = CLIENT.get().ok_or_else(|| {
        MongoError::from(std::io::Error::new(
            std::io::ErrorKind::NotConnected,
            "Database client is not initialized",
        ))
    })?;

    let db_name = init_db_name();
    Ok(client.database(db_name))
}

pub async fn mongo_ping() -> MongoResult<bool> {
    let client = CLIENT.get().ok_or_else(|| {
        MongoError::from(std::io::Error::new(
            std::io::ErrorKind::NotConnected,
            "Database client is not initialized",
        ))
    })?;
    let res = client
        .database("admin")
        .run_command(doc! { "ping": 1 })
        .await?;

    let ok = match res.get("ok") {
        Some(Bson::Double(v)) => (*v - 1.0).abs() < f64::EPSILON,
        Some(Bson::Int32(v)) => *v == 1,
        Some(Bson::Int64(v)) => *v == 1,
        _ => false,
    };
    Ok(ok)
}
