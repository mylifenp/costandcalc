use std::error::Error;

use reqwest::Client;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct NominatimResponse {
    lat: String,
    lon: String,
    // You can add more fields if needed
}

pub async fn get_coordinates(address: &str) -> Result<(f64, f64), Box<dyn Error>> {
    let geocoding_api_url = std::env::var("GEOCODING_API_URL")
        .unwrap_or_else(|_| "https://transition.datenium.de/search".to_string());

    let url = format!(
        "{}?format=json&q={}",
        geocoding_api_url,
        urlencoding::encode(address)
    );
    let client = Client::new();
    let res: Vec<NominatimResponse> = client
        .get(&url)
        .header("User-Agent", "your-client-name")
        .send()
        .await?
        .json()
        .await?;
    if let Some(first) = res.first() {
        let lat = first.lat.parse::<f64>()?;
        let lon = first.lon.parse::<f64>()?;
        Ok((lat, lon))
    } else {
        Err("No results found".into())
    }
}
