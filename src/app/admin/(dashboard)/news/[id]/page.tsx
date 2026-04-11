import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NewsForm } from "../NewsForm";

export const metadata = { title: "Edit post — Admin" };

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold">Edit post</h1>
      <div className="mt-8">
        <NewsForm post={post} />
      </div>
    </div>
  );
}
