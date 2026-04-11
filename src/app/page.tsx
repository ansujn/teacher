import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { FeatureStrip } from "@/components/site/FeatureStrip";
import { ShowCard } from "@/components/site/ShowCard";
import { Button } from "@/components/ui/button";
import {
  getFeaturedShows,
  getRecentNews,
  countShows,
} from "@/lib/queries";
import { formatDate } from "@/lib/format";

export default async function Home() {
  const [featured, news, featuredCount] = await Promise.all([
    getFeaturedShows(4),
    getRecentNews(3),
    countShows(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero featuredCount={featuredCount} />
        <FeatureStrip />

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Featured productions
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Hand-picked shows currently touring.
                </p>
              </div>
              <Button variant="ghost" asChild className="shrink-0">
                <Link href="/shows">
                  See all <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>

            {featured.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No featured shows yet. Sign in to the admin to publish some.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((show) => (
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

        {news.length > 0 && (
          <section className="border-t border-border/60 bg-muted/30 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                    Latest news
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Announcements, backstage stories, and press.
                  </p>
                </div>
                <Button variant="ghost" asChild className="shrink-0">
                  <Link href="/news">
                    All posts <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {news.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-semibold leading-snug group-hover:text-primary">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      Read more <ArrowRight className="ml-1 size-4" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to bring theatre to your audience?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your school, festival, or venue and we&apos;ll help you pick a show that fits.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/shows">See our shows</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
