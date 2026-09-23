import { Quote } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  className?: string;
}

export function Testimonial({
  quote,
  author,
  role,
  image,
  className,
}: TestimonialProps) {
  return (
    <Reveal className={cn('relative', className)}>
      <div className="flex flex-col gap-6 p-8 lg:p-10 rounded-soft bg-soft-white border border-stone/20">
        <Quote className="w-8 h-8 text-gold/40" />
        <blockquote className="font-display text-xl lg:text-2xl leading-relaxed text-charcoal text-balance">
          “{quote}”
        </blockquote>
        <div className="flex items-center gap-4 mt-auto">
          {image && (
            <div className="flex-shrink-0 w-12 h-12 rounded-pill overflow-hidden bg-charcoal/10">
              <img src={image} alt={author} loading="lazy" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <p className="font-sans font-medium text-sm text-charcoal">{author}</p>
            {role && <p className="text-meta text-stone mt-0.5">{role}</p>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
