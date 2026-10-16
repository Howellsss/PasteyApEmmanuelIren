import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center flex-wrap gap-1.5', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-meta text-ash hover:text-accent transition-colors duration-300"
              >
                {item.label}
              </a>
            ) : (
              <span className={cn('text-meta', isLast ? 'text-cream font-medium' : 'text-ash')}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-3 h-3 text-ash" />}
          </span>
        );
      })}
    </nav>
  );
}
