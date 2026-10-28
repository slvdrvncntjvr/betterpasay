# Content maintenance

## Content files

- `src/data/sources.json`: stable ID, title, publisher, original HTTPS URL, format, `publishedAt` (date or `null`), `checkedAt`, `verification` and an honest review `note`.
- `src/data/services.json`: slug, title, Filipino label, category, brief summary, responsible office/source, `sourceId`, search aliases and action label.
- `src/data/resources.json`: title, category, summary, `sourceId`, period/edition, caution and optional `provenanceId` pointing to an official index.
- `src/data/documents.json`: document collections with source IDs, related service IDs, source editions and PDF page references.
- `src/data/city.json`: city facts, government leadership, office contacts and 201 barangay records, with a separate source registry and census-year fields.
- `src/lib/content.ts`: categories, project links and helpers. `project.checkedAt` identifies the initial research batch, not an automatically advancing verification date.

Service categories: `documents`, `business`, `family`, `work`, `inquiries`. Resource categories: Public finances, Procurement, Local legislation, Service standards. Update UI labels and tests together when changing these.

## Review procedure

1. Open the original source and confirm its publisher, scope and relevant sections. A search snippet or HTTP status is insufficient.
2. For a separate city-linked domain, preserve an official `provenanceId` and verify that the identifying link remains on that index.
3. Read evidence supporting the summary. Requirements, charges, contacts, statistics and eligibility need current, direct evidence. Service records can include `requirements`, `steps`, `fee`, `timing`, `edition`, `pages` and `scope`; qualify summaries to the reviewed edition and applicant case. Retain the original checklist link and do not infer omitted fees or processing times.
4. Record the actual review date as `checkedAt` in `YYYY-MM-DD`. Use `publishedAt` only when explicitly stated in the source or official index, describing a posting date in the note. Never infer it from an upload path or file name.
5. `reviewed` means supporting sections were read, with scope in the note. `linked` means provenance/identity checked but full review limited; the resource must have a visible caution and official provenance link.
6. Record limitations in the note and visible caution. A reviewed source is not independently certified government information.
7. Run `npm run validate`, inspect affected pages, and submit content/evidence changes together in a PR.

A reporting period is not a publication date. `checkedAt` does not promise accuracy after that date. Do not advance it based only on an HTTP response.

## Availability and corrections

Run `npm run check:links` and read `.local/link-report.json`. Automated access may fail when a source opens manually. Check redirects and destination identity before replacing a URL. Remove unavailable content or clearly label its limits; do not substitute unofficial requirements without review.

Public correction issues should identify the page, suggested change, original URL and date checked. The maintainer reviews evidence, edits the record, validates and explains the correction in a PR. Do not collect private application records. Government service requests belong with the responsible office.

Review every source before launch. After launch, aim for monthly availability checks and quarterly content reviews, with prompt attention to reported errors. This is a suggested cadence, not a running monitoring service.

Start new content with the gaps in [RESEARCH.md](RESEARCH.md), [SERVICE-EXPANSION.md](SERVICE-EXPANSION.md) and [PASAY-SOURCES.md](PASAY-SOURCES.md). Priority health/civil-registry/PWD sections now have reviewed summaries; check later advisories before changing them. Financial analysis requires verified periods, completeness, units and methodology before charts or totals.
