-- Create URL table 
CREATE TABLE IF NOT EXISTS urls (
    id INT NOT NULL AUTO_INCREMENT,
    original_url TEXT NOT NULL,
    short_url VARCHAR(6) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hit_count INT DEFAULT 0,
    PRIMARY KEY (id)
);

-- Create new url
INSERT INTO urls (original_url)
    VALUES
        ("original_url")
;

-- Get all urls
SELECT * FROM urls;

-- Get url by ID
SELECT * FROM urls WHERE id = "url_id";

-- Update url.hit_count by ID
UPDATE urls SET hit_count = hit_count + 1 WHERE id = "url_id";

-- Delete url by ID
DELETE FROM urls WHERE id = "url_id";

-- Delete table
DROP TABLE urls;