"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(160),
  slug: z.string().max(120).optional(),
  role: z.string().max(120).optional(),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
});

export async function upsertCast(formData: FormData) {
  const parsed = schema.parse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    slug: formData.get("slug") || undefined,
    role: formData.get("role") || undefined,
    bio: formData.get("bio") || undefined,
    photoUrl: formData.get("photoUrl") || "",
    order: formData.get("order") || 0,
  });

  const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.name);
  const data: Record<string, unknown> = {
    name: parsed.name,
    slug,
    role: parsed.role || null,
    bio: parsed.bio || null,
    photoUrl: parsed.photoUrl || null,
    order: parsed.order,
  };

  if (parsed.id) {
    await prisma.castMember.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.castMember.create({ data: data as never });
  }
  revalidatePath("/admin/cast");
  revalidatePath("/cast");
  redirect("/admin/cast");
}

export async function deleteCast(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.castMember.delete({ where: { id } });
  revalidatePath("/admin/cast");
  revalidatePath("/cast");
}
