import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  Search,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { sermons, type Sermon, type SermonTag } from '@/data/sermons';
import { Reveal } from '@/components/ui/Reveal';
import { ChapterMarker } from '@/components/ui/ChapterMarker';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { LatestMessages, SeriesList, StudyNotes } from '@/components/teaching/TeachingSections';

const TEACHING_IMAGE_2 = '/images/teachings/image copy.webp';
const TEACHING_IMAGE_3 = '/images/teachings/image copy 2.webp';

const PODCAST_IMG = TEACHING_IMAGE_3;
const BIBLE_IMG = TEACHING_IMAGE_2;

type Category = 'All' | 'Faith & Prayer' | 'Purpose & Living' | 'Marriage & Love' | 'Conferences';
type SortOption = 'Newest' | 'Popular' | 'Oldest';

const CATEGORIES: Category[] = ['All', 'Faith & Prayer', 'Purpose & Living', 'Marriage & Love', 'Conferences'];
const CATEGORY_TAG: Record<Exclude<Category, 'All'>, SermonTag> = {
  'Faith & Prayer': 'Faith',
  'Purpose & Living': 'Purpose',
  'Marriage & Love': 'Marriage',
  Conferences: 'Conferences',
};
const SORT_OPTIONS: SortOption[] = ['Newest', 'Popular', 'Oldest'];
// Messages shown at first, and added by each "Load more".
const PAGE_SIZE = 24;

function formatViews(views: number) {
  if (views >= 1_000_000) return `${+(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${+(views / 1_000).toFixed(views >= 10_000 ? 0 : 1)}K views`;
  return `${views} views`;
}

/** "3 days ago", "2 months ago", "1 year ago", worked out on the day the page is viewed. */
function timeAgo(published: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(published).getTime()) / 86_400_000));
  const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'} ago`;
  if (days < 1) return 'today';
  if (days < 7) return unit(days, 'day');
  if (days < 30) return unit(Math.floor(days / 7), 'week');
  if (days < 365) return unit(Math.floor(days / 30), 'month');
  return unit(Math.floor(days / 365), 'year');
}

