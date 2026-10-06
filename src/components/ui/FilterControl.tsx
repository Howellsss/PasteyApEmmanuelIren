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
              'px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 ease-out-quart',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
              isActive
                ? 'bg-cream text-ink border border-cream'
                : 'bg-transparent text-ash border border-line hover:border-cream/40 hover:text-cream'
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
