export type ShowStatus = "draft" | "published" | "archived";

export type Show = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  synopsis: string;
  ageRange: string | null;
  durationMin: number | null;
  genre: string | null;
  language: string | null;
  posterUrl: string | null;
  trailerUrl: string | null;
  heroImageUrl: string | null;
  status: ShowStatus;
  featured: boolean;
};

export const shows: Show[] = [
  {
    id: "flying-suitcase",
    slug: "the-flying-suitcase",
    title: "The Flying Suitcase",
    tagline: "A bag of tricks, a world of stories.",
    synopsis:
      "A travelling storyteller arrives at a rural school with nothing but a battered leather suitcase — and unfolds tales from five continents. Songs, puppets, and shadow play combine in this joyful celebration of the imagination.",
    ageRange: "5+",
    durationMin: 50,
    genre: "Storytelling",
    language: "English",
    posterUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=70",
    trailerUrl: null,
    heroImageUrl: null,
    status: "published",
    featured: true,
  },
  {
    id: "year-of-the-bicycle",
    slug: "the-year-of-the-bicycle",
    title: "The Year of the Bicycle",
    tagline: "Two wheels, one community, a thousand small revolutions.",
    synopsis:
      "When twelve-year-old Lerato saves up for a second-hand bicycle, she sets off a chain of events that transforms her neighbourhood. A poignant physical-theatre piece about persistence, friendship, and everyday courage.",
    ageRange: "9+",
    durationMin: 55,
    genre: "Physical Theatre",
    language: "English / isiZulu",
    posterUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70",
    trailerUrl: null,
    heroImageUrl: null,
    status: "published",
    featured: true,
  },
  {
    id: "moonbird",
    slug: "moonbird",
    title: "Moonbird",
    tagline: "A lullaby for anyone who has ever felt small.",
    synopsis:
      "An original family musical about a shy barn owl who dreams of singing for the moon. With an ensemble of actor-musicians and a live score, Moonbird is suitable for the youngest audiences.",
    ageRange: "3+",
    durationMin: 40,
    genre: "Musical",
    language: "English",
    posterUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=70",
    trailerUrl: null,
    heroImageUrl: null,
    status: "published",
    featured: true,
  },
  {
    id: "hackathon",
    slug: "hackathon",
    title: "Hackathon",
    tagline: "Four teens, one weekend, no adults.",
    synopsis:
      "A smart, funny ensemble play set at a 48-hour coding competition. Hackathon tackles friendship, rivalry, and the thrill of making something from nothing. Perfect for high-school audiences.",
    ageRange: "13+",
    durationMin: 65,
    genre: "Drama",
    language: "English",
    posterUrl:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=70",
    trailerUrl: null,
    heroImageUrl: null,
    status: "published",
    featured: true,
  },
  {
    id: "river-that-remembered",
    slug: "the-river-that-remembered",
    title: "The River That Remembered",
    tagline: "Myth, memory, and the water that ties them together.",
    synopsis:
      "A lyrical, movement-based piece drawing on folk tales from across southern Africa. Suitable for upper-primary and high-school audiences, with a companion study guide for teachers.",
    ageRange: "10+",
    durationMin: 60,
    genre: "Movement",
    language: "English",
    posterUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=70",
    trailerUrl: null,
    heroImageUrl: null,
    status: "published",
    featured: false,
  },
  {
    id: "paper-boats",
    slug: "paper-boats",
    title: "Paper Boats",
    tagline: "A quiet play about very loud feelings.",
    synopsis:
      "Two siblings learn to navigate grief after their grandmother's passing. Gentle, honest, and interactive — with time built in for reflection and discussion afterwards.",
    ageRange: "8+",
    durationMin: 45,
    genre: "Drama",
    language: "English",
    posterUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=900&q=70",
    trailerUrl: null,
    heroImageUrl: null,
    status: "published",
    featured: false,
  },
];
