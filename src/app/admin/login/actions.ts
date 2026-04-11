"use server";

import { signIn } from "@/lib/auth";

export async function signInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true as const };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid email or password";
    return { ok: false as const, error: message };
  }
}
