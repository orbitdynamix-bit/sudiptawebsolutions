# PHP Backend (MySQL API)

Minimal PHP 8.4 + MySQL backend for lead capture features used by the frontend:
- Project queries
- Appointment booking
- Newsletter subscribers

## 1) Setup

```bash
cd backend
cp .env.example .env
```

Update `.env` with your MySQL credentials.

Important `.env` keys:
- `PROJECT_QUERY_NOTIFICATION_EMAIL` -> recipient for project query emails (change anytime)
- `ADMIN_SESSION_SECRET`, `ADMIN_SESSION_TTL` -> session token signing/expiry
- `ADMIN_API_KEY` -> optional legacy key for `GET /api/project-queries`
- `MAIL_FROM_EMAIL`, `MAIL_FROM_NAME`, `MAIL_ENABLED` -> outgoing mail behavior
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_TIMEOUT` -> SMTP transport settings

### Gmail SMTP example

Use a Gmail App Password (not your normal Gmail password):
- `MAIL_FROM_EMAIL=souravhalder583@gmail.com`
- `PROJECT_QUERY_NOTIFICATION_EMAIL=souravhalder583@gmail.com`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=tls`
- `SMTP_USERNAME=souravhalder583@gmail.com`
- `SMTP_PASSWORD=<16-char-app-password>`

## 2) Create tables

```bash
mysql -u root -p sudiptawebsolutions < sql/schema.sql
```

Replace `root` and database name as needed.

## 3) Run locally

```bash
cd backend
php -S 127.0.0.1:8080 -t public public/index.php
```

Base URL: `http://127.0.0.1:8080/api`

## Swagger API Docs

- Local docs UI: `http://127.0.0.1:8080/docs/`
- OpenAPI file: `backend/public/docs/openapi.yaml`
- Production docs UI (after deploy): `https://api.sudiptawebsolutions.com/docs/`

## API Endpoints

- `GET /api/health`
- `POST /api/admin/login`
- `GET /api/project-queries` (requires `Authorization: Bearer <token>`)
- `POST /api/project-queries`
- `POST /api/appointments`
- `POST /api/subscribers`

### Example payloads

```bash
curl -X POST http://127.0.0.1:8080/api/project-queries \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","service":"Web Development","message":"Need a website."}'
```

```bash
curl -X POST http://127.0.0.1:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret123"}'
```

```bash
curl "http://127.0.0.1:8080/api/project-queries?page=1&per_page=20" \
  -H "Authorization: Bearer <token-from-login>"
```

```bash
curl -X POST http://127.0.0.1:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","company":"Acme","preferredDate":"2026-03-15","mode":"Online","notes":"Discuss scope and budget."}'
```

```bash
curl -X POST http://127.0.0.1:8080/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

## Deploy notes

- Point web root to `backend/public`.
- Keep `.env` outside public access.
- Set `ALLOWED_ORIGIN=https://sudiptawebsolutions.com` in production.
- For reliable delivery, always use SMTP credentials from your mail provider.

## Admin user setup

Create or update admin user (stores hashed password):

```bash
php backend/scripts/create_admin.php souravhalder583@gmail.com "YourStrongPassword"
```
