# Editing content

Every piece of text, link and image on the site lives in this repository. This guide says where.
After any change, run `npm run check` and look at the page with `npm run dev`.

## Where things live

| Content                                                                 | File                                                                                                                    |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Latest messages (homepage slideshow, Teaching "Watch the latest")       | `src/data/media.ts` → `messages`                                                                                        |
| All sermons on the Teaching page                                        | `src/data/sermons.ts`, generated (see below)                                                                            |
| Books: titles, descriptions, covers, store links                        | `src/data/media.ts` → `books`, `BOOK_STORE_URL`                                                                         |
| Films and film channels                                                 | `src/data/media.ts` → `films`, `filmChannels`                                                                           |
| Music: Spotify / Apple Music profiles, music videos                     | `src/data/media.ts` → `musicProfiles`, `musicVideos`                                                                    |
| Podcast                                                                 | `src/data/media.ts` → `podcast`                                                                                         |
| Gallery photos                                                          | `src/data/media.ts` → `galleryPhotos`                                                                                   |
| The Irens album                                                         | `src/components/media/IrensAlbum.tsx` → `PHOTOS` and the rows in `IrensAlbum`                                           |
| Media menu (header dropdown, phone menu, Media pages)                   | `src/data/media.ts` → `mediaSections`                                                                                   |
| Ministry websites (Celebration Church, Manifest, Triumph30, Outburst)   | `src/data/media.ts` → `ministryLinks`                                                                                   |
| Contact email (Contact page, footer, phone menu, form recipient)        | `src/data/media.ts` → `CONTACT_EMAIL`                                                                                   |
| Events: upcoming and past                                               | `src/pages/EventsPage.tsx` → `upcomingEvents`, `pastEvents`; the homepage Events section is in `src/pages/HomePage.tsx` |
| About: milestones timeline                                              | `src/pages/AboutPage.tsx` → `milestones`                                                                                |
| About: themes, "Beyond the pulpit", current expressions                 | `src/pages/AboutPage.tsx` → `ministryThemes`, `beyondPulpit`, `currentExpressions`                                      |
| Homepage creative cards (Books, Music, Film & Media, Podcast, Speaking) | `src/components/home/CreativeAccordion.tsx` → `cards`                                                                   |
| Homepage ministry list                                                  | `src/pages/HomePage.tsx` → `ministryExpressions`                                                                        |
| Footer links and social profiles                                        | `src/components/layout/Footer.tsx`                                                                                      |
| Page titles and descriptions (browser tab, search results)              | `src/App.tsx` → `PAGE_META`                                                                                             |
| Sharing image and default title/description                             | `index.html`, `public/og-image.jpg`                                                                                     |

## Refreshing the sermons

```bash
npm run sermons:update
```

This reads the Videos tab of [youtube.com/@pst_iren](https://www.youtube.com/@pst_iren/videos) and rewrites
`src/data/sermons.ts`. It keeps videos of 30 minutes or more and drops a short list of long videos that are not
sermons (the `EXCLUDE` list in `scripts/update-sermons.mjs`). Topic filters come from title keywords (`TAGS` in the
same file). Commit the regenerated file.

## Adding or replacing images

1. Put the file in the right folder under `public/images/` (see the README), as **WebP**. Name it in lowercase
   kebab-case, describing what it shows: `stage-red-light.webp`, `portrait-green-knit-seated.webp`.
2. Keep files reasonably small. About 1600 px on the long side at quality 85–90 is plenty for full-width images,
   and smaller for thumbnails.
3. Reference it by its path from `public`, e.g. `'/images/photos/stage-red-light.webp'`.
4. Give it real `alt` text describing the picture.

## Placeholders still to replace

These are on the live site and need real details:

- **Contact phone**: `+234 800 000 0000` in `src/pages/ContactPage.tsx`.
- **Events**: "Triumph30 — Lagos, 18 Oct 2026, Eko Hotels" in `src/pages/EventsPage.tsx` and the homepage Events section.
- **Homepage "More teachings"**: two sample entries in `src/pages/HomePage.tsx` → `moreTeachings`.
- **Teaching page series and study notes**: descriptive entries in `src/data/media.ts` → `archiveSeries` and
  `src/components/teaching/TeachingSections.tsx`. They have no links yet.
- **Book links**: every book currently opens the store's front page (`BOOK_STORE_URL`). To link each book to its own
  store page, set that book's `url` in `books`.
