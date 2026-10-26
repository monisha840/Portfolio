# Monisha S.S. — AI Engineering Portfolio

A production-ready personal portfolio for **AI Engineer / Generative AI Engineer / LLM Application Engineer / AI Automation Engineer** roles.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lucide.

---

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck    # tsc --noEmit
npm run audit        # responsive + accessibility audit against a running build
```

`npm run audit` drives a real Chromium through the built site at 320 / 375 / 768 /
1024 / 1440 / 1920 and checks for horizontal overflow, heading structure, missing
alt text, nameless links, unsafe external links, uncaught page errors, anchor-scroll
offsets, the résumé download, the SEO routes, the 404, the skip link, and that
reduced-motion visitors still see the content. Build and `npm start` first; point it
elsewhere with `AUDIT_URL=http://localhost:3100 npm run audit`. Screenshots are
written to `.audit/`.

---

## Design system

Palette is restricted to the three supplied brand colours — nothing else appears on the site.

| Token | Hex | Use |
|---|---|---|
| Black | `#000000` | page background |
| Burgundy | `#6D001A` | brand core — buttons, glows, rails |
| White | `#FFFFFF` | primary text |

`#6D001A` is too dark for small text on black, so `src/app/globals.css` defines a full
tonal scale around it. **`--color-burgundy-300` (`#E3315A`) is the text accent** — it clears
WCAG AA on black. `burgundy-700` is reserved for fills, never for small type.

Other tokens: `--text-display` / `--text-h1` / `--text-h2` / `--text-h3` (fluid `clamp()` scale),
the `chalk-*` neutral ramp, and the `shell` / `eyebrow` / `rule-t` / `grid-backdrop` utilities.

Typography is **Geist** + **Geist Mono**, self-hosted through `next/font` (no network font request).
Mono is used for labels, dates, technology names and section numbering; sans for everything else.

---

## Project structure

```
.
├── public/
│   ├── Monisha_SS_AI_Engineering_Resume.pdf   # served by the résumé download
│   └── monisha-portrait.png                   # background-removed hero cutout
├── src/
│   ├── app/
│   │   ├── layout.tsx            # fonts, metadata, Person JSON-LD, Navbar
│   │   ├── page.tsx              # section composition
│   │   ├── globals.css           # design tokens + utilities
│   │   ├── not-found.tsx         # custom 404
│   │   ├── sitemap.ts · robots.ts
│   │   ├── opengraph-image.tsx   # generated 1200×630 social card
│   │   ├── icon.tsx              # generated favicon
│   │   └── work/[slug]/page.tsx  # statically generated case studies
│   ├── components/
│   │   ├── Hero.tsx · Navbar.tsx · Footer.tsx
│   │   ├── ProjectCard.tsx · ProjectCaseStudy.tsx · ProjectMockup.tsx
│   │   ├── sections/             # About · FeaturedProjects · Skills
│   │   │                         # ExperienceTimeline · Education · Contact
│   │   └── ui/                   # Section · Reveal · Pill · Button · BrandIcons
│   ├── data/                     # projects.ts · skills.ts · experience.ts
│   └── lib/                      # site.ts (identity) · types.ts
└── .source/                      # resume + profile text, extracted (gitignored)
```

All content lives in `src/data/` and `src/lib/site.ts`. To change a project, a skill
or a contact detail, edit the data — no component changes needed.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import it. Vercel detects Next.js —
   leave the build command and output directory at their defaults.
3. Add one environment variable:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |

4. Deploy.

`NEXT_PUBLIC_SITE_URL` is optional but worth setting. Until it exists the site deliberately
emits **no** canonical tag and **no** `Sitemap:` directive, rather than guessing a domain and
publishing a broken absolute URL. Setting it turns on the canonical URL, absolute Open Graph
image URLs, and the sitemap entries for every case-study route.

Via CLI instead:

```bash
npm i -g vercel
vercel            # preview deployment
vercel --prod     # production
```

---

## Content accuracy

Every claim on the site traces to `Monisha_SS_AI_Engineering_Resume.pdf` or
`Monisha_SS_Professional_Profile_and_All_Projects_Updated.docx`.

Deliberately **not** present:

