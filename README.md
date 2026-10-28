# Better Pasay

An independent, community-led public information portal for **Pasay City, Metro Manila, Philippines**.

**Status: Work in Progress.** The redesigned portal is implemented locally. No public deployment has been made.

| Field                            | Details                                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Repository                       | [slvdrvncntjvr/betterpasay](https://github.com/slvdrvncntjvr/betterpasay)                                                         |
| Maintainer                       | [@slvdrvncntjvr](https://github.com/slvdrvncntjvr)                                                                                |
| Registration                     | [Better LGU Directory PR #319](https://github.com/jmacj/better-lgu-directory/pull/319), merged per the maintainer's project brief |
| Public website / project socials | Not yet available                                                                                                                 |
| Initial source review            | 28 October 2026                                                                                                                   |

Better Pasay is not an official Pasay City government website. It does not claim government endorsement or formal BetterGov.ph affiliation, process applications, or collect payments.

## What works

- A redesigned navy, white and yellow interface with locally hosted typography, licensed Pasay photographs, service search and task shortcuts.
- Twenty-one sourced service entries, including civil registry records, PWD and solo-parent IDs, health certificates and medical assistance.
- Detailed guides with selected charter-backed requirements and steps; fees, timings and source editions are included where verified.
- A searchable library of 25 official guides, forms, charter sections and public-record collections.
- City history, geography, landmarks and statistics with explicit census years.
- A searchable directory of all 201 barangays with official PSA codes and 2024 census populations.
- Government leadership, council and office information, plus source-linked emergency and city contacts.
- Search in titles, offices, summaries and English/Filipino aliases; category filters and shareable URLs.
- Static service details with original sources, review scope, dates and correction links.
- Eight transparency resources covering budgets, disclosure, procurement, legislation and service standards.
- An About page identifying the maintainer, content standards and contribution process.
- Keyboard support, a skip link, accessible disclosures, empty/error states, a 404 page and a directory usable without JavaScript.

Content retains its source and review limits. See [the research and gaps](docs/RESEARCH.md), [Pasay city sources](docs/PASAY-SOURCES.md), [document research](docs/PASAY-DOCUMENTS.md), and [service expansion](docs/SERVICE-EXPANSION.md). Five peer portals informed the [design research](docs/DESIGN-RESEARCH.md).

## Local setup

Use Node.js **24.22 or newer** and npm. Dependencies are pinned in `package-lock.json`. In Windows PowerShell, use `npm.cmd` / `npx.cmd` if execution policy blocks the `.ps1` wrappers; do not change execution policy for this project.

```sh
git clone https://github.com/slvdrvncntjvr/betterpasay.git
cd betterpasay
npm ci
npm run dev
```

Open **http://127.0.0.1:4321/**. Stop with Ctrl+C. No environment variables, API keys, database or paid services are required.

For a production build and local preview:

```sh
npm run build
npm run preview
```

Stop a dev server on port 4321 first, or pass `-- --port 4323`. Browser tests use port 4322.

## Validation

```sh
npx playwright install chromium
npm run validate
```

`validate` checks formatting, runs ESLint and Astro/TypeScript checks, builds the static site, and runs content/search and desktop/mobile Playwright tests with axe accessibility checks. Browser tests use the production build. Linux may need `npx playwright install --with-deps chromium`.

Individual commands: `npm run lint`, `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`. Build before running browser tests. Content tests also check generated internal links when `dist/` exists.

See the [first-version validation record](docs/VALIDATION.md) for results and manual testing limits.

```sh
npm run check:links
```

This optional network-dependent maintenance command writes `.local/link-report.json` and fails if a source is unavailable. HTTP success does not verify content or update review dates. Some official servers block automated access. Third-party sites are excluded from deterministic CI.

## Stack and content

Astro generates static HTML, TypeScript supports content helpers and search, and plain CSS defines the interface. Search runs over already-rendered entries. All three community templates were reviewed: see [the stack decision](docs/STACK.md).

- `src/data/`: source registry, services and transparency entries.
- `src/lib/`, `src/components/`, `src/layouts/`: helpers and shared UI.
- `src/pages/`, `src/styles/`, `public/`: pages, responsive CSS and original favicon.
- `tests/`, `scripts/`: validation and source availability checker.
- `docs/`: research, maintenance, stack and deployment notes.

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [content maintenance](docs/CONTENT.md). [Report a correction](https://github.com/slvdrvncntjvr/betterpasay/issues/new?template=content-correction.yml) with a public source and check date. Do not submit private records. The remote issue template becomes available after these changes are pushed; this task does not push changes.

## Deployment

The `dist/` output is suitable for static hosting. Follow [deployment instructions](docs/DEPLOYMENT.md) when public deployment is separately authorized. CI validates but never deploys. Keep status Work in Progress until launch. The public directory listing changes only after its separate upstream PR is merged.

## License

Original code, artwork and community summaries are under the [MIT License](LICENSE). Pasay photography is credited under CC BY-SA 4.0, PSA data under CC BY 4.0, and locally hosted Manrope under the SIL Open Font License. Original documents remain on their publishers’ hosts. See [reuse notes](docs/RESEARCH.md#reuse-and-attribution), [Pasay source attribution](docs/PASAY-SOURCES.md), and the website’s About page for credits.
