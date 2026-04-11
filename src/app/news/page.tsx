import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllNews } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export const metadata = { title: "News" };

export default async function NewsPage() {
  const posts = await getAllNews();
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-gradient-to-b from-accent/60 to-background py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              News & announcements
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Keep up with tour dates, press, and backstage stories.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No posts yet.
              </div>
            ) : (
              <ul className="space-y-8">
                {posts.map((post) => (
                  <li key={post.id} className="border-b border-border/60 pb-8 last:border-none">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {post.publishedAt ? formatDate(post.publishedAt) : ""}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold">
                      <Link href={`/news/${post.slug}`} className="hover:text-primary">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                    )}
                    <Link
                      href={`/news/${post.slug}`}
                      className="mt-3 inline-block text-sm font-medium text-primary"
                    >
                      Read more →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
