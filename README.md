# rczajka.me

Personal website and blog monorepo.

## Stack

- Vite - homepage
- Next.js - blog
- Sanity - CMS
- pnpm + Turborepo

## Development

```bash
pnpm install
pnpm dev
```

Required environment variables:

```env
VITE_BLOG_URL=

SANITY_PROJECT_ID=
SANITY_DATASET=

SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```
