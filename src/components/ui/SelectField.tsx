import { type SelectHTMLAttributes, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function SelectField({
  label,
  options,
  hint,
  error,
  required = false,
  className,
  ...props
}: SelectFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-cream">
          {label}
          {required && <span className="text-accent ml-0.5">*</span>}
        </label>
        {hint && <span className="text-meta text-ash">{hint}</span>}
      </div>
      <div className="relative">
        <select
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            'w-full appearance-none px-4 py-3 pr-10 rounded-subtle border bg-surface text-cream',
            'transition-all duration-300 ease-out-quart focus:outline-none cursor-pointer',
            error
              ? 'border-accent'
              : focused
              ? 'border-line ring-1 ring-accent/10'
              : 'border-line hover:border-line'
          )}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash pointer-events-none transition-transform duration-300',
            focused && 'rotate-180'
          )}
        />
      </div>
      {error && <p className="text-meta text-accent mt-0.5">{error}</p>}
    </div>
  );
}
