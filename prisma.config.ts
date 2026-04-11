import "dotenv/config";
import { defineConfig } from "prisma/config";

// Accept either DATABASE_URL (standard) or POSTGRES_PRISMA_URL
// (auto-injected by Vercel's Supabase / Vercel Postgres integrations).
const connectionString =
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
    url: connectionString,
  },
});
