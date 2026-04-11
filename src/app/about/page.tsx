import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/config/site";
import { getPage } from "@/lib/queries";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const page = await getPage("about");
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-gradient-to-b from-accent/60 to-background py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {page?.title ?? `About ${siteConfig.name}`}
            </h1>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90">
              {page?.body ?? siteConfig.description}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
