import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Theater,
  CalendarClock,
  Users,
  Newspaper,
  Inbox,
  Mail,
  LogOut,
} from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shows", label: "Shows", icon: Theater },
  { href: "/admin/performances", label: "Performances", icon: CalendarClock },
  { href: "/admin/cast", label: "Cast", icon: Users },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/contact", label: "Inbox", icon: Inbox },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-1 bg-muted/30">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border/60 bg-card p-4 md:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <span className="font-heading text-lg leading-none">S</span>
          </div>
          <div>
            <div className="font-heading text-base font-semibold">
              {siteConfig.shortName}
            </div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </Link>
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border/60 pt-4">
          <div className="px-3 pb-2 text-xs text-muted-foreground truncate">
            {session.user.email}
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button variant="ghost" className="w-full justify-start gap-2" type="submit">
              <LogOut className="size-4" /> Sign out
            </Button>
          </form>
          <Link
            href="/"
            className="mt-2 block rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-accent"
          >
            ← View site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
