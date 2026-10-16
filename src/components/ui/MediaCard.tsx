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

/** Frameless media item: photo, hairline rule, then label and title — no card box. */
export function MediaCard({
  image,
  title,
  meta,
  duration,
  type = 'Media',
  className,
}: MediaCardProps) {
  return (
    <Reveal className={cn('group cursor-pointer', className)}>
      <div className="relative overflow-hidden rounded-soft aspect-[4/5] bg-surface">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-14 h-14 rounded-pill bg-cream/90 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Play className="w-5 h-5 text-ink ml-0.5" fill="currentColor" />
          </span>
        </div>
        {duration && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-subtle bg-ink/80 backdrop-blur-sm text-cream text-meta font-sans">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        )}
      </div>
      <div className="mt-4 border-t border-line pt-4">
        <Eyebrow className="mb-2">{type}</Eyebrow>
        <h3 className="font-display text-lg lg:text-xl leading-snug text-cream group-hover:text-accent transition-colors duration-300 text-balance">
          {title}
        </h3>
        {meta && <p className="text-meta text-ash mt-1.5">{meta}</p>}
      </div>
    </Reveal>
  );
}
