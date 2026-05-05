-- Legacy migration helpers (run statements that apply to your DB; skip ones that error if already applied).

USE realtime_engine;

-- Users: add role for JWT/admin features
-- ALTER TABLE users ADD COLUMN role ENUM('admin', 'user') NOT NULL DEFAULT 'user';

-- Events: add seat columns + created_by (mirror of old user_id)
-- ALTER TABLE events ADD COLUMN total_seats INT NOT NULL DEFAULT 100;
-- ALTER TABLE events ADD COLUMN available_seats INT NOT NULL DEFAULT 100;
-- ALTER TABLE events ADD COLUMN created_by INT NULL;
-- UPDATE events SET created_by = user_id WHERE created_by IS NULL AND EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'events' AND COLUMN_NAME = 'user_id');
