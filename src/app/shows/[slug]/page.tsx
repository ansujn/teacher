import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Globe, MapPin, Ticket, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getShowBySlug } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) return { title: "Show not found" };
  return {
    title: show.title,
    description: show.tagline ?? show.synopsis.slice(0, 160),
  };
}

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show || show.status !== "published") notFound();

  const now = new Date();
  const upcoming = show.performances.filter(
    (p) => p.startsAt.getTime() >= now.getTime()
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-accent/60 to-background">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <Link
                  href="/shows"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← All shows
                </Link>
                <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                  {show.title}
                </h1>
                {show.tagline && (
                  <p className="mt-3 text-xl text-muted-foreground">
                    {show.tagline}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {show.genre && <Badge variant="secondary">{show.genre}</Badge>}
                  {show.ageRange && <Badge variant="outline">Age {show.ageRange}</Badge>}
                  {show.language && <Badge variant="outline">{show.language}</Badge>}
                </div>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  {show.durationMin && (
                    <div className="flex items-center gap-2">
                      <Clock className="size-4" /> {show.durationMin} min
                    </div>
                  )}
                  {show.language && (
                    <div className="flex items-center gap-2">
                      <Globe className="size-4" /> {show.language}
                    </div>
                  )}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      <Ticket className="mr-2 size-4" /> Book this show
                    </Link>
                  </Button>
                  {show.trailerUrl && (
                    <Button asChild variant="outline" size="lg">
                      <a href={show.trailerUrl} target="_blank" rel="noreferrer">
                        Watch trailer
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div className="order-first lg:order-none">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-border/60 bg-muted shadow-lg">
                  {show.posterUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={show.posterUrl}
                      alt={show.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent to-secondary/10">
                      <span className="font-heading text-5xl text-muted-foreground">
                        {show.title.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
            <article className="prose prose-neutral max-w-none">
              <h2 className="font-heading text-2xl font-semibold">Synopsis</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {show.synopsis}
              </p>

              {show.castMembers.length > 0 && (
                <>
                  <h2 className="mt-10 font-heading text-2xl font-semibold">
                    Cast
                  </h2>
                  <ul className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
                    {show.castMembers.map((sc) => (
                      <li
                        key={sc.id}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3"
                      >
                        <div className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
                          <Users className="size-4" />
                        </div>
                        <div>
                          <div className="font-medium">{sc.castMember.name}</div>
                          {sc.character && (
                            <div className="text-xs text-muted-foreground">
                              as {sc.character}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>

            <aside>
              <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                <h3 className="font-heading text-lg font-semibold">
                  Upcoming performances
                </h3>
                {upcoming.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    No scheduled dates at the moment. Get in touch to book a tour.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-4">
                    {upcoming.map((perf) => (
                      <li key={perf.id} className="text-sm">
                        <div className="flex items-center gap-2 font-medium">
                          <Calendar className="size-4 text-primary" />
                          {formatDate(perf.startsAt, "EEE d MMM yyyy")}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                          <MapPin className="size-4" />
                          {perf.venue}
                          {perf.city ? `, ${perf.city}` : ""}
                        </div>
                        {perf.ticketUrl && (
                          <a
                            href={perf.ticketUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-primary hover:underline"
                          >
                            Get tickets →
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