- No invented metrics, user counts, revenue figures, percentages or business outcomes.
- No testimonials, client endorsements or awards beyond the Sirah Digital appreciation certificate.
- No `liveUrl` or `repoUrl` on any project — no verified public URLs exist, so those buttons
  never render. Add them to `src/data/projects.ts` when real ones are available.
- No contact form. There is no backend, and a form that only fakes a success message was
  out of scope by design; contact is direct `mailto:` / `tel:` / profile links instead.
- No proficiency percentages or skill ratings.
- Project mockups are original CSS/SVG compositions, each labelled
  *"Illustrative interface — not a production screenshot"*.

Where the two source documents disagree on the Sirah Digital start date (resume: Oct 2025;
profile document: December 2025) the site follows **the resume**, as instructed.

Sirah Voice AI is presented as production software with real provider-driven call testing —
not a prototype — while its case-study note asks that the exact live deployment scope be
confirmed per feature.

---

## Accessibility

- Semantic landmarks, one `h1` per page, no skipped heading levels.
- Skip-to-content link, visible `:focus-visible` outlines in burgundy on every interactive element.
- Full keyboard navigation, including the mobile menu (Escape closes it, body scroll locks).
- `prefers-reduced-motion` is honoured globally in `globals.css` and per-component through
  Framer Motion's `useReducedMotion` — no animation bypasses it.
- Decorative imagery (hero portrait, mockup internals, oversized background type) is
  `aria-hidden`; mockups expose a real description via `role="img"` + `aria-label`.
- Text accents meet WCAG AA contrast on black.

---

## Validation performed

Run on the production build (`next build` + `next start`), not the dev server:

| Check | Result |
|---|---|
| `npm run build` | passes — 15 routes, 8 static + 7 statically generated case studies |
| `npm run typecheck` | passes — 0 errors |
| `npm run lint` | passes — 0 errors, 0 warnings |
| `npm run audit` | **89 checks passed, 0 failed** |
| First Load JS | 103 kB shared, 162 kB on `/` |

Issues found during validation and fixed:

- Horizontal overflow at 320–1024px: decorative glows escaped the viewport because
  `overflow-x: clip` was set on `<body>` but not `<html>`.
- Anchored sections landed 184px down the viewport — `scroll-padding-top` on `<html>`
  was stacking with `scroll-mt-24` on each section. Now one mechanism, 96px.
- The navbar lives in the layout and survives client-side navigation, so its
  active-section observer never re-ran on route change: case-study pages showed
  "Home" highlighted. Now keyed on `usePathname()`.
- Nav anchors were `#about`-style and did nothing from a case-study route. Now
  root-relative (`/#about`), which stays a smooth same-document scroll on the home page.
- `lucide-react` v1 removed all brand icons, so `Github`/`Linkedin` do not exist.
  Replaced with inline SVG marks in `src/components/ui/BrandIcons.tsx`.
- The oversized "CONTACT" backdrop word was bright enough to compete with the
  location line sitting over it; dropped to `burgundy-950/70`.
- The mockup disclosure caption was 10px; raised to 11px.

Known, deliberate:

- The `metadataBase` build warning is expected until `NEXT_PUBLIC_SITE_URL` is set
  (or the site is deployed to Vercel, where the project URL is picked up automatically).
- `npm audit` reports advisories in dev-only build tooling (`postcss`, and
  `fast-glob`/`micromatch`/`braces` via `eslint-config-next`). Nothing ships to the
  browser. Next.js itself was bumped to 15.5.28, which clears the runtime advisories.
- Text inside the project mockups renders at 8–10px. It is simulated interface
  chrome inside an `aria-hidden` region of a described `role="img"` — the equivalent
  of small text inside a screenshot — not body copy.

## Still to supply

- **A production domain.** Set `NEXT_PUBLIC_SITE_URL` to switch on the canonical tag,
  absolute Open Graph URLs and the sitemap origin.
- **Verified project links.** No live URLs or public repositories were available, so
  no project renders a "Visit live project" or "View source" action. Add `liveUrl` /
  `repoUrl` to any entry in `src/data/projects.ts` and the buttons appear automatically.
- **Real screenshots**, if any can be shared without exposing client data — they would
  replace the illustrative mockups in `src/components/ProjectMockup.tsx`.
