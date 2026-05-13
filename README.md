# Vacation Management Interface

A full-stack vacation request management application with two role-based interfaces: **Requester** (submit and track requests) and **Validator** (review, approve, and reject requests).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 (Composition API), Vue Router, Pinia, Axios |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, TypeORM |
| Validation | Zod |
| Styling | Bootstrap 5, Bootstrap Icons |

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ running locally

---

## Setup

### 1. Clone and install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure the database

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=vacation_management
PORT=3000
NODE_ENV=development
```

Create the database:

```sql
CREATE DATABASE vacation_management;
```

### 3. Seed the database

```bash
cd backend
npm run seed
```

This creates:
- **Alice Martin** (requester)
- **Bob Nguyen** (requester)
- **Carol Smith** (validator)
- 3 sample vacation requests in different statuses

---

## Running the Application

Open two terminal windows:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# → http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# → http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

Use the **user switcher dropdown** in the top navbar to switch between users. The interface and routing automatically adapt to the selected user's role:

- **Requester** → can submit new vacation requests and view their own request history
- **Validator** → sees all requests, can filter by status, approve with one click, or reject with a required comment

---

## Running Tests

```bash
cd backend
npm test
```

Unit tests cover `VacationRequestService` business logic (status transitions, validation enforcement). Integration tests cover the POST and PATCH API endpoints against a real database connection.

---

## API Reference

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | List all users |
| GET | `/requests` | All requests (validator view) |
| GET | `/requests?userId=X` | Requests by user (requester view) |
| GET | `/requests?status=pending` | Filter by status |
| POST | `/requests` | Submit a new request |
| PATCH | `/requests/:id` | Approve or reject a request |

---

## Technical Decisions

**Monorepo** — single repository for both workspaces makes the project easy to clone and review in one place without monorepo tooling overhead.

**Pinia over Vuex** — Pinia is the officially recommended store for Vue 3, uses the Composition API natively, and requires significantly less boilerplate.

**Zod for validation** — TypeScript-first design means the inferred schema type becomes the DTO type used in the service layer, eliminating duplication between schema and interface definitions.

**Data Mapper pattern (TypeORM repositories)** — keeps entities as plain data shapes and isolates database logic in repository/service layers, making unit testing straightforward without touching a real database.

**User switcher instead of auth** — simulates multi-role access without fake JWT infrastructure. The Pinia `userStore.activeUser` drives both the UI and Vue Router role guards.

**Vite proxy** — the frontend proxies `/api` requests to `localhost:3000` during development, avoiding any CORS configuration.

---

## Known Limitations

- No real authentication — the user switcher is for demo purposes only
- No pagination on the validator dashboard
- Integration tests require a live PostgreSQL connection (same DB as development by default)
