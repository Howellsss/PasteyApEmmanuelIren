import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface TimelineEntry {
  year: string;
  title: string;
  description?: ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line hidden sm:block" />
      <div className="flex flex-col gap-8">
        {entries.map((entry, index) => (
          <Reveal
            key={index}
            delay={index * 80}
            className="relative grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-8"
          >
            <div className="flex items-start gap-4 sm:flex-col sm:items-start">
              <div className="relative w-4 h-4 rounded-full bg-ink border-2 border-accent mt-1 flex-shrink-0 z-10" />
              <span className="font-display text-xl text-accent tabular-nums sm:mt-2">
                {entry.year}
              </span>
            </div>
            <div className="pb-2">
              <h3 className="font-display text-lg leading-snug text-cream mb-1">
                {entry.title}
              </h3>
              {entry.description && (
                <p className="text-ash leading-relaxed max-w-xl">
                  {entry.description}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
