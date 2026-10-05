# IPDiagnostics Website

Next.js 15 site with Payload CMS 3 embedded, backed by PostgreSQL. Media is stored on Vercel Blob and email is sent via Resend.

## Local setup

### 1. Create the database

Install PostgreSQL locally and create an empty database (e.g. in pgAdmin: right-click **Databases → Create → Database**).

### 2. Configure environment

```bash
cp .env.example .env
```

Set at least:

```env
POSTGRES_URL=postgresql://<user>:<password>@localhost:5432/<database>
PAYLOAD_SECRET=<any long random string>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Optional: `BLOB_READ_WRITE_TOKEN` (without it, media uploads are stored locally), `REVALIDATION_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, `FORM_NOTIFICATION_EMAIL`.

### 3. Install and run

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 for the site. The CMS admin is not at `/admin`: its path is set by `routes.admin` in `src/payload.config.ts` (and must match the folder name in `src/app/(payload)/`). On first visit to the admin, create your first admin user.

In development Payload pushes schema changes to the database automatically (disable with `PAYLOAD_DB_PUSH=false`).

## Schema changes and migrations

After editing collections, globals or block configs:

```bash
pnpm generate:types           # regenerate src/payload-types.ts
pnpm payload:migrate:create   # create a migration in src/migrations/
```

`pnpm build` runs `payload migrate` before `next build`, so migrations are applied on every production deploy. Check state with `pnpm payload:migrate:status`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server (`pnpm devsafe` clears `.next` first) |
| `pnpm build` | Run migrations, then build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test:int` | Integration tests (Vitest, uses the database from `.env`) |
| `pnpm test:e2e` | End-to-end tests (Playwright) |

## Deployment

Deployed on Vercel using `pnpm build:vercel` (see `vercel.json`). Production requires `POSTGRES_URL`, `PAYLOAD_SECRET` and `BLOB_READ_WRITE_TOKEN`.
