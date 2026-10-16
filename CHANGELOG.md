# Changelog

Notable changes to the website, newest first. Dates are when the change reached `master`.
The full detail is in the git history.

## 1.0.0 — 2026-10-16

First release from this repository as a maintained project.

### Repository

- Documentation: README, architecture, content-editing and deployment guides, contributing guide, this changelog.
- Tooling: Prettier with one code style, EditorConfig, a pinned Node version (`.nvmrc`), and `npm run check`.
- CI on GitHub Actions: typecheck, lint, format check and build on every push to `master` and every pull request.
- Strict TypeScript now treats unused code as an error.
- `npm run sermons:update` regenerates the sermon list from the YouTube channel.
- Removed leftover starter-template files, 15 unused components, a stray HTML prototype, 12 unused images (about 17 MB) and the
  unused Supabase dependency.
- Images renamed descriptively and grouped by purpose under `public/images/`.
- The Media pages split into one file each under `src/pages/media/`. Page-specific sections moved out of `ui/`.

### Site

- **Phone menu**: staggered entrance, gold marker on the current page, Media as a two-column grid, contact row.
- **Phones**: book covers no longer overlap on iPhone; Books, Music videos and Media tiles two to a row.
- **Events**: heading reads "Where is Apostle Emmanuel Iren ministering?".
- **Contact**: Emmanuelirenassist@gmail.com on the Contact page, footer and phone menu. Contact and Invite forms
  open an email to it, with required fields enforced.
- **Media**: new Films, Music and Podcast pages. Reels removed (old link redirects to Media).
- **Books**: real covers, linked to the online store.
- **Homepage**: the creative cards open their pages; ministries link to their own sites.
- **Teaching**: all 187 full sermons from YouTube, with search, topic filters, sorting and "Load more".
- **The Irens**: family photo album in chapters, with a full-screen viewer.
- **About**: journey timeline with hover-to-change photos; interview photo set into The Journey; new Family section.
  The page now opens at the top.

## Earlier — September to October 2026

- Colour system: warm near-blacks, gold accent, one navy feature chapter per page, gold closing band.
- Headings set in MADE Kenfolg; logo mark in the header and as the favicon.
- Media section with a dropdown, and the first phone menu.
- Hero video self-hosted, plays with sound, mute toggle in the header.
- Scroll-in animation carried through every homepage section; Creative Expression as swipeable cards on phones.
- Initial site built on a Vite, React and TypeScript starter.
