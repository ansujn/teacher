// Links cast members to shows and the character they play.
// Reference shows by `id` from src/content/shows.ts, cast by `id` from cast.ts.
export type ShowCastLink = {
  showId: string;
  castMemberId: string;
  character: string | null;
  order: number;
};

export const showCast: ShowCastLink[] = [
  { showId: "flying-suitcase", castMemberId: "jabu-dlamini", character: "The Storyteller", order: 0 },
  { showId: "flying-suitcase", castMemberId: "maria-venter", character: "Puppeteer", order: 1 },
  { showId: "year-of-the-bicycle", castMemberId: "jabu-dlamini", character: "Brother", order: 0 },
  { showId: "year-of-the-bicycle", castMemberId: "ava-nkosi", character: "Director", order: 1 },
  { showId: "moonbird", castMemberId: "maria-venter", character: "Moonbird", order: 0 },
  { showId: "hackathon", castMemberId: "thando-radebe", character: "Jordan", order: 0 },
];
