import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface NumberedItem {
  number: string;
  title: string;
  description?: ReactNode;
}

interface NumberedListProps {
  items: NumberedItem[];
  className?: string;
}

export function NumberedList({ items, className }: NumberedListProps) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={index}
          delay={index * 80}
          className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-8 py-6 border-t border-line first:border-t-0"
        >
          <span className="font-display text-2xl lg:text-3xl text-accent tabular-nums leading-none pt-1">
            {item.number}
          </span>
          <div>
            <h3 className="font-display text-lg lg:text-xl leading-snug text-cream group-hover:text-accent transition-colors duration-300 mb-2">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-ash leading-relaxed max-w-xl">{item.description}</p>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
