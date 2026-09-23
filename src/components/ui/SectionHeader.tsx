import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ChapterMarker } from './ChapterMarker';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  numbered?: string;
  /** dark: the default near-black sections; light: the bone chapter. */
  surface?: 'dark' | 'light';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/** Section heading in the site style: chapter marker, bold uppercase title, short description. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  numbered,
  surface = 'dark',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const centered = align === 'center';
  const light = surface === 'light';

  return (
    <Reveal className={cn('flex flex-col', centered ? 'items-center text-center' : 'items-start text-left', className)}>
      {eyebrow && <ChapterMarker label={eyebrow} number={numbered} tone={surface} centered={centered} className="w-full" />}
      <h2
        className={cn(
          'font-sans font-extrabold leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.04em] text-balance',
          'text-3xl sm:text-4xl lg:text-[2.5rem]',
          light ? 'text-ink' : 'text-cream',
          centered ? 'max-w-3xl' : 'max-w-4xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-base leading-relaxed text-pretty',
            descriptionClassName ?? (light ? 'text-umber' : 'text-ash')
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
