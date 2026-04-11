"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(5, "Message is too short").max(5000),
});

export type ContactState =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the errors below",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.contactSubmission.create({ data: parsed.data });
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not send message. Try again." };
  }
}
