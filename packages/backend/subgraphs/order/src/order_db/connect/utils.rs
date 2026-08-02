use backend_libs_utils::db_errors::DbError;
use mongodb::bson::oid::ObjectId;
use mongodb::error::{ErrorKind, WriteError, WriteFailure};

/// Parse a hex string into ObjectId.
pub fn parse_oid(id: &str) -> Result<ObjectId, DbError> {
    ObjectId::parse_str(id).map_err(|e| DbError::InvalidId(e.to_string()))
}

/// Map Mongo duplicate key (code 11000) to DbError::DuplicateKey.
pub fn map_write_error(e: mongodb::error::Error) -> DbError {
    if let ErrorKind::Write(WriteFailure::WriteError(WriteError { code, .. })) = e.kind.as_ref() {
        if *code == 11000 {
            return DbError::DuplicateKey("duplicate client name".into());
        }
    }
    DbError::from(e)
}

// /// Validate and normalize a client name.
// pub fn validate_name(name: &str) -> Result<String, DbError> {
//     let trimmed = name.trim();
//     if trimmed.is_empty() {
//         return Err(DbError::Validation("name cannot be empty".into()));
//     }
//     if trimmed.len() > 100 {
//         return Err(DbError::Validation("name exceeds 100 chars".into()));
//     }
//     Ok(trimmed.to_owned())
// }
