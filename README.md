# Boarding House / Apartment Rent Manager (Multi-tenant SaaS)

Production-oriented monorepo for a multi-tenant rent management SaaS.

## Monorepo Structure

- `backend/` Laravel 12 API (PHP 8.3+, PostgreSQL, Sanctum, Spatie Permission)
- `frontend/` React + TypeScript + Vite + TanStack Router + TanStack Query
- `scripts/` Local helper scripts

## Prerequisites

- PHP 8.3+
- Composer 2+
- PostgreSQL 15+
- Node.js 20+
- npm 10+

## PostgreSQL Setup

1. Create database and user:

```sql
CREATE DATABASE boardinghouse_saas;
CREATE USER boardinghouse_user WITH PASSWORD 'change-me';
GRANT ALL PRIVILEGES ON DATABASE boardinghouse_saas TO boardinghouse_user;
```

2. Update backend env:

```bash
cp backend/.env.example backend/.env
```

Set:

- `DB_CONNECTION=pgsql`
- `DB_HOST=127.0.0.1`
- `DB_PORT=5432`
- `DB_DATABASE=boardinghouse_saas`
- `DB_USERNAME=boardinghouse_user`
- `DB_PASSWORD=change-me`

## Setup

### Backend

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
```

### Frontend

```bash
cd frontend
npm install
```

## Run Locally

### Backend API

```bash
cd backend
php artisan serve
```

API base: `http://127.0.0.1:8000/api/v1`

### Frontend SPA

```bash
cd frontend
npm run dev
```

App base: `http://127.0.0.1:5173`

## Lint + Test Commands

### Backend

```bash
cd backend
./vendor/bin/pint --test
./vendor/bin/phpstan analyse
php artisan test
```

### Frontend

```bash
cd frontend
npm run format:check
npm run lint
npm run build
```

## Architecture (Current Foundation)

### Backend

- Modular folders created:
  - `app/Domain`
  - `app/Application`
  - `app/Infrastructure`
  - `app/Http`
- Service + Repository pattern will be implemented per module in next milestones.
- API versioning is in place: `/api/v1/*`.
- Standard JSON envelope exists (`success`, `message`, `data`, `meta`).
- Tenant context middleware (`X-Tenant-Id`) and tenant global scope trait are scaffolded.
- UUID primary keys are used for tenant-owned core models (`tenants`, `users`).
- Sanctum (SPA auth) installed and configured for stateful API middleware.
- Spatie Permission installed for role-based authorization (`Owner`, `Staff` to be seeded in next milestone).

### Frontend

- React + TS strict mode
- TanStack Router base layout and route setup
- TanStack Query provider configured globally
- ESLint + Prettier configured

## MVP Demo Flow (Target)

1. Register tenant organization and owner account.
2. Owner logs in via SPA cookie auth.
3. Owner creates properties and rooms.
4. Staff manages tenants and leases.
5. System generates monthly bills and penalties.
6. Payments recorded (partial payments supported).
7. Dashboard shows occupancy, receivables, and payment summary.
8. Export CSV reports.

## GitHub (Manual if `gh` CLI unavailable)

1. Create repo `boardinghouse-saas` on GitHub.
2. Connect remote:

```bash
git remote set-url origin https://github.com/<your-user>/boardinghouse-saas.git
```

3. Push:

```bash
git push -u origin main
```
