use mongodb::error::Error as MongoError;

#[derive(Debug)]
pub enum DbError {
    MongoDB(MongoError),
    InvalidId(String),
    NotFound(String),
    DuplicateKey(String),
    Validation(String),
    // InvalidArgument(String),
    // SerializationError(String),
}

impl From<MongoError> for DbError {
    fn from(err: MongoError) -> Self {
        DbError::MongoDB(err)
    }
}

impl std::fmt::Display for DbError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            DbError::MongoDB(e) => write!(f, "MongoDB error: {}", e),
            DbError::InvalidId(e) => write!(f, "Invalid ID: {}", e),
            DbError::NotFound(e) => write!(f, "Not found: {}", e),
            DbError::DuplicateKey(e) => write!(f, "Duplicate key: {}", e),
            DbError::Validation(e) => write!(f, "Validation error: {}", e),
            // DbError::InvalidArgument(e) => write!(f, "Invalid argument: {}", e),
            // DbError::SerializationError(e) => write!(f, "Serialization error: {}", e),
        }
    }
}

impl std::error::Error for DbError {}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_db_error_display_invalid_id() {
        let err = DbError::InvalidId("not a valid ObjectId".to_string());
        assert_eq!(format!("{}", err), "Invalid ID: not a valid ObjectId");
    }

    #[test]
    fn test_db_error_display_not_found() {
        let err = DbError::NotFound("client not found".to_string());
        assert_eq!(format!("{}", err), "Not found: client not found");
    }

    #[test]
    fn test_db_error_display_duplicate_key() {
        let err = DbError::DuplicateKey("name already exists".to_string());
        assert_eq!(format!("{}", err), "Duplicate key: name already exists");
    }

    #[test]
    fn test_db_error_display_validation() {
        let err = DbError::Validation("name cannot be empty".to_string());
        assert_eq!(format!("{}", err), "Validation error: name cannot be empty");
    }

    #[test]
    fn test_from_mongo_error() {
        let mongo_err = MongoError::custom("test error");
        let db_err: DbError = mongo_err.into();
        assert!(matches!(db_err, DbError::MongoDB(_)));
    }

    #[test]
    fn test_db_error_is_std_error() {
        let err = DbError::InvalidId("test".to_string());
        let _std_err: &dyn std::error::Error = &err;
        // If this compiles, DbError implements std::error::Error
    }

    #[test]
    fn test_db_error_debug() {
        let err = DbError::Validation("test".to_string());
        let debug_str = format!("{:?}", err);
        assert!(debug_str.contains("Validation"));
        assert!(debug_str.contains("test"));
    }

    #[test]
    fn test_multiple_error_variants() {
        let errors = vec![
            DbError::InvalidId("id".to_string()),
            DbError::NotFound("resource".to_string()),
            DbError::DuplicateKey("key".to_string()),
            DbError::Validation("field".to_string()),
        ];

        assert_eq!(errors.len(), 4);
        for err in errors {
            assert!(!format!("{}", err).is_empty());
        }
    }
}
