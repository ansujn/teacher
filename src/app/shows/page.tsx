import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ShowCard } from "@/components/site/ShowCard";
import { getPublishedShows } from "@/lib/queries";

export const metadata = { title: "Shows" };

export default async function ShowsPage() {
  const shows = await getPublishedShows();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-gradient-to-b from-accent/60 to-background py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              All productions
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Browse every show currently in our catalogue. Tap any production for the full synopsis, cast, and upcoming performances.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {shows.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No shows published yet.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {shows.map((show) => (
                  <ShowCard
                    key={show.id}
                    slug={show.slug}
                    title={show.title}
                    tagline={show.tagline}
                    genre={show.genre}
                    ageRange={show.ageRange}
                    posterUrl={show.posterUrl}
                    nextPerformance={show.performances[0]?.startsAt ?? null}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
