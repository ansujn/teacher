import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { deleteShow } from "./actions";

export const metadata = { title: "Shows — Admin" };

export default async function AdminShowsPage() {
  const shows = await prisma.show.findMany({
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    include: { _count: { select: { performances: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Shows</h1>
          <p className="text-muted-foreground">Manage productions in your catalogue.</p>
        </div>
        <Button asChild>
          <Link href="/admin/shows/new">
            <Plus className="mr-2 size-4" /> New show
          </Link>
        </Button>
      </div>

      <div className="mt-8 rounded-xl border border-border/60 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Performances</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  No shows yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
            {shows.map((show) => (
              <TableRow key={show.id}>
                <TableCell>
                  <div className="font-medium">{show.title}</div>
                  <div className="text-xs text-muted-foreground">/{show.slug}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      show.status === "published"
                        ? "default"
                        : show.status === "archived"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {show.status}
                  </Badge>
                  {show.featured && (
                    <Badge variant="outline" className="ml-2">
                      featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{show.genre ?? "—"}</TableCell>
                <TableCell>{show._count.performances}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/shows/${show.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteShow}>
                      <input type="hidden" name="id" value={show.id} />
                      <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
