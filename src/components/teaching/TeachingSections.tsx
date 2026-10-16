import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, FileText, ListChecks, MessageSquareQuote, Play } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/TextLink';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { MediaReveal } from '@/components/ui/MediaReveal';
import { archiveSeries, messages, type Message } from '@/data/media';
import { cn } from '@/lib/cn';

/* Sections of the Teaching page built on the shared message data: latest messages, series and study notes. */

export function PlayBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
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

export function WatchLink({ message, children, className }: { message: Message; children: ReactNode; className?: string }) {
  return (
    <a href={message.watchUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/** The newest message large, the rest listed beside it; every one opens on YouTube. */
export function LatestMessages({ number }: { number: string }) {
  const [featured, ...rest] = messages;

  return (
    <section id="latest" className="scroll-mt-28 pb-16 lg:pb-24">
      <div className="container-wide">
        <Reveal variant="left" className="mb-8">
          <DisplayHeading number={number} eyebrow="Latest messages" title="Watch" accent="the latest." />
        </Reveal>
        <div className="grid grid-cols-1 gap-10 border-t-2 border-brand pt-8 lg:grid-cols-12 lg:gap-12">
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
                <p className="mt-5 text-eyebrow uppercase tracking-[0.16em] text-accent">{featured.series} · Latest</p>
                <h2 className="mt-2 font-display text-3xl leading-tight text-cream transition-colors duration-300 group-hover:text-accent">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-ash">{featured.description}</p>
              </Reveal>
            </WatchLink>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
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
              <a href="#library" className="group flex items-center justify-between gap-4 text-sm">
                <span className="text-ash">Search every message</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-cream transition-colors duration-300 group-hover:text-accent">
                  The full library
                  <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Every series, programme, podcast and gathering behind the teaching. */
export function SeriesList({ number }: { number: string }) {
  return (
    <section id="series" className="scroll-mt-28 bg-ink-2 py-14 md:py-16 lg:py-24">
      <div className="container-wide">
        <Reveal variant="left" className="mb-8">
          <DisplayHeading number={number} eyebrow="Series" title="Every series," accent="kept." />
        </Reveal>
        <div className="border-t-2 border-brand">
          {archiveSeries.map((series, index) => (
            <Reveal key={series.title} variant="right" delay={(index % 4) * 80}>
              <a
                href="#library"
                className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[3.5rem_16rem_1fr_auto] sm:gap-6"
              >
                <span className="font-display text-2xl text-brand">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-accent">{series.title}</h3>
                  <p className="mt-0.5 text-eyebrow uppercase tracking-[0.16em] text-ash">{series.kind}</p>
                </div>
                <p className="hidden text-sm leading-relaxed text-ash sm:block">{series.description}</p>
                <ArrowUpRight className="h-5 w-5 text-ash transition-colors duration-300 group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const resourceTypes = [
  { icon: FileText, title: 'Sermon notes', text: 'The outline of each message, with its main points, to revisit what was taught.' },
  { icon: BookOpen, title: 'Scripture references', text: 'Every passage read in the message, in order, for your own study.' },
  { icon: ListChecks, title: 'Discussion guides', text: 'Questions for small groups and families to talk the message through together.' },
  { icon: MessageSquareQuote, title: 'Transcripts', text: 'The full text of selected messages, for reading and reference.' },
];

/** Study material for a message, shared on request. */
export function StudyNotes({ number }: { number: string }) {
  return (
    <section id="notes" className="scroll-mt-28 py-14 md:py-16 lg:py-24">
      <div className="container-wide">
        <Reveal variant="left" className="mb-4">
          <DisplayHeading number={number} eyebrow="Study notes" title="Take it" accent="beyond Sunday." />
        </Reveal>
        <Reveal variant="left" delay={100} as="p" className="mb-10 max-w-2xl leading-relaxed text-ash">
          Notes, scriptures, discussion guides and transcripts for personal study, small groups and families — shared on request.
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
        <div className="mt-12 border-t border-line">
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
  );
}
