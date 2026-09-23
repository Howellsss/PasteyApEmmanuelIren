import { Play, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

interface MediaCardProps {
  image: string;
  title: string;
  meta?: string;
  duration?: string;
  type?: string;
  className?: string;
}

export function MediaCard({
  image,
  title,
  meta,
  duration,
  type = 'Media',
  className,
}: MediaCardProps) {
  return (
    <Reveal
      className={cn('group cursor-pointer', className)}
    >
      <div className="relative overflow-hidden rounded-soft aspect-[4/5] bg-charcoal/5 mb-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-16 h-16 rounded-pill bg-soft-white/90 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-rust">
            <Play className="w-6 h-6 text-ink group-hover:text-soft-white ml-1 transition-colors duration-500" fill="currentColor" />
          </span>
        </div>
        {duration && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-pill bg-charcoal/80 backdrop-blur-sm text-soft-white text-meta font-sans">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        )}
      </div>
      <Eyebrow tone="rust" className="mb-2">
        {type}
      </Eyebrow>
      <h3 className="font-display text-xl lg:text-2xl leading-snug text-ink group-hover:text-rust transition-colors duration-300 text-balance">
        {title}
      </h3>
      {meta && <p className="text-meta text-umber mt-1.5">{meta}</p>}
    </Reveal>
  );
}
