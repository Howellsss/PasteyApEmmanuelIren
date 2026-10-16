import { type ReactNode } from 'react';
import { ArrowUpRight, Play, Youtube } from 'lucide-react';
import { MediaHero, MediaSubnav, MoreFromMedia } from '@/components/media/MediaLayout';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { filmChannels, films, youtubeThumb, youtubeWatch } from '@/data/media';
import { cn } from '@/lib/cn';

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
