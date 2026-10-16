#!/usr/bin/env node
/**
 * Rebuilds src/data/sermons.ts from the Videos tab of youtube.com/@pst_iren.
 *
 *   npm run sermons:update
 *
 * Keeps full messages only: anything under 30 minutes (clips, songs, trailers, short Q&As) is dropped,
 * as are the longer videos listed in EXCLUDE that are not sermons. YouTube gives upload dates only as
 * "3 weeks ago", so `published` is worked out from today's date and is approximate.
 *
 * This reads YouTube's public page data, not an official API. If YouTube changes its page format the
 * script stops with a clear error and the existing sermons.ts is left untouched.
 */
import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const CHANNEL_URL = 'https://www.youtube.com/@pst_iren/videos';
const OUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/sermons.ts');
const MIN_SECONDS = 30 * 60;

/** Longer videos on the channel that are not sermons (matched case-insensitively on the title). */
const EXCLUDE = [
  'PIE AND PL PANEL',
  'Q&A with APOSTLE EMMANUEL IREN',
  'PROPHETIC WORSHIP SESSION',
  'TODD DULANEY',
  'A BILLION SOULS',
  'WEAR IT LIKE EMMANUEL IREN',
];

/** Topic filters on the Teaching page, matched against the upper-cased title. */
const TAGS = {
  Conferences:
    /CONFERENCE|CONF\.|WOFBEC|REBOOT CAMP|DEEPER |OVERTURE|IMC 20|FESTIVAL|TARRY|ACCELERATE|APOSTOLIC VISIT|SPECIAL (SUNDAY|THANKSGIVING) SERVICE/,
  Marriage:
    /MARRIAGE|MARRIED|LOVE|SPOUSE|PARTNER|PHILOPHOBIA|GENDER ROLES|CONFLICT TO CONNECTION|MICHAEL ANGELO|HALO|LEAVE AND CLEAVE|FAMILY ALTAR/,
  Faith:
    /FAITH|PRAY|SPIRIT|ANGEL|WORSHIP|PRAISE|ALTAR|REVIVAL|MIRACLE|ZOE|GRACE|POWER|BLOOD|SCRIPTURE|BIBLE|WORD|HERMENEUTICS|EPHESIANS|JESUS|GOD|HOLY|FIRE|OCTANE/,
  Purpose:
    /PURPOSE|MIND|IMAGINATION|WORK|WEALTH|MONEY|RICHES|GIVING|MAMMON|BROKE|AMBITION|TERRITOR|CREATIVITY|LEGACY|HACK|SOFT SKIL|DILIGENCE|BLESSING|COMPASS|TRAUMA|SEASONS|CULTURE/,
};

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};

function fail(message) {
  console.error(`\n✖ ${message}\n  src/data/sermons.ts was not changed.\n`);
  process.exit(1);
}

/** Every lockupViewModel (one per video) and the continuation token for the next page. */
function collect(node, videos, tokens) {
  if (Array.isArray(node)) {
    node.forEach((child) => collect(child, videos, tokens));
  } else if (node && typeof node === 'object') {
    if (node.lockupViewModel) videos.push(node.lockupViewModel);
    const token = node.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
    if (token) tokens.push(token);
    Object.values(node).forEach((child) => collect(child, videos, tokens));
  }
}

function toVideo(lockup) {
  const meta = lockup.metadata?.lockupMetadataViewModel;
  const parts = (meta?.metadata?.contentMetadataViewModel?.metadataRows ?? []).flatMap((row) =>
    (row.metadataParts ?? []).map((part) => part.text?.content ?? '')
  );
  let duration = '';
  for (const overlay of lockup.contentImage?.thumbnailViewModel?.overlays ?? []) {
    for (const badge of overlay.thumbnailBottomOverlayViewModel?.badges ?? []) {
      duration = badge.thumbnailBadgeViewModel?.text ?? duration;
    }
  }
  return { id: lockup.contentId, title: meta?.title?.content ?? '', duration, meta: parts };
}

const seconds = (duration) => duration.split(':').reduce((total, part) => total * 60 + Number(part), 0);

