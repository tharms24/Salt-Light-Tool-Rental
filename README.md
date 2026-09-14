# Salt & Light Tool Rental

A real web app now: a Next.js site backed by a Postgres database, with a
password-protected admin page for managing tools and bookings, and a live
booking calendar customers use to reserve dates right on each tool's page.

The old static HTML/CSS/JS site is archived in [`legacy-static-site/`](legacy-static-site/)
for reference — nothing there is used by the live site anymore.

## What's here

- **Public site** — home, tool catalog, tool detail + booking calendar, about, policies, contact
- **Admin page** (`/admin`) — add/edit/deactivate/delete tools, view & cancel bookings, block off dates for maintenance
- **Database** — Postgres (Neon, via Vercel's Postgres integration), managed with Drizzle ORM
- **Booking system** — customers pick dates on a calendar; availability is checked again on the server at the moment of confirmation, inside a database transaction, so two people can't book the same dates at once
- **Email notifications** — Resend emails `hello@saltandlighttoolrental.com` whenever a booking is confirmed
- **No online payment** — bookings just reserve dates. ID, deposit, and payment are still collected in person at pickup, per the existing Rental Agreement

## One-time setup checklist

You'll need to do a few things in web dashboards that I can't do for you (they involve your accounts). Everything else is already built and just needs these connected.

### 1. Deploy to Vercel

If you haven't finished importing the GitHub repo into Vercel yet, do that first (Vercel → Add New → Project → import `tharms24/Salt-Light-Tool-Rental`). Leave build settings on default — Vercel auto-detects Next.js.

### 2. Add a Postgres database

In your Vercel project: **Storage** tab → **Create Database** → **Postgres** (this provisions a Neon database and is free at this scale). Vercel automatically adds a `DATABASE_URL` environment variable to your project — you don't need to copy/paste anything.

### 3. Add Blob storage (for tool photo uploads)

Same **Storage** tab → **Create Database** → **Blob**. This lets you upload a photo when adding/editing a tool in the admin page. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.

### 4. Set the admin password and session secret

In **Project Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | Pick a password you and Nick will both use to log into `/admin` |
| `SESSION_SECRET` | A long random string — run `openssl rand -hex 32` in Terminal and paste the result |

### 5. Set up email notifications (Resend)

1. Sign up at [resend.com](https://resend.com) (free tier is plenty).
2. Get an API key from the Resend dashboard.
3. In Vercel env vars, add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `NOTIFICATION_EMAIL` | `hello@saltandlighttoolrental.com` (or wherever you want booking alerts sent) |
| `NOTIFICATION_FROM_EMAIL` | `onboarding@resend.dev` to start (works immediately, but can only send to *your own* Resend account email until you verify a domain). Once you verify saltandlighttoolrental.com in Resend, change this to something like `bookings@saltandlighttoolrental.com` |

### 6. Run the database migration and import your tools

This creates the `tools`, `bookings`, and `tool_blocks` tables and loads your existing 20-tool catalog. From your computer, in this project folder:

```bash
npm install
```

Then copy the `DATABASE_URL` value from Vercel (Project Settings → Environment Variables → click to reveal) into a new `.env.local` file (copy `.env.example` to `.env.local` first and fill it in). Then:

```bash
npm run db:migrate
npm run db:seed
```

`db:seed` is safe to re-run — it updates existing tools by their slug instead of duplicating them.

### 7. Redeploy

Once the env vars are set, trigger a redeploy in Vercel (or just push any small change) so the app picks them up.

That's it — the site is live and fully functional at that point.

## Using it day-to-day (no coding required)

**Go to `yoursite.com/admin` and log in with the admin password.**

- **Add a tool:** Admin → Tools → "+ Add Tool". Fill in name, category, price per day/week, a description, and optionally upload a photo. Save.
- **Edit a tool:** Admin → Tools → click its name. Change anything, save. The live site updates immediately.
- **Take a tool off the site temporarily:** Admin → Tools → "Deactivate" next to it. It disappears from the public catalog but isn't deleted — click "Activate" to bring it back.
- **Delete a tool for good:** "Delete" next to it. This only works if the tool has never been booked (to protect your booking history) — deactivate it instead if it has bookings.
- **Block dates for maintenance/repairs:** Admin → Tools → click the tool → scroll to "Blocked Dates" → pick a date range and an optional reason. Customers won't be able to select those dates.
- **See bookings:** Admin → Bookings shows everyone who's booked, their contact info, dates, and whether they chose pickup or delivery. "Cancel" frees up those dates again.
- **Get notified of new bookings:** an email goes to whatever address you set as `NOTIFICATION_EMAIL` the moment someone confirms a booking.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL at minimum
npm run dev
```

Open `http://localhost:3000`. Admin is at `http://localhost:3000/admin`.

## Project structure

```
app/(site)/       Public pages (home, tools, about, policies, contact)
app/admin/         Admin login + password-protected dashboard
app/api/           Availability endpoint used by the booking calendar
components/        Shared UI (header, footer, tool cards, calendar, booking widget)
lib/                Server actions (booking, tool CRUD, blocks), auth, email, icons
db/                 Drizzle schema, migrations, and the one-time seed script
public/assets/     Images, logo, and the rental agreement PDF
legacy-static-site/  The old static site, kept for reference only
```

## Notes on how bookings stay accurate

Every booking confirmation runs inside a database transaction that locks the
tool's row, re-checks the requested dates against both confirmed bookings and
admin-blocked dates, and only then inserts the booking. If two people try to
book overlapping dates for the same tool at the same moment, the second one
gets a clear "those dates were just booked" message instead of a silent
double-booking — this check happens on the server regardless of what the
calendar showed in the browser.

## Known gaps / things you might want next

- **Pickup location text** is a generic placeholder on the booking form — worth editing to your real pickup address/instructions (`components/BookingWidget.tsx`).
- **Instagram/Facebook handle** on the Contact page is still a placeholder.
- **No online payment** — by design, per your current process. Let me know if that should change later.
- **SMS/Slack notifications** weren't set up (you picked email-only) — easy to add later if you want a text alert too.
