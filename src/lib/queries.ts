import { shows, type Show } from "@/content/shows";
import { performances } from "@/content/performances";
import { showCast } from "@/content/show-cast";
import { cast } from "@/content/cast";
import { news } from "@/content/news";
import { pages } from "@/content/pages";

function performancesForShow(
  showId: string,
  opts: { upcomingOnly?: boolean } = {}
) {
  const now = new Date();
  return performances
    .filter((p) => p.showId === showId)
    .filter(
      (p) => !opts.upcomingOnly || p.startsAt.getTime() >= now.getTime()
    )
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
}

function withNextPerformance(show: Show) {
  return {
    ...show,
    performances: performancesForShow(show.id, { upcomingOnly: true }).slice(
      0,
      1
    ),
  };
}

function withFullRelations(show: Show) {
  return {
    ...show,
    performances: performancesForShow(show.id),
    castMembers: showCast
      .filter((sc) => sc.showId === show.id)
      .sort((a, b) => a.order - b.order)
      .map((sc) => ({
        id: `${sc.showId}-${sc.castMemberId}`,
        showId: sc.showId,
        castMemberId: sc.castMemberId,
        character: sc.character,
        order: sc.order,
        castMember: cast.find((c) => c.id === sc.castMemberId)!,
      })),
  };
}

export async function getFeaturedShows(limit = 4) {
  return shows
    .filter((s) => s.status === "published" && s.featured)
    .slice(0, limit)
    .map(withNextPerformance);
}

export async function getPublishedShows() {
  return shows
    .filter((s) => s.status === "published")
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .map(withNextPerformance);
}

export async function getShowBySlug(slug: string) {
  const show = shows.find((s) => s.slug === slug);
  return show ? withFullRelations(show) : null;
}

export async function getAllShowSlugs() {
  return shows
    .filter((s) => s.status === "published")
    .map((s) => ({ slug: s.slug }));
}

export async function getRecentNews(limit = 3) {
  return news
    .filter((n) => n.published)
    .sort(
      (a, b) =>
        (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
    )
    .slice(0, limit);
}

export async function getAllNews() {
  return news
    .filter((n) => n.published)
    .sort(
      (a, b) =>
        (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
    );
}

export async function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug) ?? null;
}

export async function getAllNewsSlugs() {
  return news.filter((n) => n.published).map((n) => ({ slug: n.slug }));
}

export async function getAllCast() {
  return [...cast].sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name)
  );
}

export async function getPage(slug: string) {
  return pages.find((p) => p.slug === slug) ?? null;
}

export async function countShows() {
  return shows.filter((s) => s.status === "published" && s.featured).length;
}
