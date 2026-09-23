import { Heart, MessageCircle, Repeat, Share } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

interface SocialCardProps {
  platform: string;
  handle: string;
  content: string;
  image?: string;
  likes?: number;
  comments?: number;
  reposts?: number;
  className?: string;
}

export function SocialCard({
  platform,
  handle,
  content,
  image,
  likes = 0,
  comments = 0,
  reposts = 0,
  className,
}: SocialCardProps) {
  return (
    <Reveal className={cn('group', className)}>
      <article className="flex flex-col gap-4 p-6 rounded-soft border border-stone/30 hover:border-stone/50 transition-colors duration-300 bg-soft-white/40">
        <div className="flex items-center justify-between">
          <Eyebrow tone="olive">{platform}</Eyebrow>
          <span className="text-meta text-stone">{handle}</span>
        </div>
        <p className="text-sm text-charcoal/80 leading-relaxed text-pretty">{content}</p>
        {image && (
          <div className="overflow-hidden rounded-soft aspect-video bg-charcoal/5">
            <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex items-center gap-6 text-stone">
          <span className="flex items-center gap-1.5 text-meta">
            <Heart className="w-3.5 h-3.5" />
            {likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-meta">
            <MessageCircle className="w-3.5 h-3.5" />
            {comments.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-meta">
            <Repeat className="w-3.5 h-3.5" />
            {reposts.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-meta ml-auto">
            <Share className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    </Reveal>
  );
}