/** One message as YouTube shows it: thumbnail with its length, then the title as written; it opens the video on YouTube. */
function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${sermon.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink rounded-md"
    >
      <div className="relative aspect-video overflow-hidden rounded-md bg-surface">
        <img
          src={`https://i.ytimg.com/vi/${sermon.id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
          {sermon.duration}
        </span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-[0.9375rem] font-semibold leading-snug text-cream transition-colors duration-300 group-hover:text-accent">
        {sermon.title}
      </h3>
      <p className="mt-1 text-sm text-ash">
        {formatViews(sermon.views)} · {timeAgo(sermon.published)}
      </p>
    </a>
  );
}

export function TeachingPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortOption, setSortOption] = useState<SortOption>('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    // The data is already newest first, as on the channel.
    const result = sermons.filter(
      (s) =>
        (activeCategory === 'All' || s.tags.includes(CATEGORY_TAG[activeCategory])) &&
        (!query || s.title.toLowerCase().includes(query))
    );
    if (sortOption === 'Oldest') return [...result].reverse();
    if (sortOption === 'Popular') return [...result].sort((a, b) => b.views - a.views);
    return result;
  }, [activeCategory, sortOption, searchQuery]);

  // A new search, filter or sort starts again from the first page.
  useEffect(() => setShown(PAGE_SIZE), [activeCategory, sortOption, searchQuery]);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="container-editorial">
          <Reveal>
            <Eyebrow className="mb-6">
              Teachings
            </Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.98] text-cream text-balance tracking-[-0.01em] mb-8">
              Teachings
            </h1>
            <p className="text-lg sm:text-xl text-ash leading-relaxed max-w-2xl font-light text-pretty">
              Explore messages, series and conversations designed to help you know
              Christ, grow in faith and live purposefully.
            </p>
          </Reveal>
        </div>
      </section>

      {/* LATEST — the recent messages, each opening on YouTube */}
      <LatestMessages number="01" />

      {/* DISCOVERY — search + filters */}
      <section id="library" className="scroll-mt-28 pb-8">
        <div className="container-editorial">
          <Reveal>
            <div className="flex flex-col gap-6">
              {/* Search bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages…"
                  className="w-full pl-11 pr-4 py-3.5 rounded-pill border border-line bg-surface text-sm text-cream placeholder:text-ash transition-all duration-300 ease-out-quart focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 hover:border-line"
                />
              </div>

              {/* Category pills + sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          'px-4 py-2 rounded-pill text-sm font-medium transition-all duration-300 ease-out-quart',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                          isActive
                            ? 'bg-ink-2 text-cream'
                            : 'bg-transparent text-ash border border-line hover:border-line hover:text-cream',
                        )}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Sort control */}
                <div className="flex items-center gap-2">
                  <span className="text-meta text-ash uppercase tracking-widest hidden sm:inline">
                    Sort
                  </span>
                  <div className="flex items-center gap-1 p-1 rounded-pill border border-line bg-surface/50">
                    {SORT_OPTIONS.map((opt) => {
                      const isActive = sortOption === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setSortOption(opt)}
                          className={cn(
                            'px-3 py-1.5 rounded-pill text-xs font-medium transition-all duration-300',
                            isActive
                              ? 'bg-cream text-ink'
                              : 'text-ash hover:text-cream',
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEDIA GRID */}
      <section className="py-12 lg:py-16">
        <div className="container-editorial">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-ash">No teachings match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-4 text-sm text-accent hover:text-accent transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9">
                {filtered.slice(0, shown).map((sermon) => (
                  <SermonCard key={sermon.id} sermon={sermon} />
                ))}
              </div>
              {shown < filtered.length && (
                <div className="mt-14 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE_SIZE)}
                    className="rounded-pill border border-line px-7 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Load more messages ({filtered.length - shown} more)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* SERIES and STUDY NOTES */}
      <SeriesList number="02" />
      <StudyNotes number="03" />

      {/* PODCAST SECTION */}
      <section className="py-20 lg:py-32 bg-ink-2 text-cream overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal variant="scale">
                <div className="relative aspect-square max-w-md overflow-hidden rounded-soft">
                  <img
                    src={PODCAST_IMG}
                    alt="Endless Life with Emmanuel Iren"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-pill border border-brand text-accent">
                        <Headphones className="w-5 h-5" />
                      </span>
                      <span className="text-meta uppercase tracking-widest text-white/60">
                        Podcast
                      </span>
                    </div>
                    <h3 className="font-display text-2xl leading-tight">
                      Endless Life
                    </h3>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <ChapterMarker number="04" label="The Podcast" />
                <h2 className="font-display leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.01em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-6">
                  Endless Life with Emmanuel Iren
                </h2>
                <p className="text-lg text-white/65 leading-relaxed mb-8 text-pretty">
                  The official Celebration Church International sermons feed. Listen
                  to full messages, short teachings, and conversations — wherever you
                  are, whenever you want.
                </p>

                <div className="space-y-3">
                  <a
                    href="https://podcasts.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-soft border border-white/15 hover:border-accent/40 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-pill bg-white/10 text-accent">
                        <Headphones className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="font-display text-base">Apple Podcasts</p>
                        <p className="text-meta text-white/50">Listen on Apple</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors duration-300" />
                  </a>
                  <a
                    href="https://spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-soft border border-white/15 hover:border-accent/40 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-pill bg-white/10 text-accent">
                        <Sparkles className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="font-display text-base">Spotify &amp; All Platforms</p>
                        <p className="text-meta text-white/50">Listen or subscribe</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors duration-300" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK / CROSSOVER */}
      <section className="py-24 lg:py-36 bg-navy">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal variant="scale">
                <div className="relative aspect-[4/3] overflow-hidden rounded-soft">
                  <img
                    src={BIBLE_IMG}
                    alt="Books and written teaching"
                    loading="lazy"
                    className="w-full h-full object-cover image-warm"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <ChapterMarker tone="light" number="05" label="Written Teaching" />
                <h2 className="font-display leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.01em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-6">
                  The word also travels through pages.
                </h2>
                <p className="text-lg text-mist leading-relaxed mb-8 text-pretty">
                  Beyond the pulpit and the podcast, Emmanuel Iren's teaching lives in
                  books — Leading Seeks You, Purposefully, Saving Grace, LoveCode, and
                  more. Each one makes the life of faith practical, clear, and lived.
                </p>
                <Link to="/about">
                  <Button variant="primary-light" size="lg" withArrow>
                    Explore Books
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
