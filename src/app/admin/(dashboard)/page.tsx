import Link from "next/link";
import { Theater, CalendarClock, Users, Newspaper, Inbox, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Dashboard" };

async function getStats() {
  const [shows, published, performances, upcoming, cast, news, contacts, unread, newsletter] =
    await Promise.all([
      prisma.show.count(),
      prisma.show.count({ where: { status: "published" } }),
      prisma.performance.count(),
      prisma.performance.count({ where: { startsAt: { gte: new Date() } } }),
      prisma.castMember.count(),
      prisma.newsPost.count(),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { handled: false } }),
      prisma.newsletterSignup.count(),
    ]);
  return { shows, published, performances, upcoming, cast, news, contacts, unread, newsletter };
}

const cards = [
  { key: "shows" as const, label: "Shows", icon: Theater, href: "/admin/shows", hint: (s: Awaited<ReturnType<typeof getStats>>) => `${s.published} published` },
  { key: "performances" as const, label: "Performances", icon: CalendarClock, href: "/admin/performances", hint: (s: Awaited<ReturnType<typeof getStats>>) => `${s.upcoming} upcoming` },
  { key: "cast" as const, label: "Cast members", icon: Users, href: "/admin/cast" },
  { key: "news" as const, label: "News posts", icon: Newspaper, href: "/admin/news" },
  { key: "contacts" as const, label: "Contact inbox", icon: Inbox, href: "/admin/contact", hint: (s: Awaited<ReturnType<typeof getStats>>) => `${s.unread} unhandled` },
  { key: "newsletter" as const, label: "Newsletter subs", icon: Mail, href: "/admin/newsletter" },
];

export default async function AdminDashboard() {
  const stats = await getStats();
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Quick overview of your site content.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.key} href={c.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.label}
                </CardTitle>
                <c.icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold">
                  {stats[c.key]}
                </div>
                {c.hint && (
                  <p className="text-xs text-muted-foreground">{c.hint(stats)}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
