# Portfolio local handoff

UI source: https://hn-tech-journal.lovable.app/ (selected by the owner).

Implementation proposals came from `cx/gpt-5.6-luna` through the local 9router chat completions endpoint. Codex reviewed and applied them, correcting SVG fidelity, metadata preservation, CSS isolation, route normalization, heading order and the static preview server. Credentials are not part of the application or this document.

## Run

From `D:\Project\porfolio\web`:

```powershell
npm run build
npm run start
```

Open http://127.0.0.1:3000/ . The server binds only to loopback. No deployment or DNS changes were performed.

`web/.env.local` sets `NEXT_PUBLIC_SITE_URL=https://nguyenhoanganh.dev` and `SITE_ALLOW_INDEXING=false`. Metadata is generated during build; rebuild after changing these values. See `docs/environment.md`.

## Verification

```powershell
npm run typecheck
npm run lint
npx playwright test
```

The final production build, typecheck and lint passed on 2026-09-09. After the Quiet Signal Phase 1 redesign, all 33 Chromium tests passed. In addition to the existing route, metadata, responsive and accessibility coverage, the suite clicks a domain graphic, verifies its filtered destination, checks keyboard and no-JavaScript navigation, and confirms pointer-based CSS 3D tilt resets correctly and is disabled for reduced motion.

The verified build includes an identity-first editorial hero, an abstract signal-board visual, three featured case-study cards, a simplified header hierarchy, and the system map repositioned as a secondary exploration section. It retains the clickable domain graphics, CSS 3D tilt/lift, module entrance, LED and circuit-trace interactions. Reduced-motion mode disables every map animation. WebKit had passed the 27-test pre-interaction build. Its browser binary was updated during this pass and needs reinstalling for the expanded suite; this is not recorded as a passing post-interaction WebKit run. Firefox remains unverified because its runtime fails to launch with a Windows side-by-side assembly error for mozglue, including after a clean Playwright reinstall.

To repeat the second-engine run:

```powershell
$env:PW_INCLUDE_WEBKIT='1'
npx playwright test --project=webkit --workers=2
```

The browser review compared the published Lovable and local homepage at matching desktop dimensions. Source geometry and layout are ported directly, with real project-detail links. Research figures are conceptual illustrations rather than measurements.

Next 16 static exports on this Windows setup store some RSC segments as nested paths while the browser requests flattened names. `scripts/serve.mjs` resolves these specific requests beneath `out/`; it still returns real 404 responses for missing pages.

Public hosting, DNS, production HTTPS and real-device/field performance remain separate follow-up work. The local build is not evidence of those deployment checks.
