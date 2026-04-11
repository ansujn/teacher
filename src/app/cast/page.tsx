import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllCast } from "@/lib/queries";

export const metadata = { title: "Cast" };

export default async function CastPage() {
  const cast = await getAllCast();
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-gradient-to-b from-accent/60 to-background py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Our cast & creatives
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Meet the artists, directors, and facilitators behind every performance.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {cast.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                No cast members added yet.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cast.map((m) => (
                  <div
                    key={m.id}
                    className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
                  >
                    <div className="aspect-[4/5] w-full bg-muted">
                      {m.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent to-secondary/10">
                          <span className="font-heading text-4xl text-muted-foreground">
                            {m.name.slice(0, 1)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-semibold">{m.name}</h3>
                      {m.role && (
                        <p className="text-sm text-muted-foreground">{m.role}</p>
                      )}
                      {m.bio && (
                        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{m.bio}</p>
                      )}
                    </div>
                  </div>
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
