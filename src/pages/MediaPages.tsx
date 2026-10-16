import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Headphones, Music2, Play, Youtube } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { MediaReveal } from '@/components/ui/MediaReveal';
import { PlayBadge, WatchLink } from '@/components/teaching/TeachingSections';
import { IrensAlbum } from '@/components/media/IrensAlbum';
import { PhotoViewer } from '@/components/media/PhotoViewer';
import {
  BOOK_STORE_URL,
  books,
  filmChannels,
  films,
  galleryPhotos,
  musicProfiles,
  musicVideos,
  podcast,
  youtubeThumb,
  youtubeWatch,
  mediaSections,
  messages,
  type Book,
  type GalleryCategory,
} from '@/data/media';
import { cn } from '@/lib/cn';

const SECTION_IMAGES: Record<string, string> = {
  '/media/gallery': '/images/photos/stage-full-congregation.webp',
  '/media/the-irens': '/images/irens/irens-13.webp',
  '/media/books': '/images/photos/studio-podcast-desk.webp',
  '/media/films': 'https://i.ytimg.com/vi/RHHZdMU9-m0/maxresdefault.jpg',
  '/media/music': '/images/music/spirituals.webp',
  '/media/podcast': '/images/podcast/endless-life.webp',
};

/* ── Shared pieces ─────────────────────────────────────────────────────── */

