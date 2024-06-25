-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id INT NOT NULL AUTO_INCREMENT,
    url_id INT NOT NULL,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    referred VARCHAR(255),
    user_agent TEXT,
    ip_address VARCHAR(45),
    PRIMARY KEY (id),
    FOREIGN KEY (url_id) REFERENCES urls(id)
)