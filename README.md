# P16-02: KSU Legacy Brick Locator

Capstone project for Kennesaw State University's Division of University Advancement. A web app that lets visitors search for a commemorative brick on campus and see where it is, plus an admin area for staff to manage brick records.

## Stack

| Part | Tech | Folder |
| --- | --- | --- |
| Public site | React (Vite) | `frontend/user` |
| Admin site | React (Vite) | `frontend/admin` |
| API | Java 21, Spring Boot | `backend` |
| Database | PostgreSQL 16 in Docker | `docker-compose.yml`, `backend/db/init` |

## What you need installed

- Docker Desktop
- Java 21
- Node.js (current LTS)

## Run everything

From the repo root, in three terminals.

**1. Database**

```bash
docker compose up -d
```

**2. API** (http://localhost:8080)

```bash
cd backend
./mvnw spring-boot:run
```

**3. Frontends**

```bash
cd frontend/user
npm install
npm run dev
```

```bash
cd frontend/admin
npm install
npm run dev
```

| App | URL |
| --- | --- |
| Public site | http://localhost:5173 |
| Admin site | http://localhost:5174 |
| API | http://localhost:8080/api/bricks |

On Windows, `run.bat` in the repo root does all of the above in one go.

## Database

The connection settings are in `docker-compose.yml` and `backend/src/main/resources/application.properties`. They are dev-only credentials and match each other, so nothing needs to be configured.

Tables are defined in `backend/db/init/init.sql`, and sample data is in `backend/db/init/seed.sql`.

**Docker only runs those scripts the first time the database volume is created.** If you change either file, reset the database:

```bash
docker compose down -v
docker compose up -d
```

This deletes all data in the local database.

Dev logins (from `seed.sql`, password is `password` for all):

- `dev.admin@example.com`
- `dev.staff@example.com`
- `dev.student@example.com`

## Working on the project

- Work on a branch, open a pull request, and get one review before merging into `main`.
- Each piece of work is a GitHub Issue with an assignee.
- If you change the schema, an endpoint, or these setup steps, update the docs in the same pull request.
- Decisions go in `docs/decisions.md`. Weekly meeting notes go in `docs/meetings/`.

## Team

Aaron Smith, Cole Williams, Darion Smith, Jasper Zheng, Olivia Tyson. Faculty advisor: Professor Yan Huang.