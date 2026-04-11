import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  // Accept either DATABASE_URL (standard) or POSTGRES_PRISMA_URL
  // (auto-injected by Vercel's Supabase / Vercel Postgres integrations).
  const connectionString =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "No database URL found. Set DATABASE_URL (or POSTGRES_PRISMA_URL from the Supabase / Vercel Postgres integration)."
    );
  }
  // Supabase's Postgres serves a certificate that isn't in Node's default
  // trusted-CA bundle, so the `pg` driver throws "self-signed certificate
  // in certificate chain" with strict verification. Traffic is still
  // TLS-encrypted; we just skip chain validation, which is the standard
  // pattern for Supabase + serverless (also matches what `sslmode=no-verify`
  // would do at the libpq layer).
  const adapter = new PrismaPg({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
