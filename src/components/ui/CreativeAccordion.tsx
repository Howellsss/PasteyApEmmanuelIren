import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Film, Mic2, Music2, Sparkles } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

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
    image: '/images/creative/image copy 2.png',
    accent: '#D35454',
  },
  {
    tag: 'Music',
    title: 'Music',
    description: 'Songs of worship, conviction, and the joy of knowing Christ.',
    icon: Music2,
    image: '/images/creative/image.png',
    accent: '#D35454',
  },
  {
    tag: 'Film & Media',
    title: 'Film & Media',
    description: 'Stories and conversations that carry the message beyond the pulpit.',
    icon: Film,
    image: '/images/creative/image copy.png',
    accent: '#D35454',
    objectPosition: 'center top',
  },
  {
    tag: 'Podcast',
    title: 'Podcast',
    description: 'Conversations and teachings that explore faith, purpose, leadership, and the Christian life.',
    icon: Mic2,
    image: '/images/creative/image copy 3.png',
    accent: '#D35454',
  },
  {
    tag: 'Speaking',
    title: 'Speaking',
    description: 'Biblical teaching and conversations that bring clarity to faith, purpose, leadership, and culture.',
    icon: Sparkles,
    image: '/images/creative/image copy 4.png',
    accent: '#D35454',
  },
];

export function CreativeAccordion() {
  const [active, setActive] = useState(0);
  const directionRef = useRef(1);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + cards.length) % cards.length);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % cards.length);
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <section className="ce-section" aria-label="Creative Expression">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Creative Expression"
          title="More than the pulpit."
          description="The message also travels through pages, melodies, images, and stories — each one made to meet people where they are."
          tone="rust"
          titleClassName="text-ink"
          descriptionClassName="text-umber"
          className="mb-12"
        />
      </div>

      <div className="ce-accordion-wrap">
        <div className="ce-accordion" role="tablist" aria-label="Creative expressions">
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
                onMouseEnter={() => goTo(i)}
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
                {isActive && (
                  <div className="ce-body" id={`ce-panel-${i}`}>
                    <span className="ce-icon"><Icon className="w-5 h-5" strokeWidth={1.5} /></span>
                    <p className="ce-tag">{card.tag}</p>
                    <h3 className="ce-card-title">{card.title}</h3>
                    <p className="ce-desc">{card.description}</p>
                    <span className="ce-explore">Explore →</span>
                  </div>
                )}
                {!isActive && (
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
      </div>
    </section>
  );
}
