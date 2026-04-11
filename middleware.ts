import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Edge-safe auth instance — no Prisma import chain. Middleware only needs
// session/JWT info to decide whether to redirect to /admin/login.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Exclude /admin/login (and the auth API routes) so they are never
  // intercepted by the session check — that would cause a redirect loop
  // where the sign-in page itself demands a session.
  matcher: ["/admin/((?!login).*)", "/admin"],
};
