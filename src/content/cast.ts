export type CastMember = {
  id: string;
  slug: string;
  name: string;
  role: string | null;
  bio: string | null;
  photoUrl: string | null;
  order: number;
};

export const cast: CastMember[] = [
  {
    id: "ava-nkosi",
    slug: "ava-nkosi",
    name: "Ava Nkosi",
    role: "Artistic Director",
    bio: "Ava founded the company with the belief that every young person deserves live theatre. She has directed over twenty productions and leads the creative vision of the ensemble.",
    photoUrl: null,
    order: 0,
  },
  {
    id: "jabu-dlamini",
    slug: "jabu-dlamini",
    name: "Jabu Dlamini",
    role: "Lead Actor",
    bio: "Jabu trained at Wits School of Arts and has performed across three continents in productions for young audiences. Equally at home in storytelling and physical theatre.",
    photoUrl: null,
    order: 1,
  },
  {
    id: "maria-venter",
    slug: "maria-venter",
    name: "Maria Venter",
    role: "Puppetry & Design",
    bio: "Maria designs hand-built puppets and set pieces that travel light enough for a school hall and bold enough for a main stage.",
    photoUrl: null,
    order: 2,
  },
  {
    id: "thando-radebe",
    slug: "thando-radebe",
    name: "Thando Radebe",
    role: "Facilitator",
    bio: "Thando leads post-show conversations and classroom workshops that unpack each performance with students, turning a forty-minute play into a full afternoon of learning.",
    photoUrl: null,
    order: 3,
  },
];
