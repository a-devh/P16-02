CREATE TYPE brick_campus AS ENUM ('Kennesaw', 'Marietta');
CREATE TYPE brick_section AS ENUM ('A','B','C','D','E','F','G','H','I','J','K','L');
CREATE TYPE user_role AS ENUM ('Student', 'Staff', 'Admin');

CREATE TABLE IF NOT EXISTS bricks (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inscription TEXT,
    campus brick_campus NOT NULL,
    section brick_section NOT NULL,
    brick_row INT NOT NULL,
    brick_number INT NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255) NOT NULL
);

   CREATE UNIQUE INDEX IF NOT EXISTS bricks_position
   ON bricks (campus, section, brick_row, brick_number)
   WHERE NOT deleted
     AND brick_row IS NOT NULL
     AND brick_number IS NOT NULL;

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) GENERATED ALWAYS AS (lower(split_part(email, '@', 1))) STORED,
    password_hash VARCHAR(255) NOT NULL,
    password_attempts INT NOT NULL DEFAULT 0,
    locked BOOLEAN NOT NULL DEFAULT FALSE,
    role user_role NOT NULL DEFAULT 'Student',
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS user_email ON users (lower(email)) WHERE NOT deleted;
CREATE UNIQUE INDEX IF NOT EXISTS user_username ON users (username) WHERE NOT deleted;