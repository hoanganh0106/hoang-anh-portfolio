# Environment

## Site URL

Set `NEXT_PUBLIC_SITE_URL` to canonical HTTP(S) origin:

```text
NEXT_PUBLIC_SITE_URL=https://nguyenhoanganh.dev
```

Use same value in `web/.env.example` and local development. Value is public, not secret. Site config accepts only `http://` or `https://` origins, strips one trailing slash through URL normalization, and rejects paths, query strings, fragments, credentials, and invalid values.

Next.js loads `.env*` files from `web/`, not `web/src/`. `NEXT_PUBLIC_*` values are inlined during `next build`; set `NEXT_PUBLIC_SITE_URL` before every production build. Changing environment after build does not change generated metadata.

## Indexing behavior

`SITE_ALLOW_INDEXING` controls robots policy. Default is false. Set it to `true` only for actual public deployment:

```text
SITE_ALLOW_INDEXING=true
```

Keep `SITE_ALLOW_INDEXING=false` in local development and production testing. `NODE_ENV=production` does not enable indexing.

## Metadata behavior

`web/src/app/sitemap.ts` emits configured-origin routes with trailing slashes, including published projects such as MossFormer 2. Sitemap remains available for validation whenever `NEXT_PUBLIC_SITE_URL` is valid.

`web/src/app/robots.ts` allows crawling and emits an absolute sitemap URL only when `SITE_ALLOW_INDEXING=true` and site origin is valid. Otherwise it disallows `/` and omits sitemap URL.

Run local checks from `web/`:

```text
npm run build
npm run start
npx playwright test tests/metadata.spec.ts
```
