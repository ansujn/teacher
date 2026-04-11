import "dotenv/config";
import { defineConfig } from "prisma/config";

// IMPORTANT: For CLI operations (`prisma db push`, `prisma migrate`, etc.)
// we need a DIRECT Postgres connection — NOT a pooled one. Supabase's
// transaction pooler (PgBouncer in transaction mode, port 6543) does not
// reliably support DDL statements like CREATE TABLE / ALTER TABLE, so
// `db push` will hang forever if we point it at the pooler.
//
// Vercel's Supabase integration injects:
//   POSTGRES_URL_NON_POOLING  → direct connection, port 5432  ← use for CLI
//   POSTGRES_PRISMA_URL       → pooled connection,   port 6543  ← use at runtime
//
// Locally, the user can set DATABASE_URL to whichever they prefer.
const cliUrl =
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: cliUrl,
  },
});
