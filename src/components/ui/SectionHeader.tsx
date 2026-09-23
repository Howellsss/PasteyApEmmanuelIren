import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  numbered?: string;
  tone?: 'gold' | 'burgundy' | 'stone' | 'olive' | 'rust' | 'copper';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  numbered,
  tone = 'gold',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone} numbered={numbered}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-balance',
          align === 'center' ? 'max-w-3xl' : 'max-w-4xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-lg leading-relaxed text-pretty',
            descriptionClassName ?? 'text-charcoal/70',
            align === 'center' ? 'max-w-2xl' : 'max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
