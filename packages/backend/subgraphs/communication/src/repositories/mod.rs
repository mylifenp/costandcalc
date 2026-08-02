use crate::{
    communication_db::connect::get_database,
    repositories::communication::MongoCommunicationRepository,
};

pub mod communication;

pub struct Repositories {
    pub communication_repo: MongoCommunicationRepository,
}

pub async fn init_repos() -> Result<Repositories, Box<dyn std::error::Error + Send + Sync>> {
    let db = get_database().await?;

    let communication_repo = MongoCommunicationRepository::init(&db).await?;

    Ok(Repositories { communication_repo })
}

// pub mod consumer;
// pub mod requisition;
// pub mod requisition_item;
// pub mod review;
// pub mod user;

// pub struct Repositories {
//     pub consumer_repo: consumer::MongoConsumerRepository,
//     pub review_repo: review::MongoReviewRepository,
//     pub requisition_repo: requisition::MongoRequisitionRepository,
//     pub requisition_item_repo: requisition_item::MongoRequisitionItemRepository,
//     pub consumer_user_repo: user::MongoConsumerUserRepository,
// }
// pub async fn init_repos() -> Result<Repositories, Box<dyn std::error::Error + Send + Sync>> {
//     let db = get_database().await?;

//     let (consumer_repo, review_repo, requisition_repo, requisition_item_repo, consumer_user_repo) =
//         tokio::try_join!(
//             consumer::MongoConsumerRepository::init(&db),
//             review::MongoReviewRepository::init(&db),
//             requisition::MongoRequisitionRepository::init(&db),
//             requisition_item::MongoRequisitionItemRepository::init(&db),
//             user::MongoConsumerUserRepository::init(&db),
//         )?;
//     Ok(Repositories {
//         order_repo,
//         review_repo,
//         requisition_repo,
//         requisition_item_repo,
//         consumer_user_repo,
//     })
// }
