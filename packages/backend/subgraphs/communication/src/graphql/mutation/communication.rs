use std::sync::Arc;

use async_graphql::{Context, Object, Result};

use crate::{
    graphql::schema::communication::{CreateCommunicationInput, Communication, UpdateCommunicationInput},
    repositories::{Repositories, communication::CommunicationRepository}
};

#[derive(Default)]
pub struct CommunicationMutation;

#[Object]
impl CommunicationMutation {
    async fn create_communication(&self, ctx: &Context<'_>, input: CreateCommunicationInput) -> Result<Communication> {
        let repos = ctx.data::<Arc<Repositories>>()?;

        let communication_doc = repos.communication_repo.create(&input).await?;

        Ok(communication_doc.into())
    }

    async fn update_communication(&self, ctx: &Context<'_>, input: UpdateCommunicationInput) -> Result<Communication> {
        let repos = ctx.data::<Arc<Repositories>>()?;

        let communication_doc = repos.communication_repo.update(&input).await?;

        Ok(communication_doc.into())
    }
}
