export type ContentPage = {
  slug: string;
  title: string;
  body: string;
};

export const pages: ContentPage[] = [
  {
    slug: "about",
    title: "About us",
    body: "We make theatre for young audiences — stories that are honest, joyful, and made to travel. Since our founding, we've taken productions into schools, festivals, and main-stage venues, working with teachers and students to make every show a doorway into conversation.\n\nThis site is a generic, open-source template. Edit the content files in src/content/ to change shows, news, and cast — push to main and Vercel redeploys automatically.",
  },
];
