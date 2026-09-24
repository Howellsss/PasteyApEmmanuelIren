import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Film, Mic2, Music2, Sparkles } from 'lucide-react';
import { DisplayHeading } from './DisplayHeading';
import { Reveal } from './Reveal';

type Card = {
  tag: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  image: string;
  accent: string;
  objectPosition?: string;
};

const cards: Card[] = [
  {
    tag: 'Books',
    title: 'Books',
    description: 'Words that make the life of faith practical, clear, and lived.',
    icon: BookOpen,
    image: '/images/creative/image copy 2.webp',
    accent: '#DF584C',
  },
  {
    tag: 'Music',
    title: 'Music',
    description: 'Songs of worship, conviction, and the joy of knowing Christ.',
    icon: Music2,
    image: '/images/creative/image.webp',
    accent: '#DF584C',
  },
  {
    tag: 'Film & Media',
    title: 'Film & Media',
    description: 'Stories and conversations that carry the message beyond the pulpit.',
    icon: Film,
    image: '/images/creative/image copy.webp',
    accent: '#DF584C',
    objectPosition: 'center top',
  },
  {
    tag: 'Podcast',
    title: 'Podcast',
    description: 'Conversations and teachings that explore faith, purpose, leadership, and the Christian life.',
    icon: Mic2,
    image: '/images/creative/image copy 3.webp',
    accent: '#DF584C',
  },
  {
    tag: 'Speaking',
    title: 'Speaking',
    description: 'Biblical teaching and conversations that bring clarity to faith, purpose, leadership, and culture.',
    icon: Sparkles,
    image: '/images/creative/image copy 4.webp',
    accent: '#DF584C',
  },
];

// Below this width the accordion becomes a swipeable row of full cards instead of squeezing all five.
const MOBILE_QUERY = '(max-width: 767px)';

export function CreativeAccordion() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );
  const directionRef = useRef(1);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // On phones, choosing a card scrolls the row to it; the scroll handler then marks it active.
  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const card = track?.children[index] as HTMLElement | undefined;
      if (isMobile && track && card) {
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: 'smooth' });
        return;
      }
      setActive(index);
    },
    [isMobile]
  );

  const prev = useCallback(() => {
    goTo((active - 1 + cards.length) % cards.length);
  }, [active, goTo]);

  const next = useCallback(() => {
    goTo((active + 1) % cards.length);
  }, [active, goTo]);

  const onTrackScroll = useCallback(() => {
    const track = trackRef.current;
    if (!isMobile || !track) return;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    const index = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    setActive(index);
  }, [isMobile]);

  useEffect(() => {
    // The row is left for the visitor to swipe on phones; it only cycles by itself on larger screens.
    if (isMobile) return;
    const id = setInterval(() => {
      setActive((currentIndex) => {
        let nextIndex = currentIndex + directionRef.current;
        if (nextIndex >= cards.length) {
          directionRef.current = -1;
          nextIndex = cards.length - 2;
        } else if (nextIndex < 0) {
          directionRef.current = 1;
          nextIndex = 1;
        }
        return nextIndex;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [isMobile]);

  return (
    <section className="ce-section" aria-label="Creative Expression">
      <div className="container-editorial">
        <Reveal variant="left" className="mb-10">
          <DisplayHeading number="04" eyebrow="Creative Expression" title="More than" accent="the pulpit." accentClassName="text-[#D35455]" tone="light" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-umber text-pretty">
            The message also travels through pages, melodies, images, and stories — each one made to meet people where they are.
          </p>
        </Reveal>
      </div>

      <Reveal variant="right" delay={150} className="ce-accordion-wrap">
        <div
          ref={trackRef}
          className="ce-accordion"
          role="tablist"
          aria-label="Creative expressions"
          onScroll={onTrackScroll}
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isActive = i === active;
            return (
              <article
                key={card.tag}
                className={`ce-card ${isActive ? 'is-active' : ''}`}
                style={{ '--ce-accent': card.accent } as CSSProperties}
                role="tab"
                aria-selected={isActive}
                aria-controls={`ce-panel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => !isMobile && goTo(i)}
                onClick={() => goTo(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goTo(i);
                  }
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="ce-card-image"
                  style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
                  loading="lazy"
                />
                <div className="ce-gradient" />
                <div className="ce-corner" aria-hidden="true" />
                {(isActive || isMobile) && (
                  <div className="ce-body" id={`ce-panel-${i}`}>
                    <span className="ce-icon"><Icon className="w-5 h-5" strokeWidth={1.5} /></span>
                    <p className="ce-tag">{card.tag}</p>
                    <h3 className="ce-card-title">{card.title}</h3>
                    <p className="ce-desc">{card.description}</p>
                    <span className="ce-explore">Explore →</span>
                  </div>
                )}
                {!isActive && !isMobile && (
                  <div className="ce-collapsed">
                    <span className="ce-collapsed-icon"><Icon className="w-4 h-4" strokeWidth={1.5} /></span>
                    <span className="ce-collapsed-title">{card.title}</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="ce-controls">
          <button className="ce-nav" onClick={prev} aria-label="Previous expression" type="button">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="ce-dots" role="tablist" aria-label="Choose expression">
            {cards.map((card, i) => (
              <button
                key={card.tag}
                className={`ce-dot ${i === active ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${card.title}`}
                aria-selected={i === active}
                type="button"
              />
            ))}
          </div>
          <button className="ce-nav" onClick={next} aria-label="Next expression" type="button">
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
