use async_graphql::MergedObject;

use crate::graphql::mutation::order::OrderMutation;

pub mod order;

#[derive(Default, MergedObject)]
pub struct Mutation(OrderMutation);