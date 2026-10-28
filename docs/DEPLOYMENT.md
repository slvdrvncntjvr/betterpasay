# Static deployment (not performed)

Public deployment requires a separate maintainer instruction. There is no public domain, deployment token or publishing workflow configured.

## Prepare locally

```sh
npm ci
npx playwright install chromium
npm run validate
npm run preview
```

Inspect `http://127.0.0.1:4321/`, search/filter URLs, service details, transparency disclosures and About. Test small screens and no JavaScript. Review all source content again; committed verification dates describe past checks.

## Static hosting contract

| Setting                         | Value           |
| ------------------------------- | --------------- |
| Node                            | 24.22 or newer  |
| Install                         | `npm ci`        |
| Build                           | `npm run build` |
| Publish directory               | `dist`          |
| Secrets / environment variables | None            |
| Runtime / database              | None            |

Upload the contents of `dist/` as one version. Serve generated directory indexes, preserve query strings and return the generated `404.html` with HTTP 404 for missing paths. Do not use an SPA catch-all rewrite.

The site expects the origin root, including `/services/` and `/_astro/`. For a subpath such as `example.github.io/betterpasay/`, first update Astro's `base` and root-relative links/assets and test under that prefix. Subpath hosting is not configured. Set Astro's `site` to the actual public origin when chosen before adding canonical URLs or a sitemap; no domain is invented now.

## Once deployment is authorized

1. Choose a real static host and domain, configure TLS and directory-index/404 handling.
2. Publish a reviewed commit after fresh content checks and successful validation.
3. Verify public deep links, assets, query URLs, mobile layout, source links and a nonexistent route.
4. Configure host security headers where supported, such as `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`. Test a content security policy against the build before enforcing it.
5. Record the real URL, deployment date and commit. Update the directory to Active only after verification.

Keep the previous complete build/commit for rollback. Republish its output if needed; no runtime data or database migration must be restored.
