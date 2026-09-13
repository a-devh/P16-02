# P16-02
Repository for capstone project team P16-02

**PostgreSQL Setup**
- **Files**: [docker-compose.yml](docker-compose.yml), [.env.example](.env.example)
- **Start DB**: Run `docker compose up -d` to start the PostgreSQL service.
- **Stop DB**: Run `docker compose down` to stop and remove containers (volume preserved).
- **Connection**: Connect with `psql` or your app using host `localhost`, port from `.env` (default 5432), database and credentials from `.env`.
- **Data**: Database files are persisted in the Docker volume `db_data`.

If you prefer a local install instead of Docker, install PostgreSQL for your OS and set the same credentials in your application environment.
