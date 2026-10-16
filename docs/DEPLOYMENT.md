# Deployment

The site is hosted on **Vercel**, connected to this GitHub repository.

## How it works

- **Production** builds from `master`.
- **Previews:** every other branch and every pull request gets its own preview URL, posted on the pull request by
  the Vercel bot. Check it before merging.
- Vercel runs `npm install` and `npm run build`, and serves `dist/`.
- `vercel.json` rewrites every path to `index.html`, so deep links such as `/media/books` work on refresh.

No environment variables or secrets are needed.

## Releasing a change

1. Work on a branch and open a pull request into `master`.
2. Wait for **CI** (GitHub Actions: typecheck, lint, format, build) and the **Vercel preview** to pass.
3. Review the preview on desktop and on a phone. Test iPhone Safari for layout changes.
4. Merge. Vercel deploys `master` to production automatically.
5. Add a line to [CHANGELOG.md](../CHANGELOG.md).

If production in the Vercel project is set to promote manually instead, promote the latest `master` deployment from
the Vercel dashboard after merging.

## Rolling back

In Vercel, open **Deployments**, choose the last good production deployment and click **Promote** (or
**Instant Rollback**). Then revert the bad commit on `master` with `git revert`, so the repository matches what is live.

## Running a production build locally

```bash
npm run build
npm run preview   # http://localhost:4173
```
