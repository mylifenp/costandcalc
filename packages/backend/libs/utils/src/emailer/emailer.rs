use lettre::{
    message::header::ContentType, transport::smtp::authentication::Credentials, Message,
    SmtpTransport, Transport,
};
use std::error::Error;

pub struct Emailer {
    pub smtp_server: String,
    pub smtp_username: String,
    pub smtp_password: String,
    pub from_email: String,
    pub from_name: String,
}

impl Emailer {
    pub fn new(
        smtp_server: String,
        smtp_username: String,
        smtp_password: String,
        from_email: String,
        from_name: String,
    ) -> Self {
        Self {
            smtp_server,
            smtp_username,
            smtp_password,
            from_email,
            from_name,
        }
    }

    pub fn send_email(
        &self,
        to_email: &str,
        subject: &str,
        body: &str,
    ) -> Result<(), Box<dyn Error>> {
        let email = Message::builder()
            .from(format!("{} <{}>", self.from_name, self.from_email).parse()?)
            .to(to_email.parse()?)
            .subject(subject)
            .header(ContentType::TEXT_PLAIN)
            .body(body.to_string())?;

        let credentials = Credentials::new(self.smtp_username.clone(), self.smtp_password.clone());

        let mailer = SmtpTransport::relay(&self.smtp_server)?
            .credentials(credentials)
            .build();

        mailer.send(&email)?;

        Ok(())
    }

    pub async fn send_html_email(
        &self,
        to_email: &str,
        subject: &str,
        html_body: &str,
    ) -> Result<(), Box<dyn Error>> {
        let email = Message::builder()
            .from(format!("{} <{}>", self.from_name, self.from_email).parse()?)
            .to(to_email.parse()?)
            .subject(subject)
            .header(ContentType::TEXT_HTML)
            .body(html_body.to_string())?;

        let credentials = Credentials::new(self.smtp_username.clone(), self.smtp_password.clone());

        let mailer = SmtpTransport::relay(&self.smtp_server)?
            .credentials(credentials)
            .build();

        mailer.send(&email)?;

        Ok(())
    }
}
