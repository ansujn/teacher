export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverUrl: string | null;
  published: boolean;
  publishedAt: Date | null;
};

export const news: NewsPost[] = [
  {
    id: "spring-tour",
    slug: "spring-tour-announced",
    title: "Spring tour dates announced",
    excerpt:
      "Six cities, three productions, eight weeks on the road. Here is everywhere we are headed this season.",
    body: "We're thrilled to share the full schedule for our spring tour. Over the next eight weeks we'll be in schools, community centres, and main-stage venues across the country.\n\nBook your slot early — shows fill up fast and we can only extend our tour if enough schools sign up in advance. Every production ships with a study guide, a post-show workshop, and the option to schedule a follow-up classroom visit.",
    coverUrl: null,
    published: true,
    publishedAt: new Date("2026-03-28T09:00:00Z"),
  },
  {
    id: "welcome-thando",
    slug: "welcome-thando",
    title: "Welcome Thando, our new lead facilitator",
    excerpt:
      "Meet the newest addition to our facilitation team — and find out what to expect in a post-show workshop.",
    body: "This month we're welcoming Thando Radebe as our lead facilitator. Thando will be running workshops alongside every show, giving students the chance to unpack the performance with someone who knows the work inside-out.\n\nEvery workshop is tailored to the age group, curriculum context, and the specific production. Teachers can also request bespoke follow-up sessions for classes that want to explore a theme more deeply.",
    coverUrl: null,
    published: true,
    publishedAt: new Date("2026-03-14T11:00:00Z"),
  },
  {
    id: "accessibility-note",
    slug: "a-note-on-accessibility",
    title: "A note on accessibility",
    excerpt:
      "Why every one of our shows ships with captioning, audio descriptions, and sensory-friendly versions.",
    body: "Accessibility is not a feature we add at the end — it's part of how every show is made. Every production in our catalogue has a captioned version, an audio-described version, and at least one sensory-friendly performance per tour.\n\nIf your audience has a specific need we haven't thought of, tell us. We'd rather adapt than turn anyone away.",
    coverUrl: null,
    published: true,
    publishedAt: new Date("2026-02-11T16:00:00Z"),
  },
];
