CREATE INDEX idx_email
ON users(email);

CREATE UNIQUE INDEX idx_username
ON users(username);

DROP INDEX idx_email ON users;

CREATE INDEX idx_aadhar
ON users(aadhar);

CREATE INDEX idx_status_created
ON orders(status, created_at);