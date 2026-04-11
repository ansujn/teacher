import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PerformanceForm } from "../PerformanceForm";

export const metadata = { title: "Edit performance — Admin" };

export default async function EditPerformancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [performance, shows] = await Promise.all([
    prisma.performance.findUnique({ where: { id } }),
    prisma.show.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } }),
  ]);
  if (!performance) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">Edit performance</h1>
      <div className="mt-8">
        <PerformanceForm performance={performance} shows={shows} />
      </div>
    </div>
  );
}
