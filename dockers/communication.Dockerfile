ARG RUST_VERSION=1.95
ARG DEBIAN_SUITE=bookworm

# Builder stage
FROM rust:${RUST_VERSION}-slim-${DEBIAN_SUITE} AS builder

WORKDIR /app

# Install system dependencies required to build (OpenSSL for mongodb driver)
RUN apt-get update && apt-get install -y --no-install-recommends \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy manifests for dependency caching
COPY Cargo.toml Cargo.lock ./
COPY packages/backend/libs/auth/Cargo.toml packages/backend/libs/auth/Cargo.toml
COPY packages/backend/cache/auth/Cargo.toml packages/backend/cache/auth/Cargo.toml
COPY packages/backend/utils/auth/Cargo.toml packages/backend/utils/auth/Cargo.toml

COPY packages/backend/subgraphs/communication/Cargo.toml packages/backend/subgraphs/communication/Cargo.toml

RUN mkdir -p src src/packages/backend/libs/auth/src \
    && mkdir -p src/packages/backend/cache/auth/src \
    && mkdir -p src/packages/backend/utils/auth/src \
    && mkdir -p src/packages/backend/subgraphs/communication/src

RUN npx nx run communication_api:build 
RUN rm -rf src

COPY packages/backend/subgraphs/communication/src ./src
RUN touch src/main.rs src/api/src/lib.rs src/auth/src/lib.rs src/cache/src/lib.rs src/db/src/lib.rs src/utils/src/lib.rs  \
    && npx nx run communication_api:build 