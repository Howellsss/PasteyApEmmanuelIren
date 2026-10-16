import { Headphones } from 'lucide-react';
import { MediaHero, MediaSubnav, MoreFromMedia } from '@/components/media/MediaLayout';
import { Button } from '@/components/ui/Button';
import { MediaReveal } from '@/components/ui/MediaReveal';
import { Reveal } from '@/components/ui/Reveal';
import { podcast } from '@/data/media';

export function PodcastPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Podcast."
        accent="Listen anywhere."
        intro="Sermons and Bible teaching from Apostle Emmanuel Iren, on the go — on Apple Podcasts and Spotify."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <MediaReveal className="lg:col-span-5" frameClassName="aspect-square max-w-md rounded-soft bg-surface">
              <img
                src={podcast.art}
                alt={`${podcast.name} cover`}
                className="media-reveal-img h-full w-full object-cover"
              />
            </MediaReveal>
            <div className="lg:col-span-7">
              <Reveal variant="right">
                <span className="inline-flex items-center gap-2 rounded-pill border border-brand/60 px-3 py-1 text-eyebrow uppercase tracking-[0.16em] text-accent">
                  <Headphones className="h-3.5 w-3.5" /> {podcast.tag}
                </span>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-cream text-balance sm:text-5xl">
                  {podcast.name}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">{podcast.description}</p>
              </Reveal>
              <Reveal variant="right" delay={150} className="mt-8 flex flex-col gap-3 sm:flex-row">
                {podcast.links.map((link, index) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full sm:w-auto"
                  >
                    <Button
                      variant={index ? 'secondary' : 'brand'}
                      size="lg"
                      withArrow={!index}
                      className="h-14 w-full rounded-pill sm:h-auto sm:w-auto"
                    >
                      {link.label}
                    </Button>
                  </a>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/podcast" />
    </div>
  );
}
