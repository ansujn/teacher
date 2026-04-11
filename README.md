# Teacher — Generic Theatre / Youth-Arts Website

A drop-in, rebrandable website template for any theatre, youth-arts company, or touring production. Manages shows, performances, cast, news, and contact inquiries from a built-in admin dashboard. Deploys to Vercel in a few minutes.

## Stack

- **Next.js 16** — App Router, React 19, server actions, edge-safe middleware
- **Prisma 7 + Postgres** via the `@prisma/adapter-pg` driver adapter (works with any hosted Postgres: Neon, Vercel Postgres, Supabase, Railway)
- **NextAuth v5** — JWT credentials provider, password-hashed admin accounts
- **shadcn/ui + Tailwind v4** — oklch design tokens, swap the palette in `globals.css`
- **Roboto + Playfair Display** via `next/font`
- **Zod** for server-action validation, **bcryptjs** for password hashing

## Deploy to Vercel

### 1. Push this repo to your GitHub account

It's already wired up — just push.

### 2. Create a Postgres database

Pick one:

- **Vercel Postgres** — easiest, integrates with Vercel from the dashboard
- **Neon** (https://neon.tech) — free tier, copy the *pooled* connection string
- **Supabase** (https://supabase.com) — also free, copy the connection string from Project Settings → Database
- **Railway** — `railway add postgres`

Whichever you choose, you need a connection string that looks like:

```
postgresql://user:password@host:5432/dbname?sslmode=require
```

### 3. Import the project on Vercel

1. Go to https://vercel.com/new
2. Import this GitHub repo
3. **Framework preset:** Next.js (auto-detected)
4. **Build command:** leave default — `vercel-build` from `package.json` runs `prisma generate && prisma db push && next build`
5. **Environment variables:**

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | your Postgres connection string |
   | `AUTH_SECRET` | run `openssl rand -base64 32` and paste the output |
   | `ADMIN_EMAIL` | first admin login email |
   | `ADMIN_PASSWORD` | initial admin password (change after seeding) |
   | `SEED_SECRET` | random string used to authorise the one-shot `/api/seed` endpoint |

6. Click **Deploy**.

### 4. Seed the database

After the first deploy, populate the DB by calling the protected seed endpoint **once**:

```bash
curl -X POST https://your-app.vercel.app/api/seed \
     -H "Authorization: Bearer YOUR_SEED_SECRET"
```

You should get `{"ok":true,"adminEmail":"..."}`. Now visit `/admin/login` and sign in.

The seed endpoint is idempotent — re-running it is safe — but you can also delete or rotate `SEED_SECRET` after the first run if you want to disable it entirely.

## Local development

You still need a Postgres database. Easiest is a free Neon account; cheapest is Docker:

```bash
docker run --name teacher-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
```

Then:

```bash
cp .env.example .env
# Edit .env — set DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

npm install              # runs prisma generate via postinstall
npm run db:push          # creates tables in your DB
npm run db:seed          # seeds shows, cast, news, admin user
npm run dev              # http://localhost:3000
```

Admin lives at **http://localhost:3000/admin/login**.

## What's in the box

### Public routes

| Route | Purpose |
|---|---|
| `/` | Hero, featured shows, latest news, CTA |
| `/shows` | All published productions |
| `/shows/[slug]` | Show detail with synopsis, cast, performance schedule |
| `/news`, `/news/[slug]` | News listing + post |
| `/cast` | Cast & creatives |
| `/about` | DB-backed About page |
| `/contact` | Contact form → `ContactSubmission` table |

### Admin routes (protected)

| Route | Purpose |
|---|---|
| `/admin` | Dashboard with live stats |
| `/admin/shows` | Full CRUD for productions |
| `/admin/performances` | Schedule tour dates |
| `/admin/cast` | Manage cast & creatives |
| `/admin/news` | Drafts + publishing |
| `/admin/contact` | Inbox for contact form submissions |
| `/admin/newsletter` | Subscriber list |

### Data model

`User`, `Show`, `Performance`, `CastMember`, `ShowCast`, `NewsPost`, `Page`, `ContactSubmission`, `NewsletterSignup`, `MediaAsset`, `SiteSetting`. See `prisma/schema.prisma`.

## Re-branding

Edit **`src/config/site.ts`** — name, tagline, description, navigation, social URLs, contact info. The whole site picks them up.

For colours, edit **`src/app/globals.css`** under `:root`. The three anchor tokens are `--primary`, `--secondary`, and `--accent`. The rest of the site recolours automatically.

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run check        # lint + typecheck + build
npm run db:push      # sync schema to your DB (no migrations)
npm run db:seed      # seed demo data
npm run db:studio    # Prisma Studio
npm run db:reset     # wipe + re-create + re-seed (destructive)
```

## Architectural notes

1. **Edge-safe auth split** — `src/lib/auth.config.ts` has no DB imports and is consumed by `middleware.ts` (which runs on the edge). The full Prisma-backed config in `src/lib/auth.ts` is used by API routes and server components only.
2. **Admin route group** — protected routes live under `src/app/admin/(dashboard)/` so the auth-redirecting layout doesn't wrap `/admin/login`.
3. **`asChild` on Button** — base-ui's Button uses a `render` prop instead of Radix-style `asChild`. The wrapper in `src/components/ui/button.tsx` translates one to the other so Next.js `<Link>` works with button styling.
4. **No migration files** — `vercel-build` runs `prisma db push` which is simpler than `migrate deploy` for a starter template. Switch to migrations later when you need them.

## License

MIT
