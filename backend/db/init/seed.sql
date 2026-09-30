CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, email, password_hash, role, created_by, updated_by)
VALUES
('Dev Admin', 'dev.admin@example.com', crypt('password', gen_salt('bf')), 'Admin', 'dev', 'dev'),
('Dev Staff', 'dev.staff@example.com', crypt('password', gen_salt('bf')), 'Staff', 'dev', 'dev'),
('Dev Student', 'dev.student@example.com', crypt('password', gen_salt('bf')), 'Student', 'dev', 'dev')
ON CONFLICT DO NOTHING;

INSERT INTO bricks (name, inscription, campus, section, brick_row, brick_number, created_by, updated_by)
VALUES

