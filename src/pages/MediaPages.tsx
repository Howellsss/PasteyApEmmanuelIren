import { type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, FileText, ListChecks, MessageSquareQuote, Play } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { MediaReveal } from '@/components/ui/MediaReveal';
import { archiveSeries, books, mediaSections, messages, type Book, type Message } from '@/data/media';
import { cn } from '@/lib/cn';

const FAMILY_IMAGE = '/images/about/image.webp';
const REEL_POSTER = '/images/creative/e5.webp';
const SECTION_IMAGES: Record<string, string> = {
  '/media/reels': '/images/creative/image copy 3.webp',
  '/media/messages': '/images/teachings/god-who-blesses.webp',
  '/media/resources': '/images/teachings/image copy 2.webp',
  '/media/the-irens': FAMILY_IMAGE,
  '/media/books': '/images/creative/image copy 2.webp',
  '/media/archive': '/images/teachings/image copy 5.webp',
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
            {accent && <> <span className="text-brand">{accent}</span></>}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

function PlayBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span
      className={cn(
        'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink transition-transform duration-500 group-hover:scale-110',
        size === 'md' ? 'h-16 w-16' : 'h-11 w-11'
      )}
    >
      <Play className={size === 'md' ? 'ml-1 h-6 w-6' : 'ml-0.5 h-4 w-4'} fill="currentColor" />
    </span>
  );
}

