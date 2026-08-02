use std::{env, sync::Arc};

use async_graphql::{ EmptySubscription, Schema};
use backend_libs_auth::keycloak::client::KeycloakClient;
use backend_libs_cache::{init_cache, init_pubsub};
use backend_libs_utils::{init_emailer, init_file_uploader};
use dotenvy::dotenv;

use crate::{graphql::{mutation::Mutation, query::Query}, order_db::connect::init_db, repositories};


pub type AppSchema = Schema<Query, Mutation, EmptySubscription>;

pub async fn build_schema() -> AppSchema {
    dotenv().ok();

    let mongo_uri =
        env::var("ORDER_MONGODB_URI").expect("ORDER_MONGODB_URI must be set in .env file");
    // Initialize MongoDB
    init_db(mongo_uri).await.expect("MongoDB init failed");

    let pubsub_url =
        env::var("REDIS_PUBSUB_URL").expect("REDIS_PUBSUB_URL must be set in .env file");
    let redis_url = env::var("REDIS_URL").expect("REDIS_URL must be set in .env file");

    let redis_pubsub = init_pubsub(pubsub_url).expect("RedisPubSub init failed");
    let cache =
        init_cache(redis_url, "order_cache").expect("RedisCache init failed");

    let emailer = init_emailer();
    let keycloak_client = KeycloakClient::new().expect("Failed to create Keycloak client");
    let file_uploader = init_file_uploader();

    let repositories = Arc::new(
        repositories::init_repos()
            .await
            .expect("MongoDB init failed"),
    );

    let schema = Schema::build(
        Query::default(),
        Mutation::default(),
        EmptySubscription,
    );

    schema
        .data(cache)
        .data(repositories)
        .data(redis_pubsub)
        .data(file_uploader)
        .data(emailer)
        .data(keycloak_client)
        // .extension(UserExtension)
        .enable_federation()
        .enable_subscription_in_federation()
        .finish()
}