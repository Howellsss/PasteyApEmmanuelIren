import { useState } from 'react';
import { MediaHero, MediaSubnav, MoreFromMedia } from '@/components/media/MediaLayout';
import { PhotoViewer } from '@/components/media/PhotoViewer';
import { galleryPhotos, type GalleryCategory } from '@/data/media';
import { cn } from '@/lib/cn';

const GALLERY_FILTERS: ('All' | GalleryCategory)[] = ['All', 'On stage', 'Portraits', 'Studio'];

export function GalleryPage() {
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photos = filter === 'All' ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <MediaHero
        title="Gallery."
        accent="In pictures."
        intro="Photographs from the pulpit, the studio and the quieter moments in between."
      />
      <MediaSubnav />
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter photographs">
            {GALLERY_FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
                className={cn(
                  'rounded-pill border px-4 py-2 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  filter === name
                    ? 'border-brand bg-brand text-cream'
                    : 'border-line text-ash hover:border-cream/40 hover:text-cream'
                )}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photograph: ${photo.alt}`}
                className="group relative mb-3 block w-full overflow-hidden rounded-soft bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mb-4 [break-inside:avoid]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-left text-eyebrow uppercase tracking-[0.16em] text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {photo.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <PhotoViewer photos={photos} index={openIndex} onChange={setOpenIndex} />

      <MoreFromMedia current="/media/gallery" />
    </div>
  );
}
