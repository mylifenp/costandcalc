use std::sync::Arc;

use async_graphql::{Context, Object, Result};

use crate::{
    graphql::schema::order::{CreateOrderInput, Order, UpdateOrderInput},
    repositories::{Repositories, order::OrderRepository},
};

#[derive(Default)]
pub struct OrderMutation;

#[Object]
impl OrderMutation {
    async fn create_order(&self, ctx: &Context<'_>, input: CreateOrderInput) -> Result<Order> {
        let repos = ctx.data::<Arc<Repositories>>()?;

        let order_doc = repos.order_repo.create(&input).await?;

        Ok(order_doc.into())
    }

    async fn update_order(&self, ctx: &Context<'_>, input: UpdateOrderInput) -> Result<Order> {
        let repos = ctx.data::<Arc<Repositories>>()?;

        let order_doc = repos.order_repo.update(&input).await?;

        Ok(order_doc.into())
    }
}
