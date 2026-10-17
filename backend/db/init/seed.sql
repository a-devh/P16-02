CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, email, password_hash, role, created_by, updated_by)
VALUES
('Dev Admin', 'dev.admin@example.com', crypt('password', gen_salt('bf')), 'Admin', 'dev', 'dev'),
('Dev Staff', 'dev.staff@example.com', crypt('password', gen_salt('bf')), 'Staff', 'dev', 'dev'),
('Dev Student', 'dev.student@example.com', crypt('password', gen_salt('bf')), 'Student', 'dev', 'dev')
ON CONFLICT DO NOTHING;

INSERT INTO bricks (name, inscription, campus, section, brick_number, created_by, updated_by)
VALUES
('Abraham Lincoln', 'Honest Abe', 'Kennesaw', 'A', 1, 'dev', 'dev'),
('Benjamin Franklin', 'Founding Father', 'Kennesaw', 'B', 2, 'dev', 'dev'),
('Christopher Columbus', 'Explorer', 'Kennesaw', 'C', 3, 'dev', 'dev'),
('Denzel Washington', 'Actor', 'Kennesaw', 'D', 4, 'dev', 'dev'),
('Ernest Hemingway', 'Author', 'Kennesaw', 'E', 5, 'dev', 'dev'),
('Franklin D. Roosevelt', 'President', 'Kennesaw', 'F', 6, 'dev', 'dev'),
('George Washington', 'First President', 'Kennesaw', 'G', 7, 'dev', 'dev'),
('Harry S. Truman', 'President', 'Kennesaw', 'H', 8, 'dev', 'dev'),
('Isaac Newton', 'Scientist', 'Kennesaw', 'I', 9, 'dev', 'dev'),
('James Madison', 'President', 'Kennesaw', 'J', 10, 'dev', 'dev'),
('King George III', 'Monarch', 'Kennesaw', 'K', 11, 'dev', 'dev'),
('Leonardo da Vinci', 'Renaissance Polymath', 'Kennesaw', 'L', 12, 'dev', 'dev'),

('Albert Einstein', 'Physicist', 'Marietta', 'A', 13, 'dev', 'dev'),
('Amelia Earhart', 'Aviator', 'Marietta', 'A', 14, 'dev', 'dev'),
('Alexander Graham Bell', 'Inventor', 'Marietta', 'A', 15, 'dev', 'dev'),
('Ada Lovelace', 'Mathematician', 'Marietta', 'A', 16, 'dev', 'dev'),

('Buzz Aldrin', 'Astronaut', 'Marietta', 'B', 17, 'dev', 'dev'),
('Buzz Lightyear', 'Space Ranger', 'Marietta', 'B', 18, 'dev', 'dev'),
('Bob Ross', 'Painter', 'Marietta', 'B', 19, 'dev', 'dev'),
('Babe Ruth', 'Baseball Player', 'Marietta', 'B', 20, 'dev', 'dev'),

('Carl Sagan', 'Astronomer', 'Marietta', 'C', 21, 'dev', 'dev'),
('Charles Darwin', 'Naturalist', 'Marietta', 'C', 22, 'dev', 'dev'),
('Carl Jung', 'Psychiatrist', 'Marietta', 'C', 23, 'dev', 'dev'),
('Claude Monet', 'Painter', 'Marietta', 'C', 24, 'dev', 'dev'),

('David Bowie', 'Musician', 'Marietta', 'D', 25, 'dev', 'dev'),
('David Attenborough', 'Naturalist', 'Marietta', 'D', 26, 'dev', 'dev'),
('Dalai Lama', 'Spiritual Leader', 'Marietta', 'D', 27, 'dev', 'dev'),
('Dr. Seuss', 'Author', 'Marietta', 'D', 28, 'dev', 'dev'),

('Eleanor Roosevelt', 'First Lady', 'Marietta', 'E', 29, 'dev', 'dev'),
('Elvis Presley', 'Musician', 'Marietta', 'E', 30, 'dev', 'dev'),
('Edgar Allan Poe', 'Writer', 'Marietta', 'E', 31, 'dev', 'dev'),
('Erwin Schrödinger', 'Physicist', 'Marietta', 'E', 32, 'dev', 'dev'),

('Friedrich Nietzsche', 'Philosopher', 'Marietta', 'F', 33, 'dev', 'dev'),
('Frida Kahlo', 'Painter', 'Marietta', 'F', 34, 'dev', 'dev'),
('Frederick Douglass', 'Abolitionist', 'Marietta', 'F', 35, 'dev', 'dev'),
('Franz Kafka', 'Writer', 'Marietta', 'F', 36, 'dev', 'dev'),

('Galileo Galilei', 'Astronomer', 'Marietta', 'G', 37, 'dev', 'dev'),
('Gregory Mendel', 'Scientist', 'Marietta', 'G', 38, 'dev', 'dev'),
('Grace Hopper', 'Computer Scientist', 'Marietta', 'G', 39, 'dev', 'dev'),
('George Orwell', 'Writer', 'Marietta', 'G', 40, 'dev', 'dev');