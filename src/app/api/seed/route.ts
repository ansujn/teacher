import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function daysFromNow(days: number, hours = 18, minutes = 30) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

/**
 * One-shot seed endpoint for production databases.
 *
 * Usage:
 *   curl -X POST https://your-app.vercel.app/api/seed \
 *        -H "Authorization: Bearer $SEED_SECRET"
 *
 * Safe to call multiple times — all writes use upsert so re-runs are idempotent.
 * Requires SEED_SECRET env var; returns 401 without it.
 */
export async function POST(req: Request) {
  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "SEED_SECRET is not configured on the server" },
      { status: 500 }
    );
  }
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  if (token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, name: "Site Admin", passwordHash, role: "admin" },
  });

  const castSeed = [
    { slug: "ava-nkosi", name: "Ava Nkosi", role: "Artistic Director", order: 0, bio: "Ava founded the company with the belief that every young person deserves live theatre." },
    { slug: "jabu-dlamini", name: "Jabu Dlamini", role: "Lead Actor", order: 1, bio: "Jabu has performed across three continents in productions for young audiences." },
    { slug: "maria-venter", name: "Maria Venter", role: "Puppetry & Design", order: 2, bio: "Maria designs hand-built puppets and set pieces that travel light." },
    { slug: "thando-radebe", name: "Thando Radebe", role: "Facilitator", order: 3, bio: "Thando leads post-show conversations and classroom workshops." },
  ];
  for (const m of castSeed) {
    await prisma.castMember.upsert({ where: { slug: m.slug }, update: m, create: m });
  }

  const showSeed = [
    { slug: "the-flying-suitcase", title: "The Flying Suitcase", tagline: "A bag of tricks, a world of stories.", synopsis: "A travelling storyteller arrives at a rural school with nothing but a battered leather suitcase — and unfolds tales from five continents.", genre: "Storytelling", ageRange: "5+", durationMin: 50, language: "English", status: "published", featured: true, posterUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=70" },
    { slug: "the-year-of-the-bicycle", title: "The Year of the Bicycle", tagline: "Two wheels, one community, a thousand small revolutions.", synopsis: "When twelve-year-old Lerato saves up for a second-hand bicycle, she sets off a chain of events that transforms her neighbourhood.", genre: "Physical Theatre", ageRange: "9+", durationMin: 55, language: "English / isiZulu", status: "published", featured: true, posterUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70" },
    { slug: "moonbird", title: "Moonbird", tagline: "A lullaby for anyone who has ever felt small.", synopsis: "An original family musical about a shy barn owl who dreams of singing for the moon.", genre: "Musical", ageRange: "3+", durationMin: 40, language: "English", status: "published", featured: true, posterUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=70" },
    { slug: "hackathon", title: "Hackathon", tagline: "Four teens, one weekend, no adults.", synopsis: "A smart, funny ensemble play set at a 48-hour coding competition.", genre: "Drama", ageRange: "13+", durationMin: 65, language: "English", status: "published", featured: true, posterUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=70" },
  ];
  for (const s of showSeed) {
    await prisma.show.upsert({ where: { slug: s.slug }, update: s, create: s });
  }

  const shows = await prisma.show.findMany();
  const firstShow = shows[0];
  if (firstShow) {
    const existingPerf = await prisma.performance.findFirst({ where: { showId: firstShow.id } });
    if (!existingPerf) {
      await prisma.performance.create({
        data: {
          showId: firstShow.id,
          venue: "Baxter Theatre",
          city: "Cape Town",
          startsAt: daysFromNow(14),
          ticketUrl: "https://example.com/tickets",
          priceInfo: "R80 adults, R40 students",
        },
      });
    }
  }

  await prisma.newsPost.upsert({
    where: { slug: "welcome" },
    update: {},
    create: {
      slug: "welcome",
      title: "Welcome to our new site",
      excerpt: "We've rebuilt everything from scratch — here's a quick tour.",
      body: "Our new website is live. Browse the shows, check upcoming tour dates, and get in touch if you'd like to bring a production to your school or venue.",
      published: true,
      publishedAt: new Date(),
    },
  });

  await prisma.page.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      slug: "about",
      title: "About us",
      body: "We make theatre for young audiences — stories that are honest, joyful, and made to travel. Every piece of content on this site can be edited from the admin dashboard at /admin.",
      published: true,
    },
  });

  return NextResponse.json({ ok: true, adminEmail: email });
}
