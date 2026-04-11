import { prisma } from "@/lib/prisma";
import { PerformanceForm } from "../PerformanceForm";

export const metadata = { title: "New performance — Admin" };

export default async function NewPerformancePage() {
  const shows = await prisma.show.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });
  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">New performance</h1>
      <div className="mt-8">
        <PerformanceForm shows={shows} />
      </div>
    </div>
  );
}
