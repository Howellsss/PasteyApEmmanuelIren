import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Clock,
  Headphones,
  Search,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { ChapterMarker } from '@/components/ui/ChapterMarker';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.webp';
const ABOUT_IMAGE = '/images/about/image.webp';
const CREATIVE_IMAGE = '/images/creative/e5.webp';
const MINISTRY_IMAGE = '/images/ministry/e6.webp';
const TEACHING_IMAGE_2 = '/images/teachings/image copy.webp';
const TEACHING_IMAGE_3 = '/images/teachings/image copy 2.webp';

const PULPIT_1 = TEACHING_IMAGE_2;
const PULPIT_2 = TEACHING_IMAGE_3;
const WORSHIP_1 = TEACHING_IMAGE;
const CONGREGATION_1 = MINISTRY_IMAGE;
const PODCAST_IMG = TEACHING_IMAGE_3;
const BIBLE_IMG = TEACHING_IMAGE_2;

type Category = 'All' | 'Sermons' | 'Series' | 'Podcast' | 'Bible Teaching';
type SortOption = 'Newest' | 'Popular' | 'Oldest';

interface TeachingItem {
  id: number;
  title: string;
  category: Exclude<Category, 'All'>;
  series: string;
  date: string;
  dateValue: number;
  duration: string;
  description: string;
  image: string;
  plays: number;
}

const teachings: TeachingItem[] = [
  {
    id: 1,
    title: 'Grace That Teaches Us How to Live',
    category: 'Sermons',
    series: 'The Gospel of Grace',
    date: 'Sep 12, 2026',
    dateValue: 20260912,
    duration: '42 min',
    description:
      'A clear and practical teaching on the grace of God — not as an excuse for sin, but as the instruction for a life that honours God.',
    image: TEACHING_IMAGE,
    plays: 124000,
  },
  {
    id: 2,
    title: 'What It Means to Be Led by the Spirit',
    category: 'Sermons',
    series: 'Faith in Practice',
    date: 'Sep 05, 2026',
    dateValue: 20260905,
    duration: '34 min',
    description:
      'How does the Spirit actually guide believers? A careful walk through Romans 8 and the practical evidence of a Spirit-led life.',
    image: ABOUT_IMAGE,
    plays: 98000,
  },
  {
    id: 3,
    title: 'The Gospel of Grace — Full Series',
    category: 'Series',
    series: 'The Gospel of Grace',
    date: 'Aug 2026',
    dateValue: 20260801,
    duration: '6 parts',
    description:
      'A six-part series working through the doctrine of grace — from justification to the daily obedience it produces.',
    image: MINISTRY_IMAGE,
    plays: 310000,
  },
  {
    id: 4,
    title: 'The Creative Calling — A Conversation',
    category: 'Podcast',
    series: 'Endless Life',
    date: 'Aug 29, 2026',
    dateValue: 20260829,
    duration: '52 min',
    description:
      'A conversation about making with purpose — why excellence in creative work is a matter of faith, not preference.',
    image: CREATIVE_IMAGE,
    plays: 76000,
  },
  {
    id: 5,
    title: 'Purpose: Discovering, Developing, Deploying',
    category: 'Bible Teaching',
    series: 'Purposefully',
    date: 'Aug 22, 2026',
    dateValue: 20260822,
    duration: '46 min',
    description:
      'A teaching drawn from the book Purposefully on the three movements of a purposeful life — discovery, development, and deployment.',
    image: PULPIT_1,
    plays: 142000,
  },
  {
    id: 6,
    title: 'Faith That Works — Triumph30 Live',
    category: 'Sermons',
    series: 'Triumph30',
    date: 'Aug 15, 2026',
    dateValue: 20260815,
    duration: '38 min',
    description:
      'A live teaching during Triumph30 on the kind of faith that produces evidence — practical, enduring, and rooted in the word.',
    image: WORSHIP_1,
    plays: 89000,
  },
  {
    id: 7,
    title: '100 Days of Discipleship — Week 1',
    category: 'Series',
    series: '100 Days of Discipleship',
    date: 'Aug 10, 2026',
    dateValue: 20260810,
    duration: '5 parts',
    description:
      'The opening week of the online discipleship programme, covering the foundations of the Christian life and daily Bible study.',
    image: BIBLE_IMG,
    plays: 205000,
  },
  {
    id: 8,
    title: 'Leading Seeks You — A Teaching',
    category: 'Bible Teaching',
    series: 'Leading Seeks You',
    date: 'Aug 03, 2026',
    dateValue: 20260803,
    duration: '40 min',
    description:
      'A teaching from the book Leading Seeks You on what it means to be found by leadership — and why God seeks leaders before they seek Him.',
    image: PULPIT_2,
    plays: 67000,
  },
  {
    id: 9,
    title: 'The Grace Advantage — Session 1',
    category: 'Sermons',
    series: 'The Grace Advantage',
    date: 'Jul 27, 2026',
    dateValue: 20260727,
    duration: '48 min',
    description:
      'The opening session of a conference teaching on the advantage grace gives the believer — in suffering, in service, and in everyday decisions.',
    image: CONGREGATION_1,
    plays: 115000,
  },
  {
    id: 10,
    title: 'Endless Life — Episode 42',
    category: 'Podcast',
    series: 'Endless Life',
    date: 'Jul 20, 2026',
    dateValue: 20260720,
    duration: '36 min',
    description:
      'A short conversation on the daily devotional life — how Triumph30 builds a culture of prayer and Bible study, one day at a time.',
    image: PODCAST_IMG,
    plays: 54000,
  },
  {
    id: 11,
    title: 'Saving Grace — A Verse-by-Verse Study',
    category: 'Bible Teaching',
    series: 'Saving Grace',
    date: 'Jul 13, 2026',
    dateValue: 20260713,
    duration: '44 min',
    description:
      'A verse-by-verse study through Ephesians 2, examining the grammar of salvation by grace through faith and its practical implications.',
    image: BIBLE_IMG,
    plays: 91000,
  },
  {
    id: 12,
    title: 'Manifest 2026 — Conference Highlights',
    category: 'Series',
    series: 'Manifest',
    date: 'Jul 06, 2026',
    dateValue: 20260706,
    duration: '4 parts',
    description:
      'Highlights from the Manifest conference — a creative and worship expression drawing together artists, musicians, and teachers.',
    image: CREATIVE_IMAGE,
    plays: 178000,
  },
];