function WatchLink({ message, children, className }: { message: Message; children: ReactNode; className?: string }) {
  return (
    <a href={message.watchUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/** A book cover set in type: the books' artwork can replace these when supplied. */
function BookCover({ book, onNavy, className }: { book: Book; onNavy?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'flex aspect-[3/4] flex-col justify-between rounded-soft p-6 shadow-lg shadow-black/30 ring-1 ring-white/5',
        // On the navy chapter the covers turn ink so they stand off the ground.
        onNavy ? 'bg-ink' : 'bg-navy',
        className
      )}
    >
      <span className="text-eyebrow uppercase tracking-[0.2em] text-mist">Emmanuel Iren</span>
      <div>
        <span aria-hidden="true" className="mb-4 block h-0.5 w-10 bg-brand" />
        <p className="font-display text-3xl leading-[1.05] text-cream text-balance">{book.title}</p>
      </div>
      <span className="text-eyebrow uppercase tracking-[0.2em] text-accent">{book.theme}</span>
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
        intro="Sermons, short reels, notes, books and family moments — the same message of Christ, made to reach people wherever they are."
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
              <p className="text-eyebrow uppercase tracking-[0.16em] text-accent">{latest.series} · {latest.date}</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-cream lg:text-4xl">{latest.title}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-ash">{latest.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WatchLink message={latest} className="block w-full sm:w-auto">
                  <Button variant="brand" size="lg" withArrow className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                    Watch on YouTube
                  </Button>
                </WatchLink>
                <Link to="/media/messages" className="block w-full sm:w-auto">
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
            <DisplayHeading number="02" eyebrow="In Media" title="Six ways" accent="in." />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <Reveal key={section.path} variant="right" delay={(index % 3) * 120}>
                <Link to={section.path} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-soft bg-surface">
                    <img
                      src={SECTION_IMAGES[section.path]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                      style={{ objectPosition: 'center 25%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <span className="absolute left-5 top-4 font-display text-2xl text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">{String(index + 1).padStart(2, '0')}</span>
                    <div className="absolute inset-x-5 bottom-5">
                      <h3 className="font-display text-2xl text-cream">{section.label}</h3>
                      <p className="mt-1 text-sm text-cream/75">{section.blurb}</p>
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
                  <BookCover book={book} onNavy className="transition-transform duration-500 group-hover:-translate-y-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Reels ─────────────────────────────────────────────────────────────── */

export function ReelsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Reels."
        accent="Moments that stay."
        intro="Short moments from recent messages. Watch a clip here, or open the full message it came from."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            <Reveal variant="right">
              <div className="overflow-hidden rounded-soft bg-surface">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={REEL_POSTER}
                  className="aspect-[9/16] h-full w-full bg-ink object-cover"
                >
                  <source src="/videos/hero.webm" type="video/webm" />
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="mt-3 text-eyebrow uppercase tracking-[0.16em] text-accent">Clip · Sunday service</p>
              <h3 className="mt-1 font-display text-lg leading-snug text-cream">From the pulpit</h3>
            </Reveal>
            {messages.map((message, index) => (
              <Reveal key={message.title} variant="right" delay={((index + 1) % 3) * 120}>
                <WatchLink message={message} className="group block">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-soft bg-surface">
                    <img
                      src={message.image}
                      alt={message.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                      style={{ objectPosition: message.imagePosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <PlayBadge size="sm" />
                  </div>
                  <p className="mt-3 text-eyebrow uppercase tracking-[0.16em] text-accent">{message.series}</p>
                  <h3 className="mt-1 font-display text-lg leading-snug text-cream transition-colors duration-300 group-hover:text-accent">
                    {message.title}
                  </h3>
                </WatchLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/reels" />
    </div>
  );
}

/* ── Messages ──────────────────────────────────────────────────────────── */

export function MessagesPage() {
  const [featured, ...rest] = messages;

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Messages."
        accent="Watch in full."
        intro="Recent sermons and teachings from Celebration Church International, each available to watch in full on YouTube."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <WatchLink message={featured} className="group block">
                <MediaReveal frameClassName="aspect-[16/10] rounded-soft bg-surface">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="media-reveal-img h-full w-full object-cover"
                    style={{ objectPosition: featured.imagePosition }}
                  />
                  <PlayBadge />
                </MediaReveal>
                <Reveal variant="left" delay={150}>
                  <p className="mt-5 text-eyebrow uppercase tracking-[0.16em] text-accent">{featured.series} · Featured</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight text-cream transition-colors duration-300 group-hover:text-accent">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-ash">{featured.description}</p>
                </Reveal>
              </WatchLink>
            </div>
            <div className="flex flex-col gap-6 border-t border-line pt-6 lg:col-span-5 lg:border-t-0 lg:pt-0">
              {rest.map((message, index) => (
                <Reveal key={message.title} variant="right" delay={(index + 1) * 120}>
                  <WatchLink
                    message={message}
                    className="group grid grid-cols-[8.5rem_1fr] items-center gap-4 border-b border-line pb-6 sm:grid-cols-[11rem_1fr] sm:gap-5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-soft bg-surface">
                      <img
                        src={message.image}
                        alt={message.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.05]"
                        style={{ objectPosition: message.imagePosition }}
                      />
                      <PlayBadge size="sm" />
                    </div>
                    <div>
                      <p className="text-eyebrow uppercase tracking-[0.16em] text-accent">{message.series} · {message.date}</p>
                      <h3 className="mt-1.5 font-display text-lg leading-snug text-cream transition-colors duration-300 group-hover:text-accent">
                        {message.title}
                      </h3>
                    </div>
                  </WatchLink>
                </Reveal>
              ))}
              <Reveal variant="right" delay={500}>
                <Link to="/teaching" className="group flex items-center justify-between gap-4 text-sm">
                  <span className="text-ash">Series, podcasts and more</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-cream transition-colors duration-300 group-hover:text-accent">
                    The full teaching library
                    <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/messages" />
    </div>
  );
}

/* ── Message Resources ─────────────────────────────────────────────────── */

const resourceTypes = [
  { icon: FileText, title: 'Sermon notes', text: 'The outline of each message, with its main points, to revisit what was taught.' },
  { icon: BookOpen, title: 'Scripture references', text: 'Every passage read in the message, in order, for your own study.' },
  { icon: ListChecks, title: 'Discussion guides', text: 'Questions for small groups and families to talk the message through together.' },
  { icon: MessageSquareQuote, title: 'Transcripts', text: 'The full text of selected messages, for reading and reference.' },
];

export function ResourcesPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Message resources."
        accent="Go deeper."
        intro="Study material to take a message beyond Sunday — for personal study, small groups and families. Resources are shared on request."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="01" eyebrow="What's available" title="Four ways" accent="to study." />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resourceTypes.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} variant="right" delay={index * 120}>
                <div className="h-full rounded-soft border-t-2 border-brand bg-surface p-6">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <h3 className="mt-5 font-display text-xl text-cream">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-8">
            <DisplayHeading number="02" eyebrow="By message" title="Request notes" accent="for a message." />
          </Reveal>
          <div className="border-t border-line">
            {messages.map((message, index) => (
              <Reveal key={message.title} variant="right" delay={index * 80}>
                <div className="grid grid-cols-1 items-center gap-3 border-b border-line py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-6">
                  <span className="hidden font-display text-2xl text-brand sm:block">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-eyebrow uppercase tracking-[0.16em] text-accent">{message.series} · {message.date}</p>
                    <h3 className="mt-1 font-display text-xl text-cream">{message.title}</h3>
                  </div>
                  <div className="flex items-center gap-5 text-sm">
                    <WatchLink message={message} className="text-ash transition-colors duration-300 hover:text-cream">
                      Watch
                    </WatchLink>
                    <Link to="/contact">
                      <TextLink>Request notes</TextLink>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/resources" />
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
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <MediaReveal frameClassName="aspect-[4/5] rounded-soft bg-surface sm:aspect-[4/3]">
                <img
                  src={FAMILY_IMAGE}
                  alt="Emmanuel Iren"
                  className="media-reveal-img h-full w-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </MediaReveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal variant="right">
                <DisplayHeading number="01" eyebrow="Family" title="Emmanuel" accent="& Laju Iren." size="sm" className="mb-6" />
              </Reveal>
              <div className="space-y-5 leading-relaxed text-ash">
                <Reveal variant="right" delay={150} as="p">
                  Emmanuel Iren married Laju Iren (née Arenyeka) in November 2014. Together they are parents to three daughters and one son.
                </Reveal>
                <Reveal variant="right" delay={300} as="p">
                  The family remains a quiet foundation beneath the public work — a reminder that the ministry, for all its reach, is carried by a man who is also a husband and a father.
                </Reveal>
              </div>
              <Reveal variant="right" delay={450} className="mt-8 grid grid-cols-3 border-t border-line pt-6">
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
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-7">
            <DisplayHeading number="02" eyebrow="On love & family" title="Love, as" accent="God designed it." />
            <p className="mt-5 max-w-xl leading-relaxed text-ash">
              Much of what Emmanuel Iren teaches on friendship, courtship and marriage is gathered in LoveCode — written for relationships built to last.
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
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <Reveal key={book.title} variant="right" delay={(index % 3) * 120}>
                <BookCover book={book} className="max-w-[20rem]" />
                <p className="mt-5 text-eyebrow uppercase tracking-[0.16em] text-accent">{book.theme}</p>
                <h3 className="mt-1.5 font-display text-2xl text-cream">{book.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash">{book.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal variant="left" className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-ash">For copies, bulk orders for churches and groups, or interviews about the books, get in touch.</p>
            <Link to="/contact" className="block w-full sm:w-auto">
              <Button variant="brand" size="lg" withArrow className="h-14 w-full rounded-pill sm:h-auto sm:w-auto">
                Enquire about the books
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
      <MoreFromMedia current="/media/books" />
    </div>
  );
}

/* ── Archive ───────────────────────────────────────────────────────────── */

export function ArchivePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Archive."
        accent="Every series, kept."
        intro="The series, programmes, podcasts and gatherings behind the teaching — gathered in one place to return to."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-8">
            <DisplayHeading number="01" eyebrow="Series" title="The" accent="library." />
          </Reveal>
          <div className="border-t-2 border-brand">
            {archiveSeries.map((series, index) => (
              <Reveal key={series.title} variant="right" delay={(index % 4) * 80}>
                <Link
                  to="/teaching"
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[3.5rem_16rem_1fr_auto] sm:gap-6"
                >
                  <span className="font-display text-2xl text-brand">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-accent">{series.title}</h3>
                    <p className="mt-0.5 text-eyebrow uppercase tracking-[0.16em] text-ash">{series.kind}</p>
                  </div>
                  <p className="hidden text-sm leading-relaxed text-ash sm:block">{series.description}</p>
                  <ArrowUpRight className="h-5 w-5 text-ash transition-colors duration-300 group-hover:text-accent" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-8">
            <DisplayHeading number="02" eyebrow="By date" title="September" accent="2025." />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {messages.map((message, index) => (
              <Reveal key={message.title} variant="right" delay={index * 100}>
                <WatchLink message={message} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-soft bg-surface">
                    <img
                      src={message.image}
                      alt={message.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.05]"
                      style={{ objectPosition: message.imagePosition }}
                    />
                    <PlayBadge size="sm" />
                  </div>
                  <h3 className="mt-3 font-display text-lg leading-snug text-cream transition-colors duration-300 group-hover:text-accent">
                    {message.title}
                  </h3>
                </WatchLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/archive" />
    </div>
  );
}
