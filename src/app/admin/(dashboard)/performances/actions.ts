"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  id: z.string().optional(),
  showId: z.string().min(1),
  venue: z.string().min(1),
  city: z.string().optional(),
  startsAt: z.string().min(1),
  endsAt: z.string().optional(),
  ticketUrl: z.string().url().optional().or(z.literal("")),
  priceInfo: z.string().optional(),
  notes: z.string().optional(),
});

function clean(d: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(d)) {
    if (v === "" || v === undefined) continue;
    out[k] = v;
  }
  return out;
}

export async function upsertPerformance(formData: FormData) {
  const parsed = schema.parse({
    id: formData.get("id") || undefined,
    showId: formData.get("showId"),
    venue: formData.get("venue"),
    city: formData.get("city") || undefined,
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt") || undefined,
    ticketUrl: formData.get("ticketUrl") || "",
    priceInfo: formData.get("priceInfo") || undefined,
    notes: formData.get("notes") || undefined,
  });

  const data = clean({
    showId: parsed.showId,
    venue: parsed.venue,
    city: parsed.city,
    startsAt: new Date(parsed.startsAt),
    endsAt: parsed.endsAt ? new Date(parsed.endsAt) : undefined,
    ticketUrl: parsed.ticketUrl,
    priceInfo: parsed.priceInfo,
    notes: parsed.notes,
  });

  if (parsed.id) {
    await prisma.performance.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.performance.create({ data: data as never });
  }
  revalidatePath("/admin/performances");
  revalidatePath("/shows");
  redirect("/admin/performances");
}

export async function deletePerformance(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.performance.delete({ where: { id } });
  revalidatePath("/admin/performances");
}
