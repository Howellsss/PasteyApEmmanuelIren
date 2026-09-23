import { Headphones, Play, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

interface AudioCardProps {
  image?: string;
  title: string;
  episode?: string;
  duration?: string;
  className?: string;
}

export function AudioCard({
  image,
  title,
  episode,
  duration,
  className,
}: AudioCardProps) {
  return (
    <Reveal className={cn('group cursor-pointer', className)}>
      <div className="flex items-center gap-4 p-4 rounded-soft border border-line hover:border-line transition-colors duration-300 bg-surface/50">
        <div className="relative flex-shrink-0 w-16 h-16 rounded-soft overflow-hidden bg-surface flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <Headphones className="w-6 h-6 text-ash" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-ink-2/0 group-hover:bg-ink-2/40 transition-colors duration-500">
            <Play className="w-5 h-5 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500" fill="currentColor" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {episode && (
            <Eyebrow tone="olive" className="mb-1">
              {episode}
            </Eyebrow>
          )}
          <h3 className="font-display text-base leading-snug text-cream group-hover:text-accent transition-colors duration-300 truncate">
            {title}
          </h3>
          {duration && (
            <p className="flex items-center gap-1.5 text-meta text-ash mt-1">
              <Clock className="w-3 h-3" />
              {duration}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
