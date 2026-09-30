-- Seed script for initializing the database with default users and bricks (development only)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, email, password_hash, role, created_by, updated_by)
VALUES
('Dev Admin', 'dev.admin@example.com', crypt('password', gen_salt('bf')), 'Admin', 'dev', 'dev'),
('Dev Staff', 'dev.staff@example.com', crypt('password', gen_salt('bf')), 'Staff', 'dev', 'dev'),
('Dev Student', 'dev.student@example.com', crypt('password', gen_salt('bf')), 'Student', 'dev', 'dev')
ON CONFLICT DO NOTHING;

INSERT INTO bricks (name, inscription, campus, section, brick_row, brick_number, created_by, updated_by)
VALUES
('Abraham Lincoln', 'Honest Abe', 'Kennesaw', 'A', 1, 1, 'dev', 'dev'),
('Benjamin Franklin', 'Founding Father', 'Kennesaw', 'B', 2, 2, 'dev', 'dev'),
('Christopher Columbus', 'Explorer', 'Kennesaw', 'C', 3, 3, 'dev', 'dev'),
('Denzel Washington', 'Actor', 'Kennesaw', 'D', 4, 4, 'dev', 'dev'),
('Ernest Hemingway', 'Author', 'Kennesaw', 'E', 5, 5, 'dev', 'dev'),
('Franklin D. Roosevelt', 'President', 'Kennesaw', 'F', 6, 6, 'dev', 'dev'),
('George Washington', 'First President', 'Kennesaw', 'G', 7, 7, 'dev', 'dev'),
('Harry S. Truman', 'President', 'Kennesaw', 'H', 8, 8, 'dev', 'dev'),
('Isaac Newton', 'Scientist', 'Kennesaw', 'I', 9, 9, 'dev', 'dev'),
('James Madison', 'President', 'Kennesaw', 'J', 10, 10, 'dev', 'dev'),
('King George III', 'Monarch', 'Kennesaw', 'K', 11, 11, 'dev', 'dev'),
('Leonardo da Vinci', 'Renaissance Polymath', 'Kennesaw', 'L', 12, 12, 'dev', 'dev'),

('Albert Einstein', 'Physicist', 'Marietta', 'A', 1, 13, 'dev', 'dev'),
('Amelia Earhart', 'Aviator', 'Marietta', 'A', 2, 14, 'dev', 'dev'),
('Alexander Graham Bell', 'Inventor', 'Marietta', 'A', 3, 15, 'dev', 'dev'),
('Ada Lovelace', 'Mathematician', 'Marietta', 'A', 4, 16, 'dev', 'dev'),

('Buzz Aldrin', 'Astronaut', 'Marietta', 'B', 1, 17, 'dev', 'dev'),
('Buzz Lightyear', 'Space Ranger', 'Marietta', 'B', 2, 18, 'dev', 'dev'),
('Bob Ross', 'Painter', 'Marietta', 'B', 3, 19, 'dev', 'dev'),
('Babe Ruth', 'Baseball Player', 'Marietta', 'B', 4, 20, 'dev', 'dev'),

('Carl Sagan', 'Astronomer', 'Marietta', 'C', 1, 21, 'dev', 'dev'),
('Charles Darwin', 'Naturalist', 'Marietta', 'C', 2, 22, 'dev', 'dev'),
('Carl Jung', 'Psychiatrist', 'Marietta', 'C', 3, 23, 'dev', 'dev'),
('Claude Monet', 'Painter', 'Marietta', 'C', 4, 24, 'dev', 'dev'),

('David Bowie', 'Musician', 'Marietta', 'D', 1, 25, 'dev', 'dev'),
('David Attenborough', 'Naturalist', 'Marietta', 'D', 2, 26, 'dev', 'dev'),
('Dalai Lama', 'Spiritual Leader', 'Marietta', 'D', 3, 27, 'dev', 'dev'),
('Dr. Seuss', 'Author', 'Marietta', 'D', 4, 28, 'dev', 'dev'),

('Eleanor Roosevelt', 'First Lady', 'Marietta', 'E', 1, 29, 'dev', 'dev'),
('Elvis Presley', 'Musician', 'Marietta', 'E', 2, 30, 'dev', 'dev'),
('Edgar Allan Poe', 'Writer', 'Marietta', 'E', 3, 31, 'dev', 'dev'),
('Erwin Schrödinger', 'Physicist', 'Marietta', 'E', 4, 32, 'dev', 'dev'),

('Friedrich Nietzsche', 'Philosopher', 'Marietta', 'F', 1, 33, 'dev', 'dev'),
('Frida Kahlo', 'Painter', 'Marietta', 'F', 2, 34, 'dev', 'dev'),
('Frederick Douglass', 'Abolitionist', 'Marietta', 'F', 3, 35, 'dev', 'dev'),
('Franz Kafka', 'Writer', 'Marietta', 'F', 4, 36, 'dev', 'dev'),

('Galileo Galilei', 'Astronomer', 'Marietta', 'G', 1, 37, 'dev', 'dev'),
('Gregory Mendel', 'Scientist', 'Marietta', 'G', 2, 38, 'dev', 'dev'),
('Grace Hopper', 'Computer Scientist', 'Marietta', 'G', 3, 39, 'dev', 'dev'),
('George Orwell', 'Writer', 'Marietta', 'G', 4, 40, 'dev', 'dev');