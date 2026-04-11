import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertPerformance } from "./actions";

type Performance = {
  id: string;
  showId: string;
  venue: string;
  city: string | null;
  startsAt: Date;
  endsAt: Date | null;
  ticketUrl: string | null;
  priceInfo: string | null;
  notes: string | null;
};

type ShowOption = { id: string; title: string };

function toInputValue(d: Date | null | undefined) {
  if (!d) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function PerformanceForm({
  performance,
  shows,
}: {
  performance?: Performance;
  shows: ShowOption[];
}) {
  return (
    <form action={upsertPerformance} className="space-y-6">
      {performance?.id && <input type="hidden" name="id" value={performance.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="showId">Show *</Label>
          <select
            id="showId"
            name="showId"
            required
            defaultValue={performance?.showId}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Select a show…</option>
            {shows.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="venue">Venue *</Label>
          <Input id="venue" name="venue" required defaultValue={performance?.venue} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={performance?.city ?? ""} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="startsAt">Starts at *</Label>
          <Input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            required
            defaultValue={toInputValue(performance?.startsAt)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="endsAt">Ends at</Label>
          <Input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={toInputValue(performance?.endsAt)}
            className="mt-1"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="ticketUrl">Ticket URL</Label>
          <Input
            id="ticketUrl"
            name="ticketUrl"
            type="url"
            defaultValue={performance?.ticketUrl ?? ""}
            className="mt-1"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="priceInfo">Price info</Label>
          <Input id="priceInfo" name="priceInfo" defaultValue={performance?.priceInfo ?? ""} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={4} defaultValue={performance?.notes ?? ""} className="mt-1" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Save performance</Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/performances">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
