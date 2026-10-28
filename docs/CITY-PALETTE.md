# Pasay city palette variant

The approved navy-and-yellow portal is preserved on `main` at commit `5eee77d`. This branch, `design/pasay-city-palette`, explores the same layout using the colors of the [official Pasay City website](https://pasay.gov.ph/).

The reference was opened and visually reviewed in Orca on **28 October 2026**. Computed foreground/background styles were sampled from the rendered page, rather than inferred from a screenshot alone.

| Official website color | Sampled value | Use in this version                                            |
| ---------------------- | ------------- | -------------------------------------------------------------- |
| Rose pink              | `#CF3F73`     | Utility bar, brand mark, primary buttons and active navigation |
| Deep berry             | `#290D17`     | Hero overlay, main text and footer                             |
| Eco green              | `#39AB5F`     | Small community and ecological accents                         |
| Pale green             | `#EBF7EF`     | Contact shortcut, business category and community callout      |
| Pale pink              | `#FAECF1`     | Search, document and service accents                           |
| Neutral text           | `#423E40`     | Reference for the warmer neutral text family                   |

The original page structure, Pasay content, photography and interactions are retained. Rose-tinted borders and neutral grays replace blue-tinted surfaces throughout city, government, barangay, contact, document and service-detail pages. A lighter rose supports text on dark berry; a darker green is used for text on pale green. These supporting tones are design adaptations, not claims of an official branding specification.

The portal keeps its independent community identity and its existing disclosure. City seals, campaign marks and official website code are not copied.

## Validation

`npm run validate` passed: formatting, ESLint, Astro checks (zero errors/warnings/hints), a 31-page production build, eight content tests and all 44 desktop/mobile browser tests. The existing axe checks passed on 12 representative routes at both tested sizes. Desktop (1440 px) and phone (390 px) full-page screenshots were visually reviewed with no horizontal overflow.

The pink utility bar uses white text throughout to meet the checked contrast requirement. The reference palette is retained while darker green and rose support readable small text. ESLint now excludes ignored local preview artifacts under `.local/`, consistent with Git and Prettier.

For local comparison during this session, the approved build is served at `http://127.0.0.1:4324/` and the city-palette development preview at `http://127.0.0.1:4321/`. The approved preview is an ignored local build snapshot, not a second published site. After a restart, `git switch main` restores the saved design; `git switch design/pasay-city-palette` restores this version, and `npm run dev` starts the selected source.
