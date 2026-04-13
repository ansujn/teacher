"use server";

import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function subscribeNewsletter(email: string) {
  const parsed = schema.safeParse({ email });
  if (!parsed.success) return { ok: false, error: "Invalid email address" };

  // Phase 1: log signups to Vercel Runtime Logs (filter: [newsletter-signup]).
  // Phase 2: swap for a real email provider (Mailchimp, ConvertKit, Resend, etc.).
  console.log(
    "[newsletter-signup]",
    JSON.stringify({
      email: parsed.data.email,
      receivedAt: new Date().toISOString(),
    })
  );

  return { ok: true as const };
}