function publishedFromAgo(ago, today) {
  const match = /(\d+)\s*(d|day|w|week|mo|month|y|year)/.exec(ago.replace('ago', '').trim());
  if (!match) return today.toISOString().slice(0, 10);
  const days = Number(match[1]) * { d: 1, day: 1, w: 7, week: 7, mo: 30, month: 30, y: 365, year: 365 }[match[2]];
  return new Date(today.getTime() - days * 86_400_000).toISOString().slice(0, 10);
}

function viewsFrom(parts) {
  for (const part of parts) {
    const match = /^([\d.]+)\s*([KM]?)(\s*views)?$/.exec(part.trim());
    if (match) return Math.round(Number(match[1]) * { '': 1, K: 1e3, M: 1e6 }[match[2]]);
  }
  return 0;
}

async function main() {
  console.log(`Reading ${CHANNEL_URL} …`);
  const html = await (await fetch(CHANNEL_URL, { headers: HEADERS })).text();
  const apiKey = /"INNERTUBE_API_KEY":"([^"]+)"/.exec(html)?.[1];
  const clientVersion = /"INNERTUBE_CLIENT_VERSION":"([^"]+)"/.exec(html)?.[1];
  const initial = /var ytInitialData = (\{.*?\});<\/script>/s.exec(html)?.[1];
  if (!apiKey || !clientVersion || !initial)
    fail('Could not read the channel page; YouTube may have changed its format.');

  const lockups = [];
  let tokens = [];
  collect(JSON.parse(initial), lockups, tokens);
  const seen = new Set();
  while (tokens.length && !seen.has(tokens[0])) {
    const token = tokens[0];
    seen.add(token);
    const response = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`, {
      method: 'POST',
      headers: { ...HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        context: { client: { clientName: 'WEB', clientVersion, hl: 'en', gl: 'US' } },
        continuation: token,
      }),
    });
    tokens = [];
    collect(await response.json(), lockups, tokens);
    process.stdout.write(`\r  ${lockups.length} videos read`);
  }
  console.log();
  if (lockups.length < 50) fail(`Only ${lockups.length} videos were found; expected far more.`);

  const today = new Date();
  const sermons = lockups
    .map(toVideo)
    .filter((video) => /^\d+(:\d+)+$/.test(video.duration) && seconds(video.duration) >= MIN_SECONDS)
    .filter((video) => !EXCLUDE.some((word) => video.title.toLowerCase().includes(word.toLowerCase())))
    .map((video) => {
      const title = video.title.replace(/\s{2,}/g, ' ').trim();
      return {
        id: video.id,
        title,
        duration: video.duration,
        published: publishedFromAgo(video.meta.at(-1) ?? '', today),
        views: viewsFrom(video.meta.slice(0, -1)),
        tags: Object.entries(TAGS)
          .filter(([, pattern]) => pattern.test(title.toUpperCase()))
          .map(([tag]) => tag),
      };
    });

  const lines = [
    '/**',
    " * Full messages from youtube.com/@pst_iren, newest first, as listed on the channel's Videos tab.",
    ' * Generated by `npm run sermons:update` (scripts/update-sermons.mjs) — do not edit by hand.',
    ' * Clips, songs, Q&As and other videos under 30 minutes are left out. `published` is approximate',
    ' * (from YouTube\'s "x ago"); `views` is the count when the list was taken.',
    ' */',
    "export type SermonTag = 'Conferences' | 'Marriage' | 'Faith' | 'Purpose';",
    '',
    'export interface Sermon {',
    '  id: string;',
    '  title: string;',
    '  duration: string;',
    '  published: string;',
    '  views: number;',
    '  tags: SermonTag[];',
    '}',
    '',
    'export const sermons: Sermon[] = [',
    ...sermons.map(
      (s) =>
        `  { id: ${JSON.stringify(s.id)}, title: ${JSON.stringify(s.title)}, duration: ${JSON.stringify(s.duration)}, published: ${JSON.stringify(s.published)}, views: ${s.views}, tags: [${s.tags.map((t) => `'${t}'`).join(', ')}] },`
    ),
    '];',
    '',
  ];
  writeFileSync(OUT_FILE, lines.join('\n'));
  spawnSync('npx', ['prettier', '--write', OUT_FILE], { stdio: 'ignore' });
  console.log(`✔ Wrote ${sermons.length} sermons to src/data/sermons.ts (from ${lockups.length} videos).`);
}

main().catch((error) => fail(error.message));
