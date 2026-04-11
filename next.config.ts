import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma's native deps out of the Next.js bundler so they resolve
  // at runtime on Vercel's Node serverless functions.
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
