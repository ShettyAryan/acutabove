# Sanity CMS setup (full site content)

## 1. Create a Sanity project

1. Sign up at https://www.sanity.io/manage
2. Create a new project (free plan is fine)
3. Note the **Project ID** and use dataset `production`

## 2. Configure the site

1. Create `.env.local` in the `site` folder with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=yourEditorToken
```

2. In Sanity manage → **API** → **CORS origins**, add:
   - `http://localhost:3000`
   - your production URL
3. Create an **API token** with Editor permissions → `SANITY_API_WRITE_TOKEN` (seed only)

## 3. Seed existing content

```bash
npm run sanity:seed
```

This uploads the current site copy and images into Studio (home, about, team, events, gallery, AXION, Nick of Time, contact, site settings, team roster, programmes).

Until seed runs, the website keeps built-in fallbacks so pages never go blank.

## 4. Edit content

1. Run `npm run dev`
2. Open http://localhost:3000/studio
3. Edit any page document or list → **Publish**

Changes show on the next request (`force-dynamic`).

## What is editable

| Studio section | Controls |
|----------------|----------|
| **Site settings** | Brand name, MAHE logo, brand logo, register URL, email, Instagram, nav links, footer |
| **Home page** | Hero slides, title, tagline, CTAs, promo chip, highlights, about block, events preview |
| **About page** | Hero + MAHE / KMC / Surgery / A Cut Above chapters (text + images) |
| **Team page** | Hero copy (roster is under Team members) |
| **Events page** | Hero, featured events, updates links |
| **Gallery page** | Hero + gallery images |
| **AXION page** | Hero + gallery images |
| **Nick of Time page** | Hero, about, collage, heritage, countdown, programme section chrome, final CTA |
| **Contact page** | Eyebrow, title, description |
| **Team members** | Add / edit / delete / reorder / photos |
| **Nick of Time programmes** | Add / edit / delete (creates `/event/nickoftime/[slug]` pages) |

## Invite editors

In https://www.sanity.io/manage → project → **Members** → invite with the **Editor** role.
They only need `/studio` — no code access required.
