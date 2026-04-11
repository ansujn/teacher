import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShowForm } from "../ShowForm";

export const metadata = { title: "Edit show — Admin" };

export default async function EditShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await prisma.show.findUnique({ where: { id } });
  if (!show) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">Edit show</h1>
      <p className="mt-1 text-muted-foreground">Update {show.title}.</p>
      <div className="mt-8">
        <ShowForm show={show} />
      </div>
    </div>
  );
}
