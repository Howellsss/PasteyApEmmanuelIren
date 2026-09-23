import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { Eyebrow } from './Eyebrow';

interface CTASectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

/** Closing call-to-action block: dark surface with a thin accent rule along the top. */
export function CTASection({
  eyebrow,
  title,
  description,
  primaryLabel = 'Invite Emmanuel',
  secondaryLabel,
  className,
}: CTASectionProps) {
  return (
    <Reveal variant="scale">
      <section
        className={cn(
          'rounded-soft border-t-2 border-accent bg-surface px-8 py-14 lg:px-16 lg:py-16 flex flex-col items-center text-center gap-5',
          className
        )}
      >
        {eyebrow && <Eyebrow centered>{eyebrow}</Eyebrow>}
        <h2 className="font-display text-2xl lg:text-4xl leading-[1.15] text-balance max-w-3xl text-cream">{title}</h2>
        {description && <p className="text-base leading-relaxed max-w-xl text-pretty text-ash">{description}</p>}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
          <Button variant="primary" size="lg" withArrow>
            {primaryLabel}
          </Button>
          {secondaryLabel && (
            <Button variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </section>
    </Reveal>
  );
}
