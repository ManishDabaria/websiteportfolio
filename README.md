# Manish Dabaria — Portfolio

A premium, dark-first developer portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Edit your content — one file

Everything personal lives in **`src/config/site.js`**:

| What | Key |
| --- | --- |
| Name, role, location, availability, profile photo | `personal` |
| GitHub / LinkedIn / email | `socials` ← **replace the placeholders** |
| About text & stats | `about` |
| Skill groups (icons keyed in `src/components/ui/TechIcon.jsx`) | `skillGroups` |
| Experience timeline | `experience` |
| Projects (add `github`, `demo`, optional `image`) | `projects` |
| Education | `education` |
| Achievements, certifications, hackathons | `achievements` (`type`: community · activity · certification · hackathon · learning · opensource) |
| Currently exploring | `exploring` |
| Contact-form delivery | `contactForm` |

- **Profile photo:** put `profile.jpg` in `public/` and set `personal.profileImage: '/profile.jpg'`.
- **Project screenshots:** put images in `public/projects/` and set `image: '/projects/name.webp'`. Without one, a built-in illustrated mockup is shown.
- **Resume:** replace `public/resume.pdf` (a generated placeholder from `scripts/resume.html`).
- **Domain / SEO:** search-and-replace `manishdabaria.vercel.app` in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `personal.siteUrl`. The social share image is `public/og-image.png` (source: `scripts/og.html`).

## Contact form

Default provider is `'api'` → the Vercel function in `api/contact.js`, which emails you via [Resend](https://resend.com).
In Vercel → Project → Settings → Environment Variables add:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@yourmail.com
```

No backend? Set `contactForm.provider` to `'web3forms'` (+ `web3formsKey`) or `'formspree'` (+ `formspreeEndpoint`).
If sending ever fails, the form offers a pre-filled `mailto:` fallback. Includes client + server validation and a honeypot.

## Deploy to Vercel

Push to GitHub → import the repo in Vercel (framework: Vite). `vercel.json` handles SPA routing (so `/projects/:slug` and the custom 404 work) and long-term asset caching.

## Features

- Dark (default) / light theme, persisted; `?theme=light` forces light
- Sticky nav with active-section pill, mobile menu, **Ctrl/⌘ + K command palette**
- Scroll-triggered reveals, cursor-following spotlight cards, 3D tilt hero, animated counters, scroll-linked timeline
- Project detail pages at `/projects/:slug`, custom 404
- SEO: meta, Open Graph, Twitter card, JSON-LD, sitemap, robots
- Accessibility: semantic landmarks, skip link, focus styles, keyboard-navigable menus, `prefers-reduced-motion` respected

## Structure

```
src/
  config/site.js          ← all content
  components/layout/      Navbar, Footer, CommandPalette, ThemeToggle, Background, Logo
  components/sections/    Hero, About, Skills, Experience, Projects, Education, Achievements, Exploring, Contact
  components/ui/          Button, Reveal, Section, SectionHeading, SpotlightCard, Tag, TechIcon, ProjectMockup, ...
  hooks/                  useTheme, useActiveSection, useScrollTo, useSpotlight
  lib/contact.js          validation + form delivery
  pages/                  Home, ProjectDetail, NotFound
api/contact.js            Vercel serverless email function
```
