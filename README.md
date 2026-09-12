# Salt & Light Tool Rental — Website

A static marketing site for Salt & Light Tool Rental (Orange County, CA), styled after the
business's own logo: navy, gold, and cream, with a coastal cross-and-wave motif.

No build step, no framework — plain HTML, CSS, and vanilla JS. Deploys as-is to GitHub Pages
or any static host.

## Pages

- `index.html` — Home
- `tools.html` — Tool catalog (data-driven, filterable by category)
- `about.html` — Story, mission, values
- `policies.html` — Rental policy summary + link to the full agreement PDF
- `contact.html` — Contact info and how to reserve

## Editing the tool catalog

Everything in the catalog on `tools.html` (and the category tiles on the home page) comes from
[`data/tools.json`](data/tools.json). To add, remove, or reprice a tool, edit that file — no
HTML changes needed. Each entry looks like:

```json
{
  "id": "orbital-sander",
  "name": "Random Orbital Sander",
  "category": "sanding",
  "icon": "sander",
  "blurb": "Smooth, swirl-free finish sanding on wood, drywall patches & furniture.",
  "includes": "Sanding pads included",
  "dayRate": 20,
  "weekendRate": 50
}
```

Add `"image": "assets/img/your-photo.jpg"` to show a real photo instead of the line icon (used
today for the Paslode nailer, pulled from your own "For Rent" flyer). Category ids/labels live
in the `categories` array at the top of the same file — add a new category there before using
its id on a tool.

**Real vs. placeholder inventory:** 9 tools now come from your own photos (Hilti gas cut-off saw,
Bosch Brute breaker hammer + chisel set, DeWalt miter saw, DeWalt & Honda generators, angle
grinder, RIDGID planer, Graco paint sprayer) — real names and specs, with day/weekend pricing
estimated off the one confirmed rate you gave us (the Paslode nailer). The rest (basic drill kit,
framing nailer, circular saw, table saw, orbital sander, pressure washer, extension ladder) are
still generic placeholders. Check/adjust pricing on the real entries and swap the placeholders
for your actual gear whenever you're ready.

## Updating contact info

Phone and email are live: Tyler (949) 355-3733, Nick (949) 500-3584, and the business inbox
hello@saltandlighttoolrental.com, in the top bar, footer, and `contact.html` on every page. The
Instagram/Facebook handle on `contact.html` is still a placeholder (`[@yourhandle]`) — search for that
bracketed string and swap in your real social link whenever you set one up.

## Logo & images

`assets/img/` holds pre-sized exports of your logo (`logo-nav.png`, `logo-footer.png`,
`logo-large.png`) plus favicons, cropped from the source files in this folder. If you get a
cleaner/transparent version of the logo later, re-export at the same filenames to update it
everywhere at once.

## Previewing locally

Any static file server works. This project already includes a `.claude/launch.json` so Claude
Code's browser preview can serve it directly. From the terminal, one option (macOS ships Ruby):

```bash
ruby -run -e httpd . -p 8080
```

Then open `http://localhost:8080`. (Tools.html's filtering needs `fetch()` over `http://`, so
opening `index.html` directly via `file://` works for every page except the live catalog
filtering on `tools.html`.)

## Deploying (GitHub Pages)

1. Push this repo to GitHub (already set up — see below).
2. In the repo on GitHub: **Settings → Pages → Source → Deploy from a branch**, branch `main`,
   folder `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/` within a few minutes.

## Not included in this repo

`Tool Tracker.xlsx` (your internal fleet/financial spreadsheet) and the raw logo export PNGs are
excluded via `.gitignore` — they stay on your machine but aren't published.
