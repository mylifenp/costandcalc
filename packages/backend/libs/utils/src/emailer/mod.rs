use std::env;

use crate::Emailer;

pub mod emailer;

pub fn init_emailer() -> Emailer {
    let smtp_server = env::var("SMTP_SERVER").unwrap_or_else(|_| "smtp.gmail.com".to_string());
    let smtp_username = env::var("SMTP_USERNAME").expect("SMTP_USERNAME must be set");
    let smtp_password = env::var("SMTP_PASSWORD").expect("SMTP_PASSWORD must be set");
    let from_email = env::var("FROM_EMAIL").expect("FROM_EMAIL must be set");
    let from_name = env::var("FROM_NAME").unwrap_or_else(|_| "My App".to_string());

    let emailer = Emailer::new(
        smtp_server,
        smtp_username,
        smtp_password,
        from_email,
        from_name,
    );
    emailer
}
