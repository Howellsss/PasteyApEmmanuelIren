import { ArrowUpRight, Music2 } from 'lucide-react';
import { MediaHero, MediaSubnav, MoreFromMedia } from '@/components/media/MediaLayout';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { musicProfiles, musicVideos, youtubeThumb, youtubeWatch } from '@/data/media';

export function MusicPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Music."
        accent="Songs of worship."
        intro="Albums, singles and live recordings — from Kerygma to Apostolos and Spirituals — carrying the same message in song."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="01" eyebrow="Listen" title="Stream" accent="the music." />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {musicProfiles.map((profile, index) => (
              <Reveal key={profile.name} variant={index ? 'right' : 'left'} delay={index * 120}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-4 rounded-soft bg-ink-2 p-4 transition-colors duration-300 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:gap-6 sm:p-6"
                >
                  <img
                    src={profile.art}
                    alt={profile.artAlt}
                    loading="lazy"
                    className="aspect-square w-28 flex-shrink-0 rounded-[3px] object-cover shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] sm:w-40"
                  />
                  <div>
                    <p className="flex items-center gap-2 text-eyebrow uppercase tracking-[0.16em] text-accent">
                      <Music2 className="h-4 w-4" /> {profile.name}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash sm:mt-3 sm:text-base">
                      {profile.description}
                    </p>
                    <span className="mt-3 inline-flex sm:mt-5 items-center gap-1.5 text-sm font-medium text-cream transition-colors duration-300 group-hover:text-accent">
                      {profile.action} <ArrowUpRight className="h-4 w-4 text-accent" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <Reveal variant="left" className="mb-10">
            <DisplayHeading number="02" eyebrow="Official videos" title="Watch" accent="the songs." />
          </Reveal>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
            {musicVideos.map((video, index) => (
              <Reveal key={video.id} variant="up" delay={(index % 4) * 80}>
                <a
                  href={youtubeWatch(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative aspect-video overflow-hidden rounded-md bg-surface">
                    <img
                      src={youtubeThumb(video.id, video.hiRes)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base leading-snug text-cream transition-colors duration-300 group-hover:text-accent sm:mt-3 sm:text-lg">
                    {video.title}
                  </h3>
                  {video.featuring && <p className="mt-0.5 text-xs text-ash sm:text-sm">feat. {video.featuring}</p>}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <MoreFromMedia current="/media/music" />
    </div>
  );
}