const CATEGORIES: Category[] = ['All', 'Sermons', 'Series', 'Podcast', 'Bible Teaching'];
const SORT_OPTIONS: SortOption[] = ['Newest', 'Popular', 'Oldest'];

function TeachingCard({ item, index }: { item: TeachingItem; index: number }) {
  return (
    <Reveal delay={(index % 3) * 80} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-soft aspect-[4/5] bg-surface mb-4">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-ink-2/0 group-hover:bg-surface transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-16 h-16 rounded-pill bg-cream/90 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Play className="w-6 h-6 text-ink ml-1" fill="currentColor" />
          </span>
        </div>
        <span className="absolute top-3 left-3 px-3 py-1 rounded-pill bg-ink-2/80 backdrop-blur-sm text-cream text-meta font-sans uppercase tracking-widest">
          {item.category}
        </span>
        {item.duration && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-ink-2/80 backdrop-blur-sm text-cream text-meta font-sans">
            <Clock className="w-3 h-3" />
            {item.duration}
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <p className="text-meta text-ash uppercase tracking-widest">
          {item.series} · {item.date}
        </p>
        <h3 className="font-display text-xl lg:text-2xl leading-snug text-cream group-hover:text-accent transition-colors duration-300 text-balance">
          {item.title}
        </h3>
        <p className="text-sm text-ash leading-relaxed line-clamp-2 max-w-md">
          {item.description}
        </p>
      </div>
    </Reveal>
  );
}

export function TeachingPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortOption, setSortOption] = useState<SortOption>('Newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = teachings.filter((t) => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortOption === 'Newest') {
      result = [...result].sort((a, b) => b.dateValue - a.dateValue);
    } else if (sortOption === 'Oldest') {
      result = [...result].sort((a, b) => a.dateValue - b.dateValue);
    } else if (sortOption === 'Popular') {
      result = [...result].sort((a, b) => b.plays - a.plays);
    }

    return result;
  }, [activeCategory, sortOption, searchQuery]);

  const featured = teachings[0];

  return (
    <div className="min-h-screen bg-ink">
      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="container-editorial">
          <Reveal>
            <Eyebrow className="mb-6">
              Teachings
            </Eyebrow>
            <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.98] text-cream text-balance tracking-[-0.04em] mb-8">
              Teachings
            </h1>
            <p className="text-lg sm:text-xl text-ash leading-relaxed max-w-2xl font-light text-pretty">
              Explore messages, series and conversations designed to help you know
              Christ, grow in faith and live purposefully.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED TEACHING */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <Reveal variant="scale">
            <article className="grid grid-cols-1 lg:grid-cols-12 bg-ink-2 rounded-soft overflow-hidden group">
              <div className="relative lg:col-span-7 aspect-[4/5] lg:aspect-[4/3] min-h-[22rem] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-16 h-16 rounded-pill bg-cream/90 text-ink transition-transform duration-500 group-hover:scale-110">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-cream">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-pill bg-accent/20 text-accent text-meta font-sans uppercase tracking-widest">
                    Featured
                  </span>
                  <span className="text-meta text-white/50 uppercase tracking-widest">
                    {featured.category}
                  </span>
                </div>
                <p className="text-eyebrow uppercase tracking-widest text-accent mb-4">
                  {featured.series}
                </p>
                <h2 className="font-display text-2xl lg:text-3xl leading-tight mb-5 text-balance">
                  {featured.title}
                </h2>
                <p className="text-white/65 leading-relaxed mb-8">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-meta text-white/50 mb-8">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-pill bg-accent" />
                  <span>{featured.duration}</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="md" withArrow>
                    Watch
                  </Button>
                  <button className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-accent transition-colors duration-300">
                    <Headphones className="w-4 h-4" />
                    Listen
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* DISCOVERY — search + filters */}
      <section className="pb-8">
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
                  placeholder="Search teachings, series, or topics…"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((item, i) => (
                <TeachingCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

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
                <ChapterMarker number="01" label="The Podcast" />
                <h2 className="font-sans font-extrabold leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.04em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-6">
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
      <section className="py-24 lg:py-36 bg-bone">
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
                <ChapterMarker tone="light" number="02" label="Written Teaching" />
                <h2 className="font-sans font-extrabold leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.04em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-ink mb-6">
                  The word also travels through pages.
                </h2>
                <p className="text-lg text-umber leading-relaxed mb-8 text-pretty">
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
