# Redesign validation

Verified locally on **28 October 2026**, Windows with Node.js 24.22.1.

| Check                     | Result                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run validate`        | Passed after contrast fixes                                                                                                            |
| Prettier and ESLint       | Passed                                                                                                                                 |
| Astro / TypeScript        | 0 errors, 0 warnings, 0 hints                                                                                                          |
| Production build          | 31 static pages generated                                                                                                              |
| Content and search tests  | 8 passed, no skips                                                                                                                     |
| Playwright                | 44 passed, no skips; Chromium desktop and iPhone-sized emulation                                                                       |
| axe accessibility         | No violations in configured WCAG A/AA checks on 12 representative routes at both tested sizes                                          |
| Additional viewport sweep | 11 representative routes at 320, 768 and 1440 px; no document-level horizontal overflow                                                |
| Visual review             | Desktop and 320 px full-page homepage screenshots; redesigned homepage opened in Orca browser                                          |
| Local response            | Homepage returned HTTP 200 at `http://127.0.0.1:4321/` during review                                                                   |
| Barangay integrity        | 201 unique numbered barangays and official PSA codes; populations sum to 453,186 for 2024 POPCEN                                       |
| Document integrity        | 25 records reference registered official sources; linked service slugs resolve                                                         |
| Source evidence           | Three Orca workers researched peer designs, official city/PSA records and selected charter sections; evidence reports are linked below |

Browser coverage includes English/Filipino search aliases, combined filters, reset/focus, shareable URLs, hostile query strings rendered as text, invalid categories, keyboard navigation, resource disclosures, no-JavaScript service fallback, initialization errors, original document/correction links, exact barangay search and empty/reset behavior, and combined document search/collection filtering.

The first browser run identified insufficient contrast in a homepage metadata label and the service source panel. Both were fixed; the full suite then passed. An import-attribute issue in the expanded browser tests was also corrected before the successful run. Visual review caught a stray text character at the homepage footer; it was removed and the production output was rebuilt with content/link checks rerun.

## Evidence and limits

- [Design research](DESIGN-RESEARCH.md): five Better LGU peer portals and directory guidance.
- [Pasay documents](PASAY-DOCUMENTS.md): official charter download, exact section pages, source links and review limits; the researcher checked 34 unique URLs successfully.
- [Service expansion](SERVICE-EXPANSION.md): 21 service entries, selected requirements/steps and 25 document records.
- [City sources](PASAY-SOURCES.md): history, leadership, emergency contacts, PSA extraction and attribution.

Checks do not establish full WCAG conformance or correct behavior on every device. Manual screen-reader testing and physical-device testing remain pre-launch work. Published phone numbers were checked against original sources; no test calls were made. Complete barangay hall contacts and zone/district mappings remain unverified and are labelled accordingly. Only selected sections of the 1,193-page charter were reviewed, and no financial dataset or project-progress tracker is claimed.

No commit, push, upstream directory edit or public deployment was performed in this redesign. The portal uses no database, authentication, paid service or remote submission endpoint.
