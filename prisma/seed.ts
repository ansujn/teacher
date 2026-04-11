import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error(
    "No database URL found. Set DATABASE_URL or POSTGRES_PRISMA_URL."
  );
}
const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

function daysFromNow(days: number, hours = 18, minutes = 30) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      name: "Site Admin",
      passwordHash,
      role: "admin",
    },
  });

  // Cast members
  const castSeed = [
    {
      slug: "ava-nkosi",
      name: "Ava Nkosi",
      role: "Artistic Director",
      order: 0,
      bio: "Ava founded the company in 2014 with the belief that every young person deserves live theatre. She has directed over twenty productions.",
    },
    {
      slug: "jabu-dlamini",
      name: "Jabu Dlamini",
      role: "Lead Actor",
      order: 1,
      bio: "Jabu trained at Wits School of Arts and has performed across three continents in productions for young audiences.",
    },
    {
      slug: "maria-venter",
      name: "Maria Venter",
      role: "Puppetry & Design",
      order: 2,
      bio: "Maria designs hand-built puppets and set pieces that travel light enough for a school hall and bold enough for a main stage.",
    },
    {
      slug: "thando-radebe",
      name: "Thando Radebe",
      role: "Facilitator",
      order: 3,
      bio: "Thando leads post-show conversations and classroom workshops that unpack each performance with students.",
    },
  ];
  await Promise.all(
    castSeed.map((m) =>
      prisma.castMember.upsert({
        where: { slug: m.slug },
        update: m,
        create: m,
      })
    )
  );
  const cast = await prisma.castMember.findMany();

  // Shows
  const showSeed = [
    {
      slug: "the-flying-suitcase",
      title: "The Flying Suitcase",
      tagline: "A bag of tricks, a world of stories.",
      synopsis:
        "A travelling storyteller arrives at a rural school with nothing but a battered leather suitcase — and unfolds tales from five continents. Songs, puppets, and shadow play combine in this joyful celebration of the imagination.",
      genre: "Storytelling",
      ageRange: "5+",
      durationMin: 50,
      language: "English",
      status: "published",
      featured: true,
      posterUrl:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=70",
    },
    {
      slug: "the-year-of-the-bicycle",
      title: "The Year of the Bicycle",
      tagline: "Two wheels, one community, a thousand small revolutions.",
      synopsis:
        "When twelve-year-old Lerato saves up for a second-hand bicycle, she sets off a chain of events that transforms her neighbourhood. A poignant physical-theatre piece about persistence, friendship, and everyday courage.",
      genre: "Physical Theatre",
      ageRange: "9+",
      durationMin: 55,
      language: "English / isiZulu",
      status: "published",
      featured: true,
      posterUrl:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70",
    },
    {
      slug: "moonbird",
      title: "Moonbird",
      tagline: "A lullaby for anyone who has ever felt small.",
      synopsis:
        "An original family musical about a shy barn owl who dreams of singing for the moon. With an ensemble of actor-musicians and a live score, Moonbird is suitable for the youngest audiences.",
      genre: "Musical",
      ageRange: "3+",
      durationMin: 40,
      language: "English",
      status: "published",
      featured: true,
      posterUrl:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=70",
    },
    {
      slug: "hackathon",
      title: "Hackathon",
      tagline: "Four teens, one weekend, no adults.",
      synopsis:
        "A smart, funny ensemble play set at a 48-hour coding competition. Hackathon tackles friendship, rivalry, and the thrill of making something from nothing. Perfect for high-school audiences.",
      genre: "Drama",
      ageRange: "13+",
      durationMin: 65,
      language: "English",
      status: "published",
      featured: true,
      posterUrl:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=70",
    },
    {
      slug: "the-river-that-remembered",
      title: "The River That Remembered",
      tagline: "Myth, memory, and the water that ties them together.",
      synopsis:
        "A lyrical, movement-based piece drawing on folk tales from across southern Africa. Suitable for upper-primary and high-school audiences, with a companion study guide for teachers.",
      genre: "Movement",
      ageRange: "10+",
      durationMin: 60,
      language: "English",
      status: "published",
      featured: false,
      posterUrl:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=70",
    },
    {
      slug: "paper-boats",
      title: "Paper Boats",
      tagline: "A quiet play about very loud feelings.",
      synopsis:
        "Two siblings learn to navigate grief after their grandmother's passing. Gentle, honest, and interactive — with time built in for reflection and discussion afterwards.",
      genre: "Drama",
      ageRange: "8+",
      durationMin: 45,
      language: "English",
      status: "published",
      featured: false,
      posterUrl:
        "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=900&q=70",
    },
  ];

  for (const s of showSeed) {
    await prisma.show.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  const shows = await prisma.show.findMany();

  // Cast-to-show links
  const flying = shows.find((s) => s.slug === "the-flying-suitcase")!;
  const bike = shows.find((s) => s.slug === "the-year-of-the-bicycle")!;
  const moon = shows.find((s) => s.slug === "moonbird")!;
  const hack = shows.find((s) => s.slug === "hackathon")!;
  const ava = cast.find((c) => c.slug === "ava-nkosi")!;
  const jabu = cast.find((c) => c.slug === "jabu-dlamini")!;
  const maria = cast.find((c) => c.slug === "maria-venter")!;
  const thando = cast.find((c) => c.slug === "thando-radebe")!;

  const links = [
    { showId: flying.id, castMemberId: jabu.id, character: "The Storyteller", order: 0 },
    { showId: flying.id, castMemberId: maria.id, character: "Puppeteer", order: 1 },
    { showId: bike.id, castMemberId: jabu.id, character: "Brother", order: 0 },
    { showId: bike.id, castMemberId: ava.id, character: "Director", order: 1 },
    { showId: moon.id, castMemberId: maria.id, character: "Moonbird", order: 0 },
    { showId: hack.id, castMemberId: thando.id, character: "Jordan", order: 0 },
  ];
  for (const link of links) {
    await prisma.showCast.upsert({
      where: {
        showId_castMemberId: {
          showId: link.showId,
          castMemberId: link.castMemberId,
        },
      },
      update: { character: link.character, order: link.order },
      create: link,
    });
  }

  // Performances
  await prisma.performance.deleteMany();
  const perfSeed = [
    { show: flying, venue: "Baxter Theatre", city: "Cape Town", days: 7 },
    { show: flying, venue: "Market Theatre", city: "Johannesburg", days: 21 },
    { show: bike, venue: "Joburg Theatre", city: "Johannesburg", days: 14 },
    { show: moon, venue: "Artscape Arena", city: "Cape Town", days: 10 },
    { show: moon, venue: "Durban Playhouse", city: "Durban", days: 30 },
    { show: hack, venue: "Wits Theatre", city: "Johannesburg", days: 45 },
  ];
  for (const p of perfSeed) {
    await prisma.performance.create({
      data: {
        showId: p.show.id,
        venue: p.venue,
        city: p.city,
        startsAt: daysFromNow(p.days),
        ticketUrl: "https://example.com/tickets",
        priceInfo: "R80 adults, R40 students",
      },
    });
  }

  // News posts
  const newsSeed = [
    {
      slug: "spring-tour-announced",
      title: "Spring tour dates announced",
      excerpt:
        "Six cities, three productions, eight weeks on the road. Here is everywhere we are headed this season.",
      body: "We're thrilled to share the full schedule for our spring tour. Over the next eight weeks we'll be in schools, community centres, and main-stage venues across the country.\n\nBook your slot early — shows fill up fast and we can only extend our tour if enough schools sign up in advance.",
      publishedAt: daysFromNow(-14, 9, 0),
      published: true,
    },
    {
      slug: "welcome-thando",
      title: "Welcome to Thando, our new lead facilitator",
      excerpt:
        "Meet the newest addition to our facilitation team — and find out what to expect in a post-show workshop.",
      body: "This month we're welcoming Thando Radebe as our lead facilitator. Thando will be running workshops alongside every show, giving students the chance to unpack the performance with someone who knows the work inside-out.",
      publishedAt: daysFromNow(-30, 11, 0),
      published: true,
    },
    {
      slug: "a-note-on-accessibility",
      title: "A note on accessibility",
      excerpt:
        "Why every one of our shows ships with captioning, audio descriptions, and sensory-friendly versions.",
      body: "Accessibility is not a feature we add at the end — it's part of how every show is made. This post explains how our productions adapt to your audience and what we need from you to make it work.",
      publishedAt: daysFromNow(-60, 16, 0),
      published: true,
    },
  ];
  for (const n of newsSeed) {
    await prisma.newsPost.upsert({
      where: { slug: n.slug },
      update: n,
      create: n,
    });
  }

  // About page content
  await prisma.page.upsert({
    where: { slug: "about" },
    update: {
      title: "About us",
      body: "We make theatre for young audiences — stories that are honest, joyful, and made to travel. Since our founding, we've taken productions into schools, festivals, and main-stage venues, working with teachers and students to make every show a doorway into conversation.\n\nThis site is a generic, open-source template. Fork it, rename it, and make it your own. Every piece of content you see here — shows, news, cast members, contact details — can be edited from the admin dashboard at /admin.",
      published: true,
    },
    create: {
      slug: "about",
      title: "About us",
      body: "We make theatre for young audiences — stories that are honest, joyful, and made to travel. Since our founding, we've taken productions into schools, festivals, and main-stage venues, working with teachers and students to make every show a doorway into conversation.\n\nThis site is a generic, open-source template. Fork it, rename it, and make it your own. Every piece of content you see here — shows, news, cast members, contact details — can be edited from the admin dashboard at /admin.",
      published: true,
    },
  });

  console.log("✓ Seed complete");
  console.log(`  Admin login: ${email} / ${password}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
