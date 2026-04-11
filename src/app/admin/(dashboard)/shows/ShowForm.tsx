import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertShow } from "./actions";

type Show = {
  id: string;
  title: string;
  slug: string;
  tagline: string | null;
  synopsis: string;
  genre: string | null;
  ageRange: string | null;
  durationMin: number | null;
  language: string | null;
  posterUrl: string | null;
  trailerUrl: string | null;
  heroImageUrl: string | null;
  status: string;
  featured: boolean;
};

export function ShowForm({ show }: { show?: Show }) {
  return (
    <form action={upsertShow} className="space-y-6">
      {show?.id && <input type="hidden" name="id" value={show.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required defaultValue={show?.title} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="slug">Slug (leave blank to auto-generate)</Label>
          <Input id="slug" name="slug" defaultValue={show?.slug} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" name="tagline" defaultValue={show?.tagline ?? ""} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="synopsis">Synopsis *</Label>
          <Textarea
            id="synopsis"
            name="synopsis"
            required
            rows={6}
            defaultValue={show?.synopsis}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <Input id="genre" name="genre" defaultValue={show?.genre ?? ""} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="ageRange">Age range</Label>
          <Input
            id="ageRange"
            name="ageRange"
            defaultValue={show?.ageRange ?? ""}
            placeholder="8+, All ages, etc."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="durationMin">Duration (minutes)</Label>
          <Input
            id="durationMin"
            name="durationMin"
            type="number"
            defaultValue={show?.durationMin ?? ""}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Input id="language" name="language" defaultValue={show?.language ?? ""} className="mt-1" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="posterUrl">Poster image URL</Label>
          <Input
            id="posterUrl"
            name="posterUrl"
            type="url"
            defaultValue={show?.posterUrl ?? ""}
            placeholder="https://..."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="trailerUrl">Trailer URL</Label>
          <Input
            id="trailerUrl"
            name="trailerUrl"
            type="url"
            defaultValue={show?.trailerUrl ?? ""}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="heroImageUrl">Hero image URL</Label>
          <Input
            id="heroImageUrl"
            name="heroImageUrl"
            type="url"
            defaultValue={show?.heroImageUrl ?? ""}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={show?.status ?? "draft"}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={show?.featured ?? false}
              className="size-4 rounded border-input"
            />
            Feature on homepage
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Save show</Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/shows">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
