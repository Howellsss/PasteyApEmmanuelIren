import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { TextLink } from './TextLink';

interface BookCardProps {
  cover?: string;
  title: string;
  author?: string;
  year?: string;
  className?: string;
}

export function BookCard({
  cover,
  title,
  author = 'Emmanuel Iren',
  year,
  className,
}: BookCardProps) {
  return (
    <Reveal className={cn('group cursor-pointer', className)}>
      <div className="relative overflow-hidden rounded-soft aspect-[3/4] bg-surface mb-4 shadow-md shadow-black/30 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-black/40">
        {cover ? (
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-accent-dark to-ink-2 text-cream p-6 text-center">
            <BookOpen className="w-8 h-8 mb-3 text-accent" />
            <p className="font-display text-lg leading-tight">{title}</p>
          </div>
        )}
      </div>
      <h3 className="font-display text-lg leading-snug text-cream group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-meta text-ash mt-1">
        {author}{year && ` · ${year}`}
      </p>
      <TextLink className="mt-2">Read More</TextLink>
    </Reveal>
  );
}
