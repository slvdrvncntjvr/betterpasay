# Stack decision

Reviewed **28 October 2026**, after reading the local Better LGU Directory's README, GUIDE, TEMPLATES and contribution guidance. The directory is a registry, not the Pasay application.

| Community starter                                              | Reviewed material and architecture                                                                                        | Fit for this milestone                                                                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [Better Solano](https://github.com/BetterSolano/bettersolano)  | Main README: static HTML implementation and a separate React/TypeScript branch; service/transparency conventions          | Supports a static approach. Adopting the complete portal would require removing another municipality's content and branding. |
| [Better Los Baños](https://github.com/BetterLosBanos/betterlb) | README: React/TypeScript, LGU configuration, categorized service data, translations and legislative/transparency features | Useful separation of configuration and content; more feature surface than this initial guide requires.                       |
| [Better Local Gov](https://github.com/iyanski/betterlocalgov)  | README and manifest: React/TypeScript/Vite, YAML content tooling, translations and search integration                     | Good model for a larger portal; additional client and conversion tooling is unnecessary for eleven entries.                  |

These are observations of documented architecture, not independent audits. The directory describes all three as React/TypeScript; Solano's own README also documents its static main branch. No starter code, branding or locality data was copied.

Use **Astro + TypeScript + CSS**, editable JSON data, pre-rendered pages and a small DOM-based search. [Astro setup](https://docs.astro.build/en/install-and-setup/) and [static deployment guidance](https://docs.astro.build/en/guides/deploy/) were reviewed. Dependencies are pinned in the lockfile.

Pages stay readable without client execution. Content and code can be reviewed together in Git. There is no database, authentication, analytics, paid API or mandatory hosting provider. Manrope is hosted locally under its SIL Open Font License; licensed Wikimedia photographs supply Pasay imagery and an original SVG supplies the favicon. Original documents remain on their publishers' hosts. The expanded content and visual design are documented in [DESIGN-RESEARCH.md](DESIGN-RESEARCH.md), [PASAY-DOCUMENTS.md](PASAY-DOCUMENTS.md) and [PASAY-SOURCES.md](PASAY-SOURCES.md).

Revisit the architecture if editorial workflows outgrow pull requests, the catalogue becomes large, or document ingestion is separately approved.
