pub fn image_uploaded_template(
    to: &str,
    filename: &str,
    file_id: &str,
    file_url: &str,
    from_name: &str,
) -> String {
    format!(
        r#"
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>File Uploaded</title>
                <style>
                    body {{
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }}
                    .container {{
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }}
                    h1 {{
                        color: #2c3e50;
                        margin-top: 0;
                    }}
                    .description {{
                        margin: 20px 0;
                        color: #555;
                    }}
                    .file-info {{
                        background-color: #f8f9fa;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 20px 0;
                    }}
                    .file-info p {{
                        margin: 5px 0;
                    }}
                    .btn {{
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #007bff;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                    }}
                    .btn:hover {{
                        background-color: #0056b3;
                    }}
                    .footer {{
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e0e0e0;
                        font-size: 12px;
                        color: #888;
                    }}
                    .image-preview {{
                        margin: 20px 0;
                        text-align: center;
                    }}
                    .image-preview img {{
                        max-width: 100%;
                        height: auto;
                        border-radius: 5px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello! 👋 {}</h1>

                    <p class="description">
                        Your file has been successfully uploaded to our system.
                        You can view and download your file using the link below.
                    </p>

                    <div class="file-info">
                        <p><strong>File Name:</strong> {}</p>
                        <p><strong>File ID:</strong> {}</p>
                    </div>

                    <div class="image-preview">
                        <img src="{}" alt="Uploaded file preview">
                    </div>

                    <a href="{}" class="btn">View File</a>

                    <div class="footer">
                        <p>This is an automated notification from {}.</p>
                        <p>If you didn't upload this file, please contact our support team.</p>
                    </div>
                </div>
            </body>
            </html>
            "#,
        to, filename, file_id, file_url, file_url, from_name
    )
}
