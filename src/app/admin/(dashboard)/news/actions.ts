"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().max(120).optional(),
  excerpt: z.string().optional(),
  body: z.string().min(1),
  coverUrl: z.string().url().optional().or(z.literal("")),
  published: z.coerce.boolean().default(false),
});

export async function upsertNews(formData: FormData) {
  const parsed = schema.parse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    excerpt: formData.get("excerpt") || undefined,
    body: formData.get("body"),
    coverUrl: formData.get("coverUrl") || "",
    published: formData.get("published") === "on",
  });

  const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);
  const data: Record<string, unknown> = {
    title: parsed.title,
    slug,
    excerpt: parsed.excerpt || null,
    body: parsed.body,
    coverUrl: parsed.coverUrl || null,
    published: parsed.published,
    publishedAt: parsed.published ? new Date() : null,
  };

  if (parsed.id) {
    const existing = await prisma.newsPost.findUnique({ where: { id: parsed.id } });
    if (existing?.publishedAt && parsed.published) {
      data.publishedAt = existing.publishedAt;
    }
    await prisma.newsPost.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.newsPost.create({ data: data as never });
  }
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.newsPost.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
}
