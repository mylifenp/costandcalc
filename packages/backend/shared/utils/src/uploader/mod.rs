use std::env;

use crate::FileUploader;

pub mod file_type;
pub mod file_uploader;

pub fn init_file_uploader() -> FileUploader {
    let folder_name = env::var("STATIC_FOLDER_NAME").unwrap_or_else(|_| "static".to_string());
    let base_url =
        env::var("ORDER_BASE_URL").unwrap_or_else(|_| "http://localhost:8001/".to_string());
    FileUploader::new(folder_name, base_url)
}
