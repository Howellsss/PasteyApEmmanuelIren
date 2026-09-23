import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

interface InteractiveTimelineProps {
  milestones: TimelineMilestone[];
  className?: string;
}

export function InteractiveTimeline({ milestones, className }: InteractiveTimelineProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const trackRef = useRef<HTMLDivElement>(null);

  const select = useCallback(
    (index: number) => {
      if (index === active) return;
      setDirection(index > active ? 'right' : 'left');
      setActive(index);
    },
    [active],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const button = track.children[active] as HTMLElement;
    if (button) {
      button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [active]);

  const milestone = milestones[active];

  return (
    <div className={cn('w-full', className)}>
      {/* Display panel */}
      <div className="relative overflow-hidden rounded-soft bg-ink-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[24rem]">
          {/* Image */}
          <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
            {milestones.map((m, i) => (
              <img
                key={i}
                src={m.image}
                alt={m.title}
                loading="lazy"
                className={cn(
                  'absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out-quart',
                  i === active
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105 pointer-events-none',
                )}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
          {/* Content */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-cream">
            <div
              key={active}
              className={cn(
                'reveal-visible',
                direction === 'right' ? 'reveal-from-left' : 'reveal-from-right',
              )}
            >
              <span className="font-display text-5xl lg:text-6xl text-accent tabular-nums leading-none block mb-4">
                {milestone.year}
              </span>
              <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-4 text-balance">
                {milestone.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-pretty">
                {milestone.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal milestone track */}
      <div className="relative mt-8">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-line -translate-y-1/2" />
        <div
          ref={trackRef}
          className="relative flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-thin"
          style={{ scrollbarWidth: 'thin' }}
        >
          {milestones.map((m, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              className="group flex-shrink-0 flex flex-col items-center gap-3 px-4 py-2 cursor-pointer"
            >
              <span
                className={cn(
                  'text-meta font-sans uppercase tracking-widest transition-colors duration-300',
                  i === active ? 'text-accent' : 'text-ash',
                )}
              >
                {m.year}
              </span>
              <span
                className={cn(
                  'w-4 h-4 rounded-full border-2 transition-all duration-300',
                  i === active
                    ? 'bg-accent border-accent scale-125'
                    : 'bg-ink border-line group-hover:border-accent',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
