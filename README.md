# Vaishnavi Enterprises — Corporate Website

Next.js 15 (App Router) marketing site for **Vaishnavi Enterprises**, an aluminium
recycling business supplying furnace-ready alloys, ingots, shots, cubes and notch bars
to alloy manufacturers, foundries and steel plants.

All copy is drawn from the company pitch deck; the brand palette (navy `#142e52` /
gold `#d4ad57`) is taken from the supplied logo.

---

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                      |
| `npm run build`     | Production build (19 prerendered routes)        |
| `npm run start`     | Serve the production build                      |
| `npm run typecheck` | `tsc --noEmit`                                  |
| `npm run images`    | Re-fetch the free-licence photography (Python 3) |

---

## Pages

| Route                | Contents                                                            |
| -------------------- | ------------------------------------------------------------------- |
| `/`                  | Hero, stats, about, product grid, USPs, process, industries, market  |
| `/about`             | Company story, vision, mission, core values, leadership, scale-up    |
| `/products`          | Full catalogue grouped by category                                   |
| `/products/[slug]`   | Per-grade detail with chemistry table, applications, formats         |
| `/process`           | Four-step workflow, challenges vs. solutions, business model         |
| `/sustainability`    | Circular economy, TAM/SAM/SOM diagram, growth drivers, roadmap       |
| `/contact`           | Contact channels and enquiry form                                    |
| `/credits`           | Photography attribution                                              |

`sitemap.xml` and `robots.txt` are generated at build time.

---

## Editing content

Almost everything lives in two files — no need to touch JSX for copy changes:

- **`src/data/site.ts`** — company details, stats, vision/mission, values, process
  steps, industries, market figures, growth plan, navigation.
- **`src/data/products.ts`** — the six product lines, key facts, applications,
  supplied formats and chemistry tables.

Changing the phone number, email or a product spec is a one-line edit in those files
and it propagates across every page, the footer, the sitemap and the structured data.

---

## Enquiry form

`POST /api/enquiry` validates the submission, rejects bot traffic via a honeypot field,
and **appends every enquiry to `data/enquiries.jsonl`** so nothing is lost.

> ⚠️ **Before launch:** set `ENQUIRY_WEBHOOK_URL` so enquiries actually reach an inbox.
> Any JSON-accepting endpoint works — Formspree, Zapier, Make, a Google Apps Script, or
> your own service:
>
> ```bash
> # .env.local
> ENQUIRY_WEBHOOK_URL=https://your-endpoint.example/enquiries
> NEXT_PUBLIC_SITE_URL=https://vaishnavienterprises.in
> ```
>
> Without it the form still succeeds and stores locally, but no one is notified.

---

## Images

`public/images/*` are **placeholders under free licences** — Unsplash License, or
Creative Commons / public domain via Wikimedia Commons. Attribution for every file is
recorded in `src/data/image-credits.json` and rendered at `/credits`.

They illustrate the industry, not the company's own plant. **Replacing them with real
photography of Vaishnavi Enterprises' premises, furnaces, products and team is the
single highest-impact improvement before launch** — drop new files into
`public/images/` using the same filenames and nothing else needs to change.

`scripts/fetch_images.py`, `fetch_unsplash.py` and `replace_images.py` regenerate the
set and rewrite the credits file.

---

## Deliberately not published

Two sections of the pitch deck are investor-room material and were left off the public
site:

1. **The fund ask and fund-utilisation split** (₹5 Cr and its 45/30/15/10 breakdown).
2. **The named competitor comparison table.**

Both are in the deck if you want them on a private/investor page — say the word and
they can be added behind a route that is excluded from the sitemap.

---

## Before going live

- [ ] Set `ENQUIRY_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL`
- [ ] Swap placeholder photography for the company's own images
- [ ] Add the registered business address and GST number (not in the deck)
- [ ] Confirm the chemistry tables against what the plant actually ships
- [ ] Add analytics if wanted

## Tech

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS v4 · zero runtime UI deps.
Scroll reveals use `IntersectionObserver` and respect `prefers-reduced-motion`.
