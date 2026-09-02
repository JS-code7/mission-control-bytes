# Portfolio V8 rollout plan

## User-facing changes
- Synchronize the latest Profile_5.pdf as the authoritative profile for identity, roles, education, certifications, and contact details while preserving existing genuine project work.
- Upgrade Modules discovery with working search, category and technology filtering, featured-project mode, keyboard-friendly controls, and a focused project brief view.
- Make the Lab concierge use the real profile-grounded assistant endpoint, add loading/error/reset states, and clearly mark deterministic demos as simulations.
- Fix cross-site accessibility and responsive issues: focus visibility, mobile navigation semantics, Brain keyboard states, filter semantics, form requirements/errors, and reduced-motion behavior.
- Generate a clean one-column ATS resume from verified content, attach it as the downloadable asset, and count only successful downloads.

## Technical details
- Keep TanStack Router, the existing Mission Control visual system, Lovable Cloud analytics/contact integrations, and current route structure.
- Treat exact dates and locations from Profile_5.pdf as authoritative; omit unsupported OSCP, Oracle, AWS, and unverified metrics.
- Reuse existing Button/UI primitives for new interactive controls and avoid exposing secrets or visitor content.
- Validate with lint/build plus Playwright checks at mobile, tablet, and desktop viewports for all public content routes.
