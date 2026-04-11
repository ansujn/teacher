import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertNews } from "./actions";

type NewsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  coverUrl: string | null;
  published: boolean;
};

export function NewsForm({ post }: { post?: NewsPost }) {
  return (
    <form action={upsertNews} className="space-y-6">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input id="title" name="title" required defaultValue={post?.title} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="slug">Slug (auto if blank)</Label>
        <Input id="slug" name="slug" defaultValue={post?.slug} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="coverUrl">Cover image URL</Label>
        <Input id="coverUrl" name="coverUrl" type="url" defaultValue={post?.coverUrl ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="body">Body *</Label>
        <Textarea id="body" name="body" rows={12} required defaultValue={post?.body} className="mt-1" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="size-4 rounded border-input"
        />
        Publish immediately
      </label>
      <div className="flex gap-3">
        <Button type="submit">Save post</Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/news">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
