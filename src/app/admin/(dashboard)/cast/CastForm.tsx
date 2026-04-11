import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertCast } from "./actions";

type CastMember = {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  photoUrl: string | null;
  order: number;
};

export function CastForm({ member }: { member?: CastMember }) {
  return (
    <form action={upsertCast} className="space-y-6">
      {member?.id && <input type="hidden" name="id" value={member.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required defaultValue={member?.name} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="slug">Slug (auto if blank)</Label>
          <Input id="slug" name="slug" defaultValue={member?.slug} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" defaultValue={member?.role ?? ""} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="order">Order</Label>
          <Input id="order" name="order" type="number" defaultValue={member?.order ?? 0} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="photoUrl">Photo URL</Label>
          <Input id="photoUrl" name="photoUrl" type="url" defaultValue={member?.photoUrl ?? ""} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" rows={5} defaultValue={member?.bio ?? ""} className="mt-1" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/cast">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
