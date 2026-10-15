import { useState } from 'react';
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

/**
 * The journey: one large photo on the left with a progress rail along its edge, and the years
 * listed on the right. Hovering, focusing or tapping a year makes it active and swaps the photo.
 * On phones the photo opens inside the active year instead.
 */
export function InteractiveTimeline({ milestones, className }: InteractiveTimelineProps) {
  const [active, setActive] = useState(0);
  const share = 100 / milestones.length;

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14', className)}>
      {/* Photo with progress rail (larger screens) */}
      <div className="hidden lg:block lg:col-span-6">
        <div className="sticky top-28 flex gap-5">
          <div className="relative flex-1 aspect-[4/5] max-h-[calc(100vh-9rem)] overflow-hidden rounded-soft bg-ink-2">
            {milestones.map((m, i) => (
              <img
                key={m.year}
                src={m.image}
                alt={i === active ? m.title : ''}
                aria-hidden={i !== active}
                loading="lazy"
                className={cn(
                  'absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out-quart',
                  i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                )}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <span className="absolute left-6 bottom-5 font-display text-5xl text-cream/90 tabular-nums leading-none">
              {milestones[active].year}
            </span>
          </div>
          <div className="relative w-[3px] rounded-full bg-line" aria-hidden="true">
            <span
              className="absolute left-0 w-full rounded-full bg-brand transition-all duration-500 ease-out-quart"
              style={{ top: `${active * share}%`, height: `${share}%` }}
            />
          </div>
        </div>
      </div>

      {/* Years */}
      <ol className="lg:col-span-6 flex flex-col gap-1.5">
        {milestones.map((m, i) => {
          const isActive = i === active;
          return (
            <li key={m.year}>
              <button
                type="button"
                aria-current={isActive ? 'step' : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  'w-full text-left rounded-md px-5 py-5 sm:px-7 sm:py-6 transition-colors duration-300 cursor-pointer',
                  isActive ? 'bg-cream/[0.06]' : 'hover:bg-cream/[0.03]'
                )}
              >
                <span
                  className={cn(
                    'block font-display text-2xl sm:text-3xl tabular-nums leading-none transition-colors duration-300',
                    isActive ? 'text-accent' : 'text-ash/70'
                  )}
                >
                  {m.year}
                </span>
                <span
                  className={cn(
                    'mt-3 block font-display text-xl sm:text-2xl leading-tight text-balance transition-colors duration-300',
                    isActive ? 'text-cream' : 'text-cream/60'
                  )}
                >
                  {m.title}
                </span>
                {/* Phones: the photo opens inside the active year */}
                <span
                  className={cn(
                    'lg:hidden grid transition-[grid-template-rows] duration-500 ease-out-quart',
                    isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <span className="overflow-hidden">
                    <img
                      src={m.image}
                      alt=""
                      loading="lazy"
                      className="mt-4 block w-full aspect-[4/3] object-cover object-top rounded-soft"
                    />
                  </span>
                </span>
                <span
                  className={cn(
                    'mt-3 block text-[0.9375rem] leading-relaxed text-pretty transition-colors duration-300',
                    isActive ? 'text-mist' : 'text-ash/60'
                  )}
                >
                  {m.description}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
