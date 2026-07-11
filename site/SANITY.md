# Sanity CMS setup (Team + Nick of Time programmes)

## 1. Create a Sanity project

1. Sign up at https://www.sanity.io/manage
2. Create a new project (free plan is fine)
3. Note the **Project ID** and use dataset `production`

## 2. Configure the site

1. Copy `.env.local.example` to `.env.local`
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
3. In Sanity manage → **API** → **CORS origins**, add:
   - `http://localhost:3000`
   - your production URL (e.g. `https://your-domain.com`)
4. Create an **API token** with Editor permissions → put it in `SANITY_API_WRITE_TOKEN` (seed only)

## 3. Seed existing content (do this before editing)

```bash
npm run sanity:seed
```

This uploads the current team roster and Nick of Time programmes into Studio.

**Important:** Always run the seed **before** heavy editing. Until seed runs, the site merges Studio entries with the built-in content so a single publish cannot wipe Team tabs or Nick of Time programmes. After seed, Sanity is the full source of truth — you can freely add, edit, and delete.

## 4. Edit content

1. Run `npm run dev`
2. Open http://localhost:3000/studio
3. Sign in with your Sanity account
4. Edit **Team members** or **Nick of Time programmes** → **Publish**

Changes appear on `/team` and `/event/nickoftime` within about a minute (ISR revalidate).

## 5. Invite a non-technical editor

In https://www.sanity.io/manage → project → **Members** → invite with the **Editor** role.
They only need `/studio` — no code access required.

## What is editable

- Team roster (all three tabs): add, edit, delete, reorder, photos
- Nick of Time programmes: add, edit, delete (creates/removes `/event/nickoftime/[slug]` pages)
- **Site settings → Register form URL**: one link used by every Register / Register Now button (navbar, Nick of Time hero/CTA, programme pages)

Hero copy and other site pages stay in code for now.
