# Apostle Emmanuel Iren — Website

The official website of Apostle Emmanuel Iren: his teaching, ministry, media, books, events and invitations.

A single-page React application, built with Vite and TypeScript, styled with Tailwind CSS and deployed on Vercel.
There is no backend: all content lives in the repository, and the site builds to static files.

## Quick start

Requires **Node.js 20 or newer** (the repository pins 22 in `.nvmrc`; run `nvm use` if you use nvm).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command                  | What it does                                                               |
| ------------------------ | -------------------------------------------------------------------------- |
| `npm run dev`            | Development server with hot reload                                         |
| `npm run build`          | Production build to `dist/`                                                |
| `npm run preview`        | Serves the production build locally                                        |
| `npm run typecheck`      | TypeScript, strict mode, unused code is an error                           |
| `npm run lint`           | ESLint                                                                     |
| `npm run format`         | Formats everything with Prettier                                           |
| `npm run format:check`   | Fails if anything is not formatted                                         |
| `npm run check`          | All of the above, in the order CI runs them; run before every pull request |
| `npm run sermons:update` | Rebuilds the sermon list from the YouTube channel (see below)              |

## Tech stack

| Area      | Choice                                                                               |
| --------- | ------------------------------------------------------------------------------------ |
| Framework | React 18, React Router 6                                                             |
| Language  | TypeScript (strict)                                                                  |
| Build     | Vite 5                                                                               |
| Styling   | Tailwind CSS 3, design tokens in `tailwind.config.js`, global CSS in `src/index.css` |
| Icons     | lucide-react                                                                         |
| Fonts     | Kenfolg (headings, self-hosted in `public/fonts/`), Inter (text, Google Fonts)       |
| Hosting   | Vercel (`vercel.json` rewrites every path to `index.html` for client routing)        |
| Quality   | ESLint, Prettier, GitHub Actions CI (`.github/workflows/ci.yml`)                     |

## Project structure

```
.
├── public/                    Static files, served as-is from the site root
│   ├── fonts/                 Kenfolg heading font
│   ├── images/
│   │   ├── books/             Book covers
│   │   ├── irens/             The Irens photo album, in display order
│   │   ├── music/             Album art
│   │   ├── photos/            General photography: portrait-*, stage-*, studio-*
│   │   ├── podcast/           Podcast art
│   │   └── teachings/         Sermon thumbnails, named after the message
│   ├── videos/                Homepage hero video (MP4 and WebM)
│   └── favicon-*, og-image…   Icons and the social sharing image
├── scripts/
│   └── update-sermons.mjs     Regenerates src/data/sermons.ts from YouTube
├── src/
│   ├── main.tsx               Entry point
│   ├── App.tsx                Routes, per-page titles and descriptions, scroll handling
│   ├── index.css              Tailwind layers, fonts, animations, a few scoped component styles
│   ├── data/                  Site content as typed data (see docs/CONTENT.md)
│   │   ├── media.ts           Messages, books, films, music, podcast, gallery, links, contact email
│   │   └── sermons.ts         All full sermons from YouTube (generated — do not edit by hand)
│   ├── pages/                 One component per route
│   │   └── media/             The Media section: one file per page
│   ├── components/
│   │   ├── layout/            FloatingNav (header and phone menu), Footer
│   │   ├── ui/                Shared building blocks: Button, Reveal, DisplayHeading, form fields…
│   │   ├── home/              Homepage-only sections
│   │   ├── about/             About-only sections
│   │   ├── media/             Media frame, photo album, photo viewer, book cover
│   │   └── teaching/          Teaching page sections
│   └── lib/                   Small utilities: class names, scroll reveal, hero sound, mailto
├── docs/                      Architecture, content editing and deployment guides
└── .github/workflows/ci.yml   Typecheck, lint, format and build on every push and pull request
```

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the app is put together, the design system, animations, and decisions worth knowing.
- [docs/CONTENT.md](docs/CONTENT.md): where every piece of content lives and how to change it.
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): Vercel set-up, previews and releasing.
- [CONTRIBUTING.md](CONTRIBUTING.md): branches, commits, code style and pull requests.
- [CHANGELOG.md](CHANGELOG.md): what has changed, release by release.

## Pages

| Path                                             | Page                                                                    |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `/`                                              | Home                                                                    |
| `/about`                                         | About: story, milestones timeline, family                               |
| `/teaching`                                      | Latest messages, every full sermon from YouTube, series, study notes    |
| `/ministry`                                      | Celebration Church, Manifest, Triumph30, Outburst                       |
| `/media`                                         | Media overview                                                          |
| `/media/gallery`                                 | Photo gallery with a full-screen viewer                                 |
| `/media/films`, `/media/music`, `/media/podcast` | Films, music and the podcast, linking out to YouTube, Spotify and Apple |
| `/media/the-irens`                               | Family photo album                                                      |
| `/media/books`                                   | Books, linking to the online store                                      |
| `/events`, `/invite`, `/contact`                 | Events, speaking invitations, contact                                   |

Old addresses (`/media/reels`, `/media/messages`, `/media/resources`, `/media/archive`) redirect to their new homes.

## Good to know

- **Forms send email, not data.** There is no server, so the Contact and Invite forms open the visitor's own email
  app with the message written out, addressed to `CONTACT_EMAIL` in `src/data/media.ts`. Swapping in a form service
  (Formspree, Resend, a Vercel function…) is a contained change in `src/lib/mailto.ts` and the two pages.
- **YouTube content is a snapshot.** Sermon titles, thumbnails and view counts are stored in `src/data/sermons.ts`.
  Run `npm run sermons:update` to refresh them; thumbnails load from YouTube at runtime.
- **The hero video plays with sound** where the browser allows it, and falls back to muted until the first tap.
  The mute button lives in the header (`src/lib/heroSound.ts`).
- **Placeholder content still to replace** is listed in [docs/CONTENT.md](docs/CONTENT.md#placeholders-still-to-replace).
