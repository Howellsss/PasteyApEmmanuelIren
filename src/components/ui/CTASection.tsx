import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
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
  variant?: 'light' | 'dark' | 'burgundy' | 'ink';
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  primaryLabel = 'Invite Emmanuel',
  secondaryLabel,
  variant = 'dark',
  className,
}: CTASectionProps) {
  const variants = {
    light: 'bg-soft-white border border-stone/20',
    dark: 'bg-charcoal text-soft-white',
    burgundy: 'bg-burgundy text-soft-white',
    ink: 'bg-ink text-cream',
  };

  const isInk = variant === 'ink';
  const eyebrowTone = isInk ? 'rust' : 'gold';

  return (
    <Reveal variant="scale">
      <section
        className={cn(
          'rounded-soft px-8 py-16 lg:px-16 lg:py-20 flex flex-col items-center text-center gap-6',
          variants[variant],
          className
        )}
      >
        {eyebrow && (
          <Eyebrow tone={eyebrowTone} className="justify-center">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="font-display text-3xl lg:text-5xl leading-[1.15] text-balance max-w-3xl">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'text-lg leading-relaxed max-w-xl text-pretty',
              variant === 'light' ? 'text-charcoal/70' : isInk ? 'text-cream' : 'text-white/70'
            )}
          >
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Button
            variant={variant === 'light' ? 'primary' : isInk ? 'rust' : 'secondary'}
            size="lg"
            withArrow
            className={cn(
              variant !== 'light' &&
                !isInk &&
                'border-white/20 text-soft-white hover:bg-soft-white hover:text-charcoal'
            )}
          >
            {primaryLabel}
          </Button>
          {secondaryLabel && (
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                variant !== 'light' && (isInk ? 'text-cream hover:text-rust' : 'text-soft-white hover:text-gold')
              )}
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </section>
    </Reveal>
  );
}
