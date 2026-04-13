import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return getAllNewsSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground">
            ← All news
          </Link>
          <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          {post.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverUrl}
              alt=""
              className="mt-8 w-full rounded-xl border border-border/60 object-cover"
            />
          )}
          <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-foreground/90">
            {post.body}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
