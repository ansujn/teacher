import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero({
  featuredCount,
}: {
  featuredCount: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-accent/60 via-background to-background">
      {/* decorative spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-secondary/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="fade-up max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {featuredCount} featured productions on tour
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6">
              <Link href="/shows">
                <Ticket className="mr-2 size-4" />
                Browse shows
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6">
              <Link href="/contact">
                Book for your school
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
