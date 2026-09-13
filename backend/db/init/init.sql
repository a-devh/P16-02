--Placeholder initialization script for the database.

CREATE TABLE IF NOT EXISTS Bricks (
    ID BIGSERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Campus VARCHAR(255) NOT NULL,
    Section VARCHAR(255) NOT NULL,
    BrickNumber INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedBy VARCHAR(255) NOT NULL,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedBy VARCHAR(255) NOT NULL
)