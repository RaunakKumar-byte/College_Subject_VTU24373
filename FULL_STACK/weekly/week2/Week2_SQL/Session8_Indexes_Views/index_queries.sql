-- Improve search performance
CREATE INDEX idx_email
ON users(email);

-- Unique username
CREATE UNIQUE INDEX idx_username
ON users(username);

-- Drop unused index
DROP INDEX idx_email ON users;

-- Fix slow search on aadhar
CREATE INDEX idx_aadhar
ON users(aadhar);

-- Composite index
CREATE INDEX idx_status_created
ON orders(status, created_at);