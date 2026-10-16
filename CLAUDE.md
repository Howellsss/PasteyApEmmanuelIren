# Notes for AI assistants working on this repository

The owner is not a developer and will hand this repository to an engineering team. Keep it in a state a senior
engineer would be glad to inherit. Read [README.md](README.md), [CONTRIBUTING.md](CONTRIBUTING.md) and
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before changing code.

## Every change

- Follow [CONTRIBUTING.md](CONTRIBUTING.md): conventions, folders, naming, commit messages.
- Run `npm run check` and fix everything before committing. Run `npm run format` rather than hand-formatting.
- Check visual changes at 360, 390 and 414 px wide as well as desktop, with no sideways scrolling. Layout that
  depends on percentage heights must also work in iPhone Safari.
- Keep the docs true. Update [docs/CONTENT.md](docs/CONTENT.md) when content moves or a placeholder is filled, the
  README when structure or scripts change, and add a [CHANGELOG.md](CHANGELOG.md) line for anything visible.
- Don't leave debris: no unused components, images, dependencies or scratch files. Name images descriptively in
  kebab-case WebP under the right `public/images/` folder.

## Getting work to `master`

The owner expects `master` to always hold the latest site (it is what they download and what production builds
from). After each change, once checks pass:

1. Commit on the working branch and push.
2. Open a pull request into `master` with a clear description.
3. Wait for CI and the Vercel preview to pass, then merge it.

Never force-push or rewrite history on `master`.
