# Teacher — Theatre / Youth-Arts Website (Phase 1: Static)

A drop-in, rebrandable website template for a theatre, youth-arts company, or touring production. Phase 1 is fully static — no database, no auth, no backend — and deploys to Vercel in under two minutes.

## Stack

- **Next.js 16** — App Router, React 19, server actions, TypeScript strict
- **shadcn/ui + Tailwind v4** — oklch design tokens, swap the palette in `globals.css`
- **Roboto + Playfair Display** via `next/font`
- **Zod** for form validation
- **Sonner** for toasts

No database. No auth. No Prisma. Pure static content.

## Deploy to Vercel

### 1. Import the repo

1. Go to https://vercel.com/new
2. Import this GitHub repo (`ansujn/teacher`)
3. **Framework preset:** Next.js (auto-detected — leave as-is)
4. **No environment variables needed** for phase 1
5. Click **Deploy**

That's it. First build takes ~1–2 minutes. You'll get a URL like `https://teacher-xxx.vercel.app`.

### 2. Contact & newsletter form submissions

Both forms on the public site log submissions to **Vercel Runtime Logs**:
- Vercel dashboard → your project → **Logs** tab
- Filter by `[contact-form]` or `[newsletter-signup]` to see every submission with email, name, subject, and message

When you're ready to actually receive them via email or store them in a database, see **Phase 2** below.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

No `.env` required.

## What's in the box

| Route | Content source |
|---|---|
| `/` | Hero + featured shows + latest news + CTA |
| `/shows` | All published productions (`src/content/shows.ts`) |
| `/shows/[slug]` | Show detail with synopsis, cast, performance schedule |
| `/news`, `/news/[slug]` | News listing + post (`src/content/news.ts`) |
| `/cast` | Cast & creatives grid (`src/content/cast.ts`) |
| `/about` | About page (`src/content/pages.ts`) |
| `/contact` | Contact form → logs to Vercel Runtime Logs |

## Editing content

All content lives in `src/content/`:

```
src/content/
  shows.ts          # productions (title, synopsis, poster, etc.)
  performances.ts   # tour dates linked to shows
  cast.ts           # actors, directors, facilitators
  show-cast.ts      # which cast members are in which shows
  news.ts           # news / blog posts
  pages.ts          # about page (and any other static pages)
```

Edit any of these files, commit, and push — Vercel auto-deploys on every push to `main`.

```bash
# Example: add a new show
vim src/content/shows.ts       # add a new entry
git add src/content/shows.ts
git commit -m "Add new show: <title>"
git push
```

## Re-branding

Open **`src/config/site.ts`** and edit:

```ts
name: "Stagecraft",         // your theatre name
tagline: "...",             // your tagline
description: "...",         // footer/meta description
email: "hello@yours.com",
phone: "+27 ...",
address: "Your venue",
social: { instagram, facebook, youtube },
```

For colours, edit the three anchor tokens in `src/app/globals.css` under `:root`:
- `--primary` (currently burnt orange)
- `--secondary` (currently forest green)
- `--accent` (currently soft peach)

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run check        # lint + typecheck + build
```

## Phase 2 — bringing back the backend

The full Prisma + NextAuth + admin-dashboard version lives on the **`phase-2-backend`** branch. When you want it back:

```bash
git checkout phase-2-backend         # look around
git merge phase-2-backend            # or merge it into main
```

Phase 2 adds:
- Admin dashboard at `/admin` with CRUD for shows, performances, cast, news
- NextAuth v5 credentials provider
- Prisma + Postgres (works with Supabase, Neon, Vercel Postgres, Railway)
- Contact inbox + newsletter subscriber list

See the `README.md` on that branch for its deploy instructions.

## License

MIT
