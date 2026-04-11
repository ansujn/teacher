import { prisma } from "@/lib/prisma";

export async function getFeaturedShows(limit = 4) {
  return prisma.show.findMany({
    where: { status: "published", featured: true },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      performances: {
        where: { startsAt: { gte: new Date() } },
        orderBy: { startsAt: "asc" },
        take: 1,
      },
    },
  });
}

export async function getPublishedShows() {
  return prisma.show.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    include: {
      performances: {
        where: { startsAt: { gte: new Date() } },
        orderBy: { startsAt: "asc" },
        take: 1,
      },
    },
  });
}

export async function getShowBySlug(slug: string) {
  return prisma.show.findUnique({
    where: { slug },
    include: {
      performances: { orderBy: { startsAt: "asc" } },
      castMembers: {
        orderBy: { order: "asc" },
        include: { castMember: true },
      },
    },
  });
}

export async function getRecentNews(limit = 3) {
  return prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getAllNews() {
  return prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getNewsBySlug(slug: string) {
  return prisma.newsPost.findUnique({ where: { slug } });
}

export async function getAllCast() {
  return prisma.castMember.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
}

export async function getPage(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export async function countShows() {
  return prisma.show.count({ where: { status: "published", featured: true } });
}
