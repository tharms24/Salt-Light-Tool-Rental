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

**The starter catalog is example inventory** (drills, saws, nailers, sanders, demo, outdoor
power, ladders) with placeholder pricing based on the one real listing you provided. Swap it for
your actual fleet and rates before publishing.

## Updating contact info

Placeholder contact details (`[Your Phone Number]`, `[your@email.com]`, `[@yourhandle]`) appear
in the top bar, footer, and `contact.html` on every page. Search for those bracketed strings
across the project and replace them with your real phone, email, and social handles.

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
