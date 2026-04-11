import Link from "next/link";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export type ShowCardProps = {
  slug: string;
  title: string;
  tagline?: string | null;
  genre?: string | null;
  ageRange?: string | null;
  posterUrl?: string | null;
  nextPerformance?: Date | null;
};

export function ShowCard({
  slug,
  title,
  tagline,
  genre,
  ageRange,
  posterUrl,
  nextPerformance,
}: ShowCardProps) {
  return (
    <Link href={`/shows/${slug}`} className="group">
      <Card className="overflow-hidden border-border/60 bg-card/80 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          {posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent to-secondary/10">
              <span className="font-heading text-3xl text-muted-foreground">
                {title.slice(0, 1)}
              </span>
            </div>
          )}
          {genre && (
            <Badge className="absolute left-3 top-3 bg-background/85 text-foreground backdrop-blur">
              {genre}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold leading-tight group-hover:text-primary">
              {title}
            </h3>
            {ageRange && (
              <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                {ageRange}
              </span>
            )}
          </div>
          {tagline && (
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {tagline}
            </p>
          )}
          {nextPerformance && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              <span>
                Next:{" "}
                {nextPerformance.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
