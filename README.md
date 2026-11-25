# Yapply website prototype

Live site: https://jacque-yu.github.io/yapply-site/

A clickable prototype of the Yapply marketing site, built from the SEO / GEO sitemap plan:

- **Top nav:** Features (How it works + 5 feature pages), Resources, Mobile App, Pricing, Join now
- **Footer:** Features, Tools, Opportunities, Resources, Company
- **Programmatic templates:** job category pages (`#jobs-[role]-new-grad-in-[city]`), H-1B pages, company pages (+ new grad / internships / interview tabs), job detail, glossary, resume synonyms and skills pages
- **Core feature:** AI Resume Builder by voice — the resume is written live while you talk (see `#feature-ai-resume-builder`)
- **Discover companies:** 20 most-searched employers, with company pages (overview, hiring calendar, interviews, jobs, data slots for H-1B/benefits/funding/news)
- **Guides timeline, A–Z glossary (64 terms), creator and affiliate programs, draft Privacy Policy and Terms (HOLOGROW INC)**
- **Working tools:** ATS resume checker, resume synonyms, resume skills, cover letter generator, elevator pitch generator, H-1B sponsor checker
- **Every page shows its planned production URL** in the top bar. See `#sitemap` for the full list of pages.

Company profiles are real public facts compiled Nov 2026 (verify before launch). Job listings, salaries and sponsorship labels are examples, not real postings. Legal pages are drafts for legal review.

## Structure

`index.html` is the built single-file site (served by GitHub Pages). Source lives in `src/`:
`styles.css`, `companies.js`, `data.js`, `features.js`, `guides.js`, `glossary.js`, `legal.js`, `core.js` (router, nav, footer), `company-pages.js`, `pages-*.js`. Rebuild with `python3 build.py`.

Note: the prototype uses hash routes (`#company-juniper-cloud`) so it runs as one static file.
Production should serve real paths (e.g. `/companies/juniper-cloud`) with server-side rendering for SEO.
