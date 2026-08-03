use std::{fmt, io};
use redis::RedisError;
use serde_json;
use tokio::task::JoinError;

#[derive(Debug)]
pub enum Error {
    Redis(RedisError),
    Serde(serde_json::Error),
    Io(io::Error),
    Join(JoinError),
    Other(String),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::Redis(e) => write!(f, "redis error: {}", e),
            Error::Serde(e) => write!(f, "serialization error: {}", e),
            Error::Io(e) => write!(f, "io error: {}", e),
            Error::Join(e) => write!(f, "task join error: {}", e),
            Error::Other(msg) => write!(f, "{}", msg),
        }
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Error::Redis(e) => Some(e),
            Error::Serde(e) => Some(e),
            Error::Io(e) => Some(e),
            Error::Join(e) => Some(e),
            Error::Other(_) => None,
        }
    }
}

impl From<RedisError> for Error {
    fn from(e: RedisError) -> Self {
        Error::Redis(e)
    }
}

impl From<serde_json::Error> for Error {
    fn from(e: serde_json::Error) -> Self {
        Error::Serde(e)
    }
}

impl From<io::Error> for Error {
    fn from(e: io::Error) -> Self {
        Error::Io(e)
    }
}

impl From<JoinError> for Error {
    fn from(e: JoinError) -> Self {
        Error::Join(e)
    }
}

impl From<&str> for Error {
    fn from(s: &str) -> Self {
        Error::Other(s.to_string())
    }
}

impl From<String> for Error {
    fn from(s: String) -> Self {
        Error::Other(s)
    }
}

/// Convenience result alias for functions in this crate/module.
pub type Result<T> = std::result::Result<T, Error>;
