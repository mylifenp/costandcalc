use async_graphql::{InputObject, SimpleObject, ID};
use mongodb::bson::{DateTime, Document};
use serde::{Deserialize, Serialize};

use crate::{
    communication_db::connect::models::communication::CommunicationDocument,
    graphql::scalar::time::DateTimeZ,
};

#[derive(InputObject)]
pub struct CreateCommunicationInput {
    pub customer_id: String,
    pub status: String,
}

impl CreateCommunicationInput {
    pub fn to_document(&self) -> CommunicationDocument {
        CommunicationDocument {
            id: None,
            customer_id: self.customer_id.clone(),
            status: self.status.clone(),
            created_at: DateTime::now(),
            updated_at: DateTime::now(),
        }
    }
}

#[derive(InputObject)]
pub struct UpdateCommunicationInput {
    pub id: ID,
    pub customer_id: Option<String>,
    pub status: Option<String>,
}

impl UpdateCommunicationInput {
    pub fn to_document(&self) -> Document {
        let mut updated_doc = Document::new();
        if let Some(customer_id) = &self.customer_id {
            updated_doc.insert("customer_id", customer_id.clone());
        }
        if let Some(status) = &self.status {
            updated_doc.insert("status", status.clone());
        }
        updated_doc.insert("updated_at", DateTime::now());

        updated_doc
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Clone)]
pub struct Communication {
    pub id: ID,
    pub customer_id: String,
    pub status: String,
    pub created_at: DateTimeZ,
    pub updated_at: DateTimeZ,
}

impl From<CommunicationDocument> for Communication {
    fn from(doc: CommunicationDocument) -> Self {
        let id = doc
            .id
            .map(|oid| ID(oid.to_hex()))
            .unwrap_or_else(|| ID::from(""));

        Communication {
            id,
            customer_id: doc.customer_id,
            status: doc.status,
            created_at: doc.created_at.into(),
            updated_at: doc.updated_at.into(),
        }
    }
}
