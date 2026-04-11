import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/format";
import { deletePerformance } from "./actions";

export const metadata = { title: "Performances — Admin" };

export default async function AdminPerformancesPage() {
  const performances = await prisma.performance.findMany({
    orderBy: { startsAt: "asc" },
    include: { show: { select: { title: true, slug: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Performances</h1>
          <p className="text-muted-foreground">Schedule tour dates for your shows.</p>
        </div>
        <Button asChild>
          <Link href="/admin/performances/new">
            <Plus className="mr-2 size-4" /> New performance
          </Link>
        </Button>
      </div>

      <div className="mt-8 rounded-xl border border-border/60 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Show</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performances.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No performances yet.
                </TableCell>
              </TableRow>
            )}
            {performances.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.show.title}</TableCell>
                <TableCell>{formatDateTime(p.startsAt)}</TableCell>
                <TableCell>
                  {p.venue}
                  {p.city ? `, ${p.city}` : ""}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/performances/${p.id}`}>Edit</Link>
                    </Button>
                    <form action={deletePerformance}>
                      <input type="hidden" name="id" value={p.id} />
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