function MediaHero({ title, accent, intro }: { title: string; accent?: string; intro: string }) {
  return (
    <section className="pt-32 pb-10 lg:pt-44 lg:pb-14">
      <div className="container-wide">
        <Reveal variant="left">
          <div className="mb-6 flex items-center gap-4">
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand" />
            <span className="text-eyebrow uppercase tracking-[0.2em] text-accent">Media</span>
          </div>
          <h1 className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-cream text-balance sm:text-6xl lg:text-7xl">
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-brand">{accent}</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ash text-pretty sm:text-xl">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** A quiet row of the Media sections under each page's heading. */
function MediaSubnav() {
  return (
    <nav aria-label="Media sections" className="border-y border-line">
      <div className="container-wide">
        <ul className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto py-3">
          {mediaSections.map((section) => (
            <li key={section.path} className="flex-shrink-0">
              <NavLink
                to={section.path}
                end
                className={({ isActive }) =>
                  cn(
                    'block rounded-pill px-4 py-2 text-sm transition-colors duration-300',
                    isActive ? 'bg-surface text-cream' : 'text-ash hover:text-cream'
                  )
                }
              >
                {section.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** The page's one navy chapter: the other Media sections. */
function MoreFromMedia({ current }: { current: string }) {
  const others = mediaSections.filter((s) => s.path !== current && s.path !== '/media');
  return (
    <section className="bg-navy py-14 md:py-16 lg:py-24">
      <div className="container-wide">
        <Reveal variant="left" className="mb-10">
          <DisplayHeading eyebrow="Keep exploring" title="More from" accent="Media." tone="light" />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((section, index) => (
            <Reveal key={section.path} variant="right" delay={index * 100}>
              <Link
                to={section.path}
                className="group flex h-full min-h-[10rem] flex-col justify-between rounded-soft border-t-2 border-brand bg-navy-2 p-6 transition-colors duration-300 hover:bg-[#062b3e]"
              >
                <ArrowUpRight className="h-5 w-5 self-end text-mist transition-colors duration-300 group-hover:text-accent" />
                <div>
                  <h3 className="font-display text-xl text-cream">{section.label}</h3>
                  <p className="mt-1 text-sm text-mist">{section.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * A book's cover, standing on its shelf line: every cover keeps its own shape, bottoms aligned.
 * The cover is placed absolutely so its max height resolves against the frame in every browser
 * (Safari ignores percentage heights on a flex child inside an aspect-ratio box).
 */
function BookCover({ book, className }: { book: Book; onNavy?: boolean; className?: string }) {
  return (
    <div className={cn('relative aspect-[4/5]', className)}>
      <img
        src={book.cover}
        alt={`${book.title} by Emmanuel Iren, cover`}
        loading="lazy"
        className="absolute bottom-0 left-1/2 max-h-full max-w-full -translate-x-1/2 rounded-[3px] object-contain shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      />
    </div>
  );
}

/* ── Overview ──────────────────────────────────────────────────────────── */

export function MediaOverviewPage() {
  const latest = messages[0];
  const sections = mediaSections.filter((s) => s.path !== '/media');

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="The message,"
        accent="in every form."
        intro="Sermons, films, music, books and family moments — the same message of Christ, made to reach people wherever they are."
      />
      <MediaSubnav />

      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-8">
            <DisplayHeading number="01" eyebrow="Latest message" title="Start" accent="here." />
          </Reveal>
          <article className="grid grid-cols-1 gap-8 border-t-2 border-brand pt-8 lg:grid-cols-12 lg:gap-12">
            <WatchLink message={latest} className="group block lg:col-span-7">
              <MediaReveal frameClassName="aspect-[16/10] rounded-soft bg-surface">
                <img
                  src={latest.image}
                  alt={latest.title}
                  className="media-reveal-img h-full w-full object-cover"
                  style={{ objectPosition: latest.imagePosition }}
                />
                <PlayBadge />
              </MediaReveal>
            </WatchLink>
            <Reveal variant="right" delay={150} className="flex flex-col justify-center lg:col-span-5">
              <p className="text-eyebrow uppercase tracking-[0.16em] text-accent">
                {latest.series} · {latest.date}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-cream lg:text-4xl">{latest.title}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-ash">{latest.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WatchLink message={latest} className="block w-full sm:w-auto">
                  <Button variant="brand" size="lg" withArrow className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                    Watch on YouTube
                  </Button>
                </WatchLink>
                <Link to="/teaching#latest" className="block w-full sm:w-auto">
                  <Button variant="quiet" size="lg" className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                    All messages
                  </Button>
                </Link>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="02" eyebrow="In Media" title="Every way" accent="in." />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {sections.map((section, index) => (
              <Reveal key={section.path} variant="right" delay={(index % 4) * 120}>
                <Link to={section.path} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-soft bg-surface">
                    <img
                      src={SECTION_IMAGES[section.path]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                      style={{ objectPosition: 'center 25%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <span className="absolute left-3.5 top-3 font-display text-lg text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:left-5 sm:top-4 sm:text-2xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute inset-x-3.5 bottom-3.5 sm:inset-x-5 sm:bottom-5">
                      <h3 className="font-display text-lg leading-tight text-cream sm:text-2xl">{section.label}</h3>
                      <p className="mt-1 hidden text-sm text-cream/75 sm:block">{section.blurb}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Navy chapter: the books */}
      <section className="bg-navy py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal variant="left">
              <DisplayHeading number="03" eyebrow="The Books" title="The word," accent="on the page." tone="light" />
            </Reveal>
            <Reveal variant="right" delay={150}>
              <Link to="/media/books">
                <TextLink tone="light">All six books</TextLink>
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {books.slice(0, 4).map((book, index) => (
              <Reveal key={book.title} variant="right" delay={index * 120}>
                <Link to="/media/books" className="group block">
                  <BookCover
                    book={book}
                    onNavy
                    className="transition-transform duration-500 group-hover:-translate-y-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Gallery ───────────────────────────────────────────────────────────── */

const GALLERY_FILTERS: ('All' | GalleryCategory)[] = ['All', 'On stage', 'Portraits', 'Studio'];

export function GalleryPage() {
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photos = filter === 'All' ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Gallery."
        accent="In pictures."
        intro="Photographs from the pulpit, the studio and the quieter moments in between."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter photographs">
            {GALLERY_FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
                className={cn(
                  'rounded-pill border px-4 py-2 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  filter === name
                    ? 'border-brand bg-brand text-cream'
                    : 'border-line text-ash hover:border-cream/40 hover:text-cream'
                )}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photograph: ${photo.alt}`}
                className="group relative mb-3 block w-full overflow-hidden rounded-soft bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mb-4 [break-inside:avoid]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-left text-eyebrow uppercase tracking-[0.16em] text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {photo.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <PhotoViewer photos={photos} index={openIndex} onChange={setOpenIndex} />

      <MoreFromMedia current="/media/gallery" />
    </div>
  );
}

/* ── The Irens ─────────────────────────────────────────────────────────── */

export function IrensPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="The Irens."
        accent="A home before a platform."
        intro="Emmanuel and Laju Iren, and the family that sits quietly beneath the public work."
      />
      <MediaSubnav />
      <section className="pt-14 md:pt-16 lg:pt-24">
        <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="left">
              <DisplayHeading
                number="01"
                eyebrow="Family"
                title="Emmanuel"
                accent="& Laju Iren."
                size="sm"
                className="mb-6"
              />
            </Reveal>
            <div className="space-y-5 leading-relaxed text-ash">
              <Reveal variant="left" delay={150} as="p">
                Emmanuel Iren married Laju Iren (née Arenyeka) in November 2014. Together they are parents to three
                daughters and one son.
              </Reveal>
              <Reveal variant="left" delay={300} as="p">
                The family remains a quiet foundation beneath the public work — a reminder that the ministry, for all
                its reach, is carried by a man who is also a husband and a father.
              </Reveal>
            </div>
          </div>
          <Reveal
            variant="right"
            delay={450}
            className="grid grid-cols-3 self-end border-t border-line pt-6 lg:col-span-5 lg:col-start-8"
          >
            {[
              ['2014', 'Married'],
              ['4', 'Children'],
              ['1', 'Home, first'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-3xl text-brand">{value}</p>
                <p className="mt-1 text-eyebrow uppercase tracking-[0.16em] text-ash">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <IrensAlbum />
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-7">
            <DisplayHeading number="02" eyebrow="On love & family" title="Love, as" accent="God designed it." />
            <p className="mt-5 max-w-xl leading-relaxed text-ash">
              Much of what Emmanuel Iren teaches on friendship, courtship and marriage is gathered in LoveCode — written
              for relationships built to last.
            </p>
            <Link to="/media/books" className="mt-8 inline-block">
              <TextLink>See the books</TextLink>
            </Link>
          </Reveal>
          <Reveal variant="right" delay={150} className="lg:col-span-4 lg:col-start-9">
            <BookCover book={books.find((b) => b.title === 'LoveCode') ?? books[0]} className="mx-auto max-w-[16rem]" />
          </Reveal>
        </div>
      </section>
      <MoreFromMedia current="/media/the-irens" />
    </div>
  );
}

/* ── Films ─────────────────────────────────────────────────────────────── */

/** An outbound link styled like the site's text links, with the arrow that marks a new tab. */
function OutLink({
  href,
  children,
  tone = 'accent',
}: {
  href: string;
  children: ReactNode;
  tone?: 'accent' | 'light';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        tone === 'accent' ? 'text-cream hover:text-accent' : 'text-cream hover:text-mist'
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function FilmsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Films."
        accent="Stories on screen."
        intro="Films Emmanuel Iren has produced — stories about marriage, love, family and healing, made for the cinema and for YouTube."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="01" eyebrow="His films" title="Watch" accent="the films." />
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2">
            {films.map((film, index) => (
              <Reveal key={film.title} variant={index % 2 ? 'right' : 'left'} delay={(index % 2) * 120}>
                <a
                  href={youtubeWatch(film.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative aspect-video overflow-hidden rounded-soft bg-surface">
                    <img
                      src={youtubeThumb(film.videoId, film.hiRes)}
                      alt={`${film.title}, still`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-pill bg-cream px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-cream">
                      <Play className="h-4 w-4" fill="currentColor" />
                      {film.watchLabel}
                    </span>
                  </div>
                  <p className="mt-6 text-eyebrow uppercase tracking-[0.16em] text-accent">
                    {film.year}
                    {film.year && ' · '}
                    {film.role}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-cream transition-colors duration-300 group-hover:text-accent">
                    {film.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ash">{film.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="02" eyebrow="Where to watch" title="Find" accent="his media." />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filmChannels.map((channel, index) => (
              <Reveal key={channel.name} variant="right" delay={index * 120}>
                <div className="flex h-full flex-col justify-between gap-8 rounded-soft border-t-2 border-brand bg-ink p-7">
                  <div>
                    <Youtube className="h-6 w-6 text-accent" strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-2xl text-cream">{channel.name}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ash">{channel.description}</p>
                  </div>
                  <OutLink href={channel.url}>Visit the YouTube channel</OutLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/films" />
    </div>
  );
}

/* ── Music ─────────────────────────────────────────────────────────────── */

export function MusicPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Music."
        accent="Songs of worship."
        intro="Albums, singles and live recordings — from Kerygma to Apostolos and Spirituals — carrying the same message in song."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="01" eyebrow="Listen" title="Stream" accent="the music." />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {musicProfiles.map((profile, index) => (
              <Reveal key={profile.name} variant={index ? 'right' : 'left'} delay={index * 120}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-4 rounded-soft bg-ink-2 p-4 transition-colors duration-300 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:gap-6 sm:p-6"
                >
                  <img
                    src={profile.art}
                    alt={profile.artAlt}
                    loading="lazy"
                    className="aspect-square w-28 flex-shrink-0 rounded-[3px] object-cover shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] sm:w-40"
                  />
                  <div>
                    <p className="flex items-center gap-2 text-eyebrow uppercase tracking-[0.16em] text-accent">
                      <Music2 className="h-4 w-4" /> {profile.name}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash sm:mt-3 sm:text-base">
                      {profile.description}
                    </p>
                    <span className="mt-3 inline-flex sm:mt-5 items-center gap-1.5 text-sm font-medium text-cream transition-colors duration-300 group-hover:text-accent">
                      {profile.action} <ArrowUpRight className="h-4 w-4 text-accent" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="02" eyebrow="Official videos" title="Watch" accent="the songs." />
          </Reveal>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
            {musicVideos.map((video, index) => (
              <Reveal key={video.id} variant="up" delay={(index % 4) * 80}>
                <a
                  href={youtubeWatch(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative aspect-video overflow-hidden rounded-md bg-surface">
                    <img
                      src={youtubeThumb(video.id, video.hiRes)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base leading-snug text-cream transition-colors duration-300 group-hover:text-accent sm:mt-3 sm:text-lg">
                    {video.title}
                  </h3>
                  {video.featuring && <p className="mt-0.5 text-xs text-ash sm:text-sm">feat. {video.featuring}</p>}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/music" />
    </div>
  );
}

/* ── Podcast ───────────────────────────────────────────────────────────── */

export function PodcastPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Podcast."
        accent="Listen anywhere."
        intro="Sermons and Bible teaching from Apostle Emmanuel Iren, on the go — on Apple Podcasts and Spotify."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <MediaReveal className="lg:col-span-5" frameClassName="aspect-square max-w-md rounded-soft bg-surface">
              <img
                src={podcast.art}
                alt={`${podcast.name} cover`}
                className="media-reveal-img h-full w-full object-cover"
              />
            </MediaReveal>
            <div className="lg:col-span-7">
              <Reveal variant="right">
                <span className="inline-flex items-center gap-2 rounded-pill border border-brand/60 px-3 py-1 text-eyebrow uppercase tracking-[0.16em] text-accent">
                  <Headphones className="h-3.5 w-3.5" /> {podcast.tag}
                </span>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-cream text-balance sm:text-5xl">
                  {podcast.name}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">{podcast.description}</p>
              </Reveal>
              <Reveal variant="right" delay={150} className="mt-8 flex flex-col gap-3 sm:flex-row">
                {podcast.links.map((link, index) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full sm:w-auto"
                  >
                    <Button
                      variant={index ? 'secondary' : 'brand'}
                      size="lg"
                      withArrow={!index}
                      className="h-14 w-full rounded-pill sm:h-auto sm:w-auto"
                    >
                      {link.label}
                    </Button>
                  </a>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/podcast" />
    </div>
  );
}

/* ── The Books ─────────────────────────────────────────────────────────── */

export function BooksPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="The Books."
        accent="Faith, made practical."
        intro="Six books by Emmanuel Iren on leadership, purpose, grace, love, discernment and prayer — each written to make the life of faith clear and livable."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-16">
            {books.map((book, index) => (
              <Reveal key={book.title} variant="up" delay={(index % 3) * 120}>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <BookCover
                    book={book}
                    className="w-full max-w-[20rem] transition-transform duration-500 ease-out-quart group-hover:-translate-y-1.5"
                  />
                  <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.16em] text-accent sm:mt-6 sm:text-eyebrow">
                    {book.theme}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-tight text-cream transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {book.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 max-w-sm text-sm leading-relaxed text-ash sm:line-clamp-none">
                    {book.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-cream">
                    Get the book{' '}
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal
            variant="left"
            className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-lg text-ash">
              All six books are in the online store. For bulk orders for churches and groups, or interviews about the
              books, get in touch.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={BOOK_STORE_URL} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto">
                <Button variant="brand" size="lg" withArrow className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                  Visit the store
                </Button>
              </a>
              <Link to="/contact" className="block w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                  Bulk orders
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <MoreFromMedia current="/media/books" />
    </div>
  );
}
