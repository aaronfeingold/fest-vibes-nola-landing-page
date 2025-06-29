-- SIP Beta Signups Database Schema
-- Run this in your Neon PostgreSQL database

CREATE TABLE IF NOT EXISTS beta_signups (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    normalized_email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_beta_signups_normalized_email ON beta_signups(normalized_email);
CREATE INDEX IF NOT EXISTS idx_beta_signups_created_at ON beta_signups(created_at DESC);

-- Optional: Add some constraints
ALTER TABLE beta_signups ADD CONSTRAINT check_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
