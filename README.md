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
  "id": "rigid-grinder",
  "name": "RIDGID Angle Grinder",
  "category": "grinders",
  "icon": "sander",
  "blurb": "Cutting, grinding & surface prep on metal, tile & concrete.",
  "includes": "R1020",
  "dayRate": 40,
  "weekRate": 120
}
```

`dayRate` and `weekRate` are the daily and weekly rental prices — this matches the two rate
columns in your "Tool Pricing" spreadsheet, so updating a price here or there stays a one-line
edit. `includes` is used for the model number when there is one (shown as "Model: R1020" on the
card). Add `"image": "assets/img/your-photo.jpg"` to show a real photo instead of the line icon —
two tools (RIDGID Angle Grinder and DeWalt Angle Grinder) don't have one yet, so they fall back to
an icon. Category ids/labels live in the `categories` array at the top of the same file — add a
new category there before using its id on a tool.

**The full 20-tool catalog is your real fleet**, rebuilt from `Tool Pricing.xlsx`: Hilti DSH 700 &
700-X cement saws, Bosch jack hammer, DeWalt & Honda generators, DeWalt air compressor, RIDGID &
Makita metal saws, DeWalt DWS780 miter saw, RIDGID 13" planer, Makita hand planer, RIDGID & DeWalt
grinders, RIDGID drain snake, Echo chainsaw, three Paslode nail guns (16-ga, 18-ga, 30° framing),
and two Graco paint sprayers. Prices match the spreadsheet exactly. Keep both in sync going
forward — whichever you edit first, update the other to match.

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

`Tool Tracker.xlsx` and `Tool Pricing.xlsx` (internal spreadsheets), and the raw logo/photo source
files (HEIC, AVIF, WEBP, and the handful of originally-named JPG/PNG product shots) are excluded
via `.gitignore` — only the optimized copies in `assets/img/` are published. They stay on your
machine but aren't tracked in git.
