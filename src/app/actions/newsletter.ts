"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function subscribeNewsletter(email: string) {
  const parsed = schema.safeParse({ email });
  if (!parsed.success) return { ok: false, error: "Invalid email address" };
  try {
    await prisma.newsletterSignup.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not subscribe. Try again." };
  }
}
