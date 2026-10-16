# Contributing

## Workflow

1. Branch from `master`: `feature/short-description`, `fix/short-description` or `chore/short-description`.
2. Make the change. Keep each commit to one purpose.
3. Run `npm run check` (typecheck, lint, format check and build). Fix anything it reports.
4. Open a pull request into `master`. Describe what changed and why, and include phone and desktop screenshots for
   anything visual.
5. CI and the Vercel preview must pass. Merging deploys to production (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)).
6. Add a line to [CHANGELOG.md](CHANGELOG.md) for anything a visitor would notice.

## Commit messages

Short imperative subject (about 72 characters at most), a blank line, then the why in the body:

```
fix: book covers overlap the link above them on iPhone

Safari does not resolve a percentage max-height on a flex child of an
aspect-ratio box, so covers grew past their frame. Position them
absolutely instead.
```

Prefixes in use: `feat`, `fix`, `refactor`, `chore`, `docs`, `content`.

## Code style

- **Formatting** is Prettier's job (`npm run format`); don't hand-format. Settings are in `.prettierrc.json`.
- **TypeScript** is strict, and unused variables or parameters fail the build.
- **Imports**: use the `@/` alias for anything in `src/` (`@/components/ui/Button`). Relative imports are fine
  between files in the same folder.
- **Styling**: Tailwind utilities with the design tokens from `tailwind.config.js`. No raw hex values in
  components. Put CSS that Tailwind can't express in a labelled block in `src/index.css`.
- **Components**: shared building blocks go in `components/ui/`, sections used by one page go in
  `components/<page>/`, and route components go in `pages/`.
- **Content** belongs in `src/data/` (or a clearly named array at the top of its page), not inline in markup.
  See [docs/CONTENT.md](docs/CONTENT.md).
- **Images**: WebP, kebab-case descriptive names, in the matching `public/images/` folder, always with `alt` text.
- **Motion**: every new animation must switch off under `prefers-reduced-motion: reduce`.
- **Mobile first**: check every change at 360, 390 and 414 px wide, and in iPhone Safari, with no sideways scrolling.
