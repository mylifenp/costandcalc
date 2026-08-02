use async_graphql::{ID, InputObject, SimpleObject};
use mongodb::bson::{DateTime, Document};
use serde::{Deserialize, Serialize};

use crate::{graphql::scalar::time::DateTimeZ, order_db::connect::models::order::OrderDocument};

#[derive(InputObject)]
pub struct CreateOrderInput {
    pub order_number: String,
    pub customer_id: String,
    pub status: String,
    pub total_amount: f64,
}

impl CreateOrderInput {
    pub fn to_document(&self) -> OrderDocument {
        OrderDocument {
            id: None,
            order_number: self.order_number.clone(),
            customer_id: self.customer_id.clone(),
            status: self.status.clone(),
            total_amount: self.total_amount,
            created_at: DateTime::now(),
            updated_at: DateTime::now(),
        }
    }
}

#[derive(InputObject)]
pub struct UpdateOrderInput {
    pub id: ID,
    pub order_number: Option<String>,
    pub customer_id: Option<String>,
    pub status: Option<String>,
    pub total_amount: Option<f64>,
}

impl UpdateOrderInput {
    pub fn to_document(&self) -> Document {
        let mut updated_doc = Document::new();
        if let Some(order_number) = &self.order_number {
            updated_doc.insert("order_number", order_number.clone());
        }
        if let Some(customer_id) = &self.customer_id {
            updated_doc.insert("customer_id", customer_id.clone());
        }
        if let Some(status) = &self.status {
            updated_doc.insert("status", status.clone());
        }
        if let Some(total_amount) = self.total_amount {
            updated_doc.insert("total_amount", total_amount);
        }
        updated_doc.insert("updated_at", DateTime::now());

        updated_doc
    }
}



#[derive(SimpleObject, Serialize, Deserialize, Clone)]
pub struct Order {
    pub id: ID,
    pub order_number: String,
    pub customer_id: String,
    pub status: String,
    pub total_amount: f64,
    pub created_at: DateTimeZ,
    pub updated_at: DateTimeZ,
}

impl From<OrderDocument> for Order {
    fn from(doc: OrderDocument) -> Self {
        let id = doc
            .id
            .map(|oid| ID(oid.to_hex()))
            .unwrap_or_else(|| ID::from(""));
        
        Order {
            id,
            order_number: doc.order_number,
            customer_id: doc.customer_id,
            status: doc.status,
            total_amount: doc.total_amount,
            created_at: doc.created_at.into(),
            updated_at: doc.updated_at.into(),
        }
    }
}