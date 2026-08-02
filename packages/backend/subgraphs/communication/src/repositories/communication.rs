use crate::{
    graphql::schema::communication::{CreateCommunicationInput, UpdateCommunicationInput},
    communication_db::connect::{
        models::communication::CommunicationDocument,
        utils::{map_write_error, parse_oid},
    },
};
use async_trait::async_trait;
use backend_libs_utils::db_errors::DbError;
use futures::TryStreamExt;
use mongodb::{
    Collection, Database,
    bson::doc,
    options::{FindOneAndUpdateOptions, ReturnDocument},
};

pub struct MongoCommunicationRepository {
    coll: Collection<CommunicationDocument>,
}

impl MongoCommunicationRepository {
    pub async fn init(db: &Database) -> Result<Self, DbError> {
        let repo = Self::new(db);
        Ok(repo)
    }

    pub fn new(db: &Database) -> Self {
        let coll = db.collection::<CommunicationDocument>("communications");
        Self { coll }
    }
}

#[async_trait]
pub trait CommunicationRepository {
    async fn list(&self) -> Result<Vec<CommunicationDocument>, DbError>;
    async fn get_by_id(&self, id: &str) -> Result<Option<CommunicationDocument>, DbError>;
    async fn create(&self, communication: &CreateCommunicationInput) -> Result<CommunicationDocument, DbError>;
    async fn update(&self, input: &UpdateCommunicationInput) -> Result<CommunicationDocument, DbError>;
}

#[async_trait]
impl CommunicationRepository for MongoCommunicationRepository {
    async fn list(&self) -> Result<Vec<CommunicationDocument>, DbError> {
        let mut cursor = self.coll.find(doc! {}).await.map_err(DbError::from)?;
        let mut out = Vec::new();
        while let Some(communication) = cursor.try_next().await.map_err(DbError::from)? {
            out.push(communication);
        }
        Ok(out)
    }
    async fn get_by_id(&self, id: &str) -> Result<Option<CommunicationDocument>, DbError> {
        let oid = parse_oid(id)?;
        self.coll
            .find_one(doc! { "_id": oid })
            .await
            .map_err(DbError::from)
    }

    async fn create(&self, input: &CreateCommunicationInput) -> Result<CommunicationDocument, DbError> {
        let new_communication = input.to_document();

        let insert_res = self
            .coll
            .insert_one(&new_communication)
            .await
            .map_err(map_write_error)?;
        let inserted_id = insert_res
            .inserted_id
            .as_object_id()
            .ok_or_else(|| DbError::InvalidId("Failed to get inserted ID".to_string()))?;

        let inserted = self
            .coll
            .find_one(doc! { "_id": inserted_id })
            .await
            .map_err(DbError::from)?
            .ok_or_else(|| DbError::NotFound("Inserted document not found".to_string()))?;

        Ok(inserted)
    }

    async fn update(&self, input: &UpdateCommunicationInput) -> Result<CommunicationDocument, DbError> {
        let oid = parse_oid(&input.id.to_string())?;
        let update_doc = input.to_document();

        if update_doc.is_empty() {
            return Err(DbError::Validation("No fields provided for update".into()));
        }

        let options = FindOneAndUpdateOptions::builder()
            .return_document(ReturnDocument::After)
            .build();

        let updated = self
            .coll
            .find_one_and_update(doc! { "_id": oid }, doc! { "$set": update_doc })
            .with_options(options)
            .await
            .map_err(DbError::from)?
            .ok_or_else(|| DbError::NotFound("Updated document not found".to_string()))?;

        Ok(updated)
    }
}
