export type Performance = {
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

// Upcoming tour dates — edit these directly when your schedule changes.
// They're parsed at module load, so dates are fixed until the next deploy.
export const performances: Performance[] = [
  {
    id: "perf-1",
    showId: "flying-suitcase",
    venue: "Baxter Theatre",
    city: "Cape Town",
    startsAt: new Date("2026-05-02T18:30:00Z"),
    endsAt: null,
    ticketUrl: "https://example.com/tickets",
    priceInfo: "R80 adults, R40 students",
    notes: null,
  },
  {
    id: "perf-2",
    showId: "flying-suitcase",
    venue: "Market Theatre",
    city: "Johannesburg",
    startsAt: new Date("2026-05-16T19:00:00Z"),
    endsAt: null,
    ticketUrl: "https://example.com/tickets",
    priceInfo: "R80 adults, R40 students",
    notes: null,
  },
  {
    id: "perf-3",
    showId: "year-of-the-bicycle",
    venue: "Joburg Theatre",
    city: "Johannesburg",
    startsAt: new Date("2026-05-09T18:30:00Z"),
    endsAt: null,
    ticketUrl: "https://example.com/tickets",
    priceInfo: "R80 adults, R40 students",
    notes: null,
  },
  {
    id: "perf-4",
    showId: "moonbird",
    venue: "Artscape Arena",
    city: "Cape Town",
    startsAt: new Date("2026-05-05T17:00:00Z"),
    endsAt: null,
    ticketUrl: "https://example.com/tickets",
    priceInfo: "R70 adults, R35 students",
    notes: null,
  },
  {
    id: "perf-5",
    showId: "moonbird",
    venue: "Durban Playhouse",
    city: "Durban",
    startsAt: new Date("2026-05-23T17:00:00Z"),
    endsAt: null,
    ticketUrl: "https://example.com/tickets",
    priceInfo: "R70 adults, R35 students",
    notes: null,
  },
  {
    id: "perf-6",
    showId: "hackathon",
    venue: "Wits Theatre",
    city: "Johannesburg",
    startsAt: new Date("2026-06-07T19:30:00Z"),
    endsAt: null,
    ticketUrl: "https://example.com/tickets",
    priceInfo: "R100 adults, R50 students",
    notes: null,
  },
];
