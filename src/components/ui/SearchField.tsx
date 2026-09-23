import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SearchFieldProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchField({
  placeholder = 'Search…',
  className,
  value = '',
  onChange,
}: SearchFieldProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-pill border border-stone/30 bg-soft-white text-sm text-charcoal placeholder:text-stone/60 transition-all duration-300 ease-out-quart focus:outline-none focus:border-charcoal/40 focus:ring-1 focus:ring-charcoal/10 hover:border-stone/50"
      />
    </div>
  );
}
