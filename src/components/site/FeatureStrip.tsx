import { GraduationCap, Users, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Schools & educators",
    body: "Bring high-quality, curriculum-aligned theatre to your students without leaving the classroom.",
  },
  {
    icon: Users,
    title: "Theatre companies",
    body: "List your productions, manage your touring calendar, and reach new audiences across the country.",
  },
  {
    icon: HeartHandshake,
    title: "Facilitators",
    body: "Run workshops and post-show conversations that deepen every young audience's experience.",
  },
];

export function FeatureStrip() {
  return (
    <section className="border-b border-border/60 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            A platform for every part of the journey
          </h2>
          <p className="mt-3 text-muted-foreground">
            From artists to educators, everyone who builds theatre for young people has a place here.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
