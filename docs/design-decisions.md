# Design decisions

- The homepage uses the reference composition as a technical system map, while keeping content in semantic HTML.
- The README's restrained, monochromatic engineering-journal tone takes priority over decorative effects.
- The owner selected https://hn-tech-journal.lovable.app/ as the UI source on 2026-09-09. Its layout, IBM Plex fonts, theme colors and inline SVG module geometry are ported into the existing Next.js application.
- This choice supersedes the earlier custom WebGL homepage proposal. The active homepage uses static SVG and real HTML links; legacy scene components are not imported by the homepage.
- Mobile uses the reference's vertical technical index and always-visible navigation row. Desktop shows the spatial system map.
- Desktop module graphics use CSS perspective with pointer-controlled rotation, lift and shadow. Each graphic and domain title is a real link. Touch layouts remain stable, and reduced-motion removes the transform.
- Projects keep URL domain filters and canonical detail routes. Reference placeholder figures and fragment-only project destinations are replaced with real project details.
- The current delivery is a local production preview. Domain metadata comes from environment variables; deployment and DNS changes are deferred by the owner.
- Current work and future directions are separate data types. A direction never becomes a completed project badge.
