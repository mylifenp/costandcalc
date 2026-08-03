use nanoid::nanoid;
use std::{
    error::Error,
    io::Read,
    path::{Path, PathBuf},
};
use tokio::{fs, io::AsyncWriteExt};

pub struct FileUploader {
    folder_name: String,
    base_url: String,
}

impl FileUploader {
    pub fn new(folder_name: String, base_url: String) -> Self {
        Self {
            folder_name,
            base_url,
        }
    }

    pub async fn upload(
        &self,
        filename: String,
        mut content: impl Read,
    ) -> Result<(String, String), Box<dyn Error>> {
        let id = nanoid!();

        // Create uploads directory if it doesn't exist
        let uploads_dir = PathBuf::from(&self.folder_name);
        fs::create_dir_all(&uploads_dir).await?;

        let extension = Path::new(&filename)
            .extension()
            .and_then(|ext| ext.to_str())
            .map(|ext| format!(".{}", ext))
            .unwrap_or_default();

        let new_filename = format!("{}{}", id, extension);
        let file_path = uploads_dir.join(&new_filename);

        let mut dest = fs::File::create(&file_path).await?;
        let mut buffer = Vec::new();

        Read::read_to_end(&mut content, &mut buffer)?;

        dest.write_all(&buffer).await?;
        dest.flush().await?;

        let url = format!("{}{}/{}", self.base_url, self.folder_name, new_filename);

        Ok((id, url))
    }

    pub async fn upload_multiple(
        &self,
        files: Vec<(String, impl Read)>,
    ) -> Result<Vec<(String, String)>, Box<dyn Error>> {
        let mut results = Vec::new();

        for (filename, content) in files {
            match self.upload(filename, content).await {
                Ok(result) => results.push(result),
                Err(e) => {
                    eprintln!("Failed to upload file:{}", e);
                    return Err(e);
                }
            }
        }

        Ok(results)
    }

    pub async fn delete(&self, id: &str) -> Result<(), Box<dyn Error>> {
        if !Self::is_valid_nanoid(id) {
            return Err(format!("Invalid file ID: {}", id).into());
        }

        let uploads_dir = PathBuf::from(&self.folder_name);

        // Read the directory to find the file with the given ID
        let mut entries = fs::read_dir(&uploads_dir).await?;
        while let Some(entry) = entries.next_entry().await? {
            let file_name = entry.file_name();
            let file_name_str = file_name.to_string_lossy();

            // Check if the file name starts with the given ID
            if file_name_str.starts_with(id) {
                let file_path = uploads_dir.join(file_name);
                fs::remove_file(file_path).await?;
                return Ok(());
            }
        }

        Err(format!("File with ID {} not found", id).into())
    }

    pub async fn delete_multiple(&self, ids: &[String]) -> Result<(), Box<dyn Error>> {
        for id in ids {
            self.delete(id).await?;
        }
        Ok(())
    }

    fn is_valid_nanoid(id: &str) -> bool {
        // Accept 10-30 character IDs (flexible)
        let len = id.len();
        len >= 10
            && len <= 30
            && id
                .chars()
                .all(|c| c.is_ascii_alphanumeric() || c == '_' || c == '-')
    }
}

// For custom alphabet/size validation
