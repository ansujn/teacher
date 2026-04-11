"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

const showSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().max(120).optional(),
  tagline: z.string().max(300).optional(),
  synopsis: z.string().min(1),
  genre: z.string().max(80).optional(),
  ageRange: z.string().max(40).optional(),
  durationMin: z.coerce.number().int().min(0).max(600).optional(),
  language: z.string().max(60).optional(),
  posterUrl: z.string().url().optional().or(z.literal("")),
  trailerUrl: z.string().url().optional().or(z.literal("")),
  heroImageUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.coerce.boolean().default(false),
});

function cleanOptional<T extends Record<string, unknown>>(obj: T) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === "" || v === undefined) continue;
    out[k] = v;
  }
  return out;
}

export async function upsertShow(formData: FormData) {
  const parsed = showSchema.parse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    tagline: formData.get("tagline") || undefined,
    synopsis: formData.get("synopsis"),
    genre: formData.get("genre") || undefined,
    ageRange: formData.get("ageRange") || undefined,
    durationMin: formData.get("durationMin") || undefined,
    language: formData.get("language") || undefined,
    posterUrl: formData.get("posterUrl") || "",
    trailerUrl: formData.get("trailerUrl") || "",
    heroImageUrl: formData.get("heroImageUrl") || "",
    status: formData.get("status") || "draft",
    featured: formData.get("featured") === "on",
  });

  const slug = parsed.slug && parsed.slug.length ? slugify(parsed.slug) : slugify(parsed.title);
  const data = cleanOptional({ ...parsed, slug });
  delete (data as Record<string, unknown>).id;

  if (parsed.id) {
    await prisma.show.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.show.create({ data: data as never });
  }
  revalidatePath("/admin/shows");
  revalidatePath("/shows");
  revalidatePath("/");
  redirect("/admin/shows");
}

export async function deleteShow(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.show.delete({ where: { id } });
  revalidatePath("/admin/shows");
  revalidatePath("/shows");
  revalidatePath("/");
}
