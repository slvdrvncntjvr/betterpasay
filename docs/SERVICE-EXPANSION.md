# Service and document expansion

Checked 28 October 2026. Changes are limited to `src/data/services.json`, `src/data/sources.json`, `src/data/documents.json`, `src/pages/documents.astro`, `src/pages/services/[id].astro`, and this report.

## Content delivered

The 11 existing service IDs remain. Ten additions bring the directory to 21 services: local certified birth, marriage and death record copies; PWD ID new application and renewal; solo parent ID; new work health certificate; marriage license; certificate of indigency for PAO legal assistance; and PSWDD medical assistance. Cedula and Mayor’s clearance also now have selected requirements and steps from their standalone official guides.

All new service summaries link to the exact relevant page in the [official 2026 Citizen’s Charter](https://pasay.gov.ph/wp-content/uploads/2026/04/pasay-city-citizens-charter-2026.pdf), linked from the [city Transparency page](https://pasay.gov.ph/transparency/). Independent local extraction returned HTTP 200, 28,493,768 bytes and 1,193 PDF pages; the cover states **2026 (1st Edition)**. Text extraction used PyMuPDF; the LCRO checklist/fee table on p. 525 was also visually inspected. The research worker independently corroborated PWD, solo parent, health, civil registry, marriage-license and medical-assistance sections; its full inventory is in `docs/PASAY-DOCUMENTS.md`.

| Transaction                 | 2026 charter pages | Treatment                                                                                                                                                                                    |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local civil record copies   | 524–526            | Pasay-registered records; requester/representative/deceased-owner branches; charter totals and timing explicitly tied to 2026                                                                |
| PWD new application         | 167–170            | Medical evidence, residency alternatives, ID/photo requirements and representative additions; 2026 no-fee/40-minute standard                                                                 |
| PWD renewal                 | 170–172            | Separate personal/representative checklists; lost-card replacement explicitly a different transaction                                                                                        |
| Solo parent ID              | 579–587            | Checklist and assessment/home-visit process; case-specific evidence; no attempt to turn charter language into current legal eligibility advice                                               |
| New work health certificate | 120–125            | New applications only; conditional food-handler/pink-card requirements; no single total fee or minute estimate because worker types vary and the printed total does not match step durations |
| Marriage license            | 545–550            | Age/nationality/civil-status branches; 2026 PHP 270 excluding notarization; 10-day posting period; charter residency wording explicitly referred to LCRO for confirmation                    |
| Legal-assistance indigency  | 496–504            | PAO-specific checklist distinguished from general assistance certification                                                                                                                   |
| Medical assistance          | 313–315            | Medical checklist and intake process; amount/availability and complete current fees/timing explicitly unverified                                                                             |

## Document library

`/documents/` contains 25 records across charters, service guides, forms/templates, reports and policies. It offers combined case/diacritic-insensitive text search and collection filters, result counts, an empty state, reset, and source review notes. All records remain visible without JavaScript. Dates distinguish publication from the checked date; missing dates are explicit, and edition years/upload folder dates are never substituted for publication dates.

The library links to original city PDFs or official source indexes. Charter links open the **full approximately 28.5 MB PDF**, not extracted files; the UI labels this and identifies the target pages. Service guides are distinguished from blank forms. Five actual blank procurement templates are linked from the city’s forms index; the original June goods bid-security URL and the goods/services-indexed omnibus statement with an `infra` filename are retained accurately. Procurement forms imply neither an active opportunity nor a deadline. City Secretariat provenance is disclosed and linked back to the official city Transparency page.

Sources retain the original schema (`id`, title, publisher, URL, format, publication/check dates, verification and note). The full charter record now records a **selected-section review**, never a full-document audit. Optional service fields are string arrays `requirements`/`steps`, strings `fee`/`timing`, and contextual `edition`/`pages`/`scope`. Document records contain stable IDs, titles, descriptions, collection categories, source references, edition/page labels, and optional related service IDs.

## Verification

`npm run check` passed after the final implementation with zero errors, warnings or hints. A targeted Playwright run against the coordinator’s existing development server passed: all 25 entries, combined text/category filtering, empty and reset states, 390px viewport overflow checks, source page anchors, preservation of the legacy detail-link selectors, and the no-JavaScript fallback; no page errors occurred. Desktop/mobile screenshots were visually reviewed from temporary files. Owned files were formatted with Prettier.

At the coordinator’s request, the production build and full test suite are deferred to its final shared-workspace QA pass to avoid concurrent builds. No application, registration or payment transaction was submitted. Publication dates and current individual fee assessments remain limitations stated next to the relevant content.
