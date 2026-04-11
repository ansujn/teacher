"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleHandled(formData: FormData) {
  const id = formData.get("id") as string;
  const current = formData.get("current") === "true";
  if (!id) return;
  await prisma.contactSubmission.update({
    where: { id },
    data: { handled: !current },
  });
  revalidatePath("/admin/contact");
}

export async function deleteContact(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contact");
}
