CREATE DATABASE fishfeeder_db;
USE fishfeeder_db;

CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  feed_time TIME NOT NULL,
  feed_amount INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schedules (feed_time, feed_amount, is_active)
VALUES ('08:00:00', 2, TRUE), ('18:00:00', 3, TRUE);
