import { Link } from 'react-router-dom';
import { BookCover } from '@/components/media/BookCover';
import { MediaHero, MediaSubnav } from '@/components/media/MediaLayout';
import { PlayBadge, WatchLink } from '@/components/teaching/TeachingSections';
import { Button } from '@/components/ui/Button';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { MediaReveal } from '@/components/ui/MediaReveal';
import { Reveal } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/TextLink';
import { books, mediaSections, messages } from '@/data/media';

const SECTION_IMAGES: Record<string, string> = {
  '/media/gallery': '/images/photos/stage-full-congregation.webp',
  '/media/the-irens': '/images/irens/irens-13.webp',
  '/media/books': '/images/photos/studio-podcast-desk.webp',
  '/media/films': 'https://i.ytimg.com/vi/RHHZdMU9-m0/maxresdefault.jpg',
  '/media/music': '/images/music/spirituals.webp',
  '/media/podcast': '/images/podcast/endless-life.webp',
};

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
