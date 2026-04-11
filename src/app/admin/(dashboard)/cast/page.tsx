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
import { deleteCast } from "./actions";

export const metadata = { title: "Cast — Admin" };

export default async function AdminCastPage() {
  const cast = await prisma.castMember.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Cast</h1>
          <p className="text-muted-foreground">Actors, directors, and facilitators.</p>
        </div>
        <Button asChild>
          <Link href="/admin/cast/new">
            <Plus className="mr-2 size-4" /> New member
          </Link>
        </Button>
      </div>

      <div className="mt-8 rounded-xl border border-border/60 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cast.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No cast members yet.
                </TableCell>
              </TableRow>
            )}
            {cast.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell className="text-muted-foreground">{m.role ?? "—"}</TableCell>
                <TableCell>{m.order}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/cast/${m.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteCast}>
                      <input type="hidden" name="id" value={m.id} />
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
