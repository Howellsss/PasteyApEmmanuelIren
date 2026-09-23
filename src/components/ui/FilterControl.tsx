import { useState } from 'react';
import { cn } from '@/lib/cn';

interface FilterControlProps {
  filters: string[];
  defaultActive?: string;
  className?: string;
  onSelect?: (filter: string) => void;
}

export function FilterControl({
  filters,
  defaultActive,
  className,
  onSelect,
}: FilterControlProps) {
  const [active, setActive] = useState(defaultActive ?? filters[0] ?? '');

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            onClick={() => {
              setActive(filter);
              onSelect?.(filter);
            }}
            className={cn(
              'px-4 py-2 rounded-pill text-sm font-medium transition-all duration-300 ease-out-quart',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
              isActive
                ? 'bg-charcoal text-soft-white'
                : 'bg-transparent text-charcoal/70 border border-stone/30 hover:border-charcoal/30 hover:text-charcoal'
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
