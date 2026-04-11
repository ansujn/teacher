import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CastForm } from "../CastForm";

export const metadata = { title: "Edit cast member" };

export default async function EditCastPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.castMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">Edit cast member</h1>
      <div className="mt-8">
        <CastForm member={member} />
      </div>
    </div>
  );
}
