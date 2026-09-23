import { Play, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface VideoCardProps {
  image: string;
  title: string;
  channel?: string;
  duration?: string;
  className?: string;
}

export function VideoCard({
  image,
  title,
  channel,
  duration,
  className,
}: VideoCardProps) {
  return (
    <Reveal className={cn('group cursor-pointer', className)}>
      <div className="relative overflow-hidden rounded-soft aspect-video bg-surface mb-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-pill bg-cream/90 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Play className="w-6 h-6 text-ink ml-1" fill="currentColor" />
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-pill bg-ink-2/80 backdrop-blur-sm text-cream text-meta font-sans">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg leading-snug text-cream group-hover:text-accent transition-colors duration-300 text-balance">
        {title}
      </h3>
      {channel && <p className="text-meta text-ash mt-1.5">{channel}</p>}
    </Reveal>
  );
}
