import { type InputHTMLAttributes, type ReactNode, useState } from 'react';
import { cn } from '@/lib/cn';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  hint,
  error,
  required = false,
  className,
  ...props
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-charcoal">
          {label}
          {required && <span className="text-burgundy ml-0.5">*</span>}
        </label>
        {hint && <span className="text-meta text-stone">{hint}</span>}
      </div>
      <input
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
          'w-full px-4 py-3 rounded-subtle border bg-soft-white text-charcoal placeholder:text-stone/60',
          'transition-all duration-300 ease-out-quart',
          'focus:outline-none',
          error
            ? 'border-burgundy focus:border-burgundy'
            : focused
            ? 'border-charcoal/40 ring-1 ring-charcoal/10'
            : 'border-stone/30 hover:border-stone/50'
        )}
      />
      {error && (
        <p className="text-meta text-burgundy mt-0.5">{error}</p>
      )}
    </div>
  );
}
