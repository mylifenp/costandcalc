use async_graphql::MergedObject;

use crate::graphql::mutation::communication::CommunicationMutation;

pub mod communication;

#[derive(Default, MergedObject)]
pub struct Mutation(CommunicationMutation);
