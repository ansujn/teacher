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
  // PrismaPg uses the standard `pg` driver and works with any Postgres URL
  // (Neon, Vercel Postgres, Supabase, Railway, local docker, etc.).
  const adapter = new PrismaPg(connectionString);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
