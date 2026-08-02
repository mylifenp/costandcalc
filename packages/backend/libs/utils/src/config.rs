use std::env;

pub struct Urls {
    pub order_api_url: String,
}

pub struct Config {
    pub urls: Urls,
}
impl Config {
    pub fn get_urls() -> Self {
        let order_port = env::var("ORDER_PORT").unwrap_or_else(|_| "8001".to_string());

        let order_api_url = format!("http://localhost:{}/graphql", order_port);

        let urls = Urls {
            order_api_url,
        };

        Config { urls }
    }
}
