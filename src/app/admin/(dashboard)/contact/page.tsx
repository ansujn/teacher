import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/format";
import { deleteContact, toggleHandled } from "./actions";

export const metadata = { title: "Contact inbox — Admin" };

export default async function AdminContactPage() {
  const items = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Contact inbox</h1>
      <p className="text-muted-foreground">Messages sent from the public contact form.</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No messages yet.
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((msg) => (
            <li key={msg.id} className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{msg.name}</span>
                    <Badge variant={msg.handled ? "outline" : "default"}>
                      {msg.handled ? "handled" : "new"}
                    </Badge>
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {msg.email}
                  </a>
                  {msg.subject && (
                    <div className="mt-1 text-sm font-medium">{msg.subject}</div>
                  )}
                  <div className="mt-1 text-xs text-muted-foreground">
                    {formatDateTime(msg.createdAt)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <form action={toggleHandled}>
                    <input type="hidden" name="id" value={msg.id} />
                    <input type="hidden" name="current" value={String(msg.handled)} />
                    <Button type="submit" variant="outline" size="sm">
                      {msg.handled ? "Mark new" : "Mark handled"}
                    </Button>
                  </form>
                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={msg.id} />
                    <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                      Delete
                    </Button>
                  </form>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm text-foreground/90">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
