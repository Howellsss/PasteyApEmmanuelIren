import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/cn';
import { PhotoViewer } from './PhotoViewer';

/* The Irens photo album: four short chapters and a closing pair, read top to bottom like a book. */

interface AlbumPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const photo = (n: number, alt: string, width: number, height: number): AlbumPhoto => ({
  src: `/images/irens/irens-${String(n).padStart(2, '0')}.webp`,
  alt,
  width,
  height,
});

// In album order; the number is the photo's place in the viewer.
const PHOTOS: AlbumPhoto[] = [
  photo(1, 'Emmanuel and Laju Iren, he in a blue pinstripe suit, she in white lace', 447, 447),
  photo(2, 'Laju resting her head on Emmanuel’s shoulder, both laughing', 447, 447),
  photo(3, 'Emmanuel in a brown suit and Laju in a red gown, standing together', 447, 447),
  photo(4, 'Laju leaning into Emmanuel, both smiling', 494, 619),
  photo(5, 'Emmanuel and Laju seated together in gold and floral', 447, 447),
  photo(6, 'Emmanuel raising a hand in celebration beside Laju', 494, 619),
  photo(7, 'Emmanuel holding Laju from behind, both in silver and grey', 497, 616),
  photo(8, 'Laju in a flowing blue gown, embraced by Emmanuel', 494, 619),
  photo(9, 'Emmanuel and Laju forehead to forehead', 497, 618),
  photo(10, 'The Iren family in matching blue aso-oke', 494, 619),
  photo(11, 'Emmanuel and Laju holding their newborn son', 497, 616),
  photo(12, 'The three Iren daughters lying around their baby brother', 447, 447),
  photo(13, 'The Iren family together on a sofa in matching blue', 678, 452),
  photo(14, 'The Iren family dressed for a formal portrait', 447, 447),
  photo(15, 'Laju Iren in a green and gold print', 399, 501),
  photo(16, 'Laju Iren in a pale green shirt', 480, 640),
  photo(17, 'Emmanuel and Laju outdoors, dressed in blue', 399, 501),
  photo(18, 'Emmanuel and Laju in a garden, he in gold, she in coral', 447, 447),
  photo(19, 'Emmanuel and Laju smiling at an event', 688, 445),
  photo(20, 'Emmanuel and Laju in matching blue aso-oke', 387, 516),
  photo(21, 'Emmanuel and Laju, a close portrait', 738, 414),
  photo(22, 'Emmanuel and Laju sharing a kiss, ringed in light', 414, 483),
  photo(23, 'Emmanuel Iren on stage in yellow, mid-praise', 554, 554),
];

/** Moves an element slightly against the scroll, so the album has depth. Off for reduced motion. */
function useParallax<T extends HTMLElement>(strength: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !strength || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // -1 when the photo sits a screen above the middle, 1 a screen below; held there beyond.
      const offset = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
      el.style.transform = `translate3d(0, ${(-offset * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [strength]);
  return ref;
}

interface FrameProps {
  n: number;
  onOpen: (index: number) => void;
  /** Grid placement and offsets. */
  className?: string;
  /** Pixels of drift against the scroll; negative drifts the other way. */
  depth?: number;
  delay?: number;
}

/** One photograph: a curtain wipe and slow zoom as it arrives, a gentle drift while scrolling. */
function Frame({ n, onOpen, className, depth = 0, delay = 0 }: FrameProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const drift = useParallax<HTMLDivElement>(depth);
  const p = PHOTOS[n - 1];
  return (
    <div ref={ref} className={className}>
      <div ref={drift} className="will-change-transform">
        <button
          type="button"
          onClick={() => onOpen(n - 1)}
          aria-label={`Open photograph: ${p.alt}`}
          className={cn('album-frame group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent', visible && 'is-visible')}
          style={{ '--album-delay': `${delay}ms` } as CSSProperties}
        >
          <span className="album-curtain block overflow-hidden rounded-soft bg-surface">
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="album-img block h-auto w-full" />
          </span>
          <span className="mt-3 flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.22em] text-ash">
            <span className="tabular-nums text-accent">{String(n).padStart(2, '0')}</span>
            <span aria-hidden="true" className="album-rule h-px w-8 bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-brand" />
          </span>
        </button>
      </div>
    </div>
  );
}

function ChapterTitle({ numeral, title, accent, children, className }: { numeral: string; title: string; accent?: string; children?: ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn('album-title', visible && 'is-visible', className)}>
      <p className="album-title-line flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.28em] text-accent">
        <span className="font-display text-base normal-case tracking-normal">{numeral}</span>
        <span aria-hidden="true" className="h-px w-12 bg-brand" />
      </p>
      <h2 className="album-title-line mt-5 font-display text-4xl leading-[1.02] tracking-[-0.01em] text-cream text-balance sm:text-5xl lg:text-6xl" style={{ transitionDelay: '120ms' }}>
        {title}
        {accent && <> <span className="text-brand">{accent}</span></>}
      </h2>
      {children && (
        <p className="album-title-line mt-5 max-w-md text-base leading-relaxed text-ash sm:text-lg" style={{ transitionDelay: '240ms' }}>
          {children}
        </p>
      )}
    </div>
  );
}

/** A slow, endless strip of every photograph between chapters; it pauses under the pointer. */
function FilmStrip({ onOpen }: { onOpen: (index: number) => void }) {
  const strip = [...PHOTOS, ...PHOTOS];
  return (
    <div className="album-strip relative overflow-hidden py-4" aria-label="All photographs">
      <div className="album-strip-track flex w-max gap-4">
        {strip.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            tabIndex={i < PHOTOS.length ? 0 : -1}
            aria-hidden={i >= PHOTOS.length}
            onClick={() => onOpen(i % PHOTOS.length)}
            aria-label={`Open photograph: ${p.alt}`}
            className="h-40 flex-shrink-0 overflow-hidden rounded-soft bg-surface opacity-70 transition-opacity duration-500 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-56"
          >
            <img src={p.src} alt="" loading="lazy" className="h-full w-auto object-cover" width={p.width} height={p.height} />
          </button>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />
    </div>
  );
}

/** A thin gold line at the top of the window showing how far through the album the reader is. */
function AlbumProgress({ target }: { target: React.RefObject<HTMLElement> }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = target.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [target]);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div className="h-full origin-left bg-brand transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export function IrensAlbum() {
  const [open, setOpen] = useState<number | null>(null);
  const album = useRef<HTMLElement>(null);
  const f = (n: number, className: string, depth = 0, delay = 0) => (
    <Frame n={n} onOpen={setOpen} className={className} depth={depth} delay={delay} />
  );

  return (
    <section ref={album} aria-label="Photo album" className="relative py-16 md:py-24 lg:py-32">
      <AlbumProgress target={album} />

      {/* I — The two of them */}
      <div className="container-wide">
        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {f(1, 'col-span-6 sm:col-span-4 lg:col-span-5')}
          <ChapterTitle numeral="I" title="Two," accent="before everything." className="col-span-6 lg:col-span-6 lg:col-start-7">
            Married in November 2014 — the partnership the rest of the work is built on.
          </ChapterTitle>
        </div>
        <div className="mt-16 grid grid-cols-6 items-start gap-x-4 gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          {f(3, 'col-span-4 lg:col-span-4', 30)}
          {f(4, 'col-span-4 col-start-3 lg:col-span-4 lg:col-start-5 lg:mt-24', -20, 120)}
          {f(5, 'col-span-4 lg:col-span-4 lg:col-start-9 lg:mt-48', 40, 240)}
        </div>
        <div className="mt-16 grid grid-cols-6 items-center gap-x-4 gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          {f(2, 'col-span-6 lg:col-span-5 lg:col-start-2', -25)}
          {f(6, 'col-span-4 col-start-3 lg:col-span-4 lg:col-start-8 lg:mt-32', 45, 150)}
        </div>
      </div>

      {/* A breath between chapters */}
      <QuoteBand>A home before a platform.</QuoteBand>

      <div className="container-wide">
        <div className="grid grid-cols-6 items-start gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {f(7, 'col-span-4 lg:col-span-4 lg:mt-40', 35)}
          {f(8, 'col-span-4 col-start-3 lg:col-span-4 lg:col-start-5 lg:mt-16', -20, 120)}
          {f(9, 'col-span-4 lg:col-span-4 lg:col-start-9', 30, 240)}
        </div>
      </div>

      <div className="mt-20 lg:mt-32">
        <FilmStrip onOpen={setOpen} />
      </div>

      {/* II — The children */}
      <div className="container-wide mt-20 lg:mt-32">
        <div className="grid grid-cols-6 items-end gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <ChapterTitle numeral="II" title="Then came" accent="the children." className="col-span-6 lg:col-span-5">
            Three daughters and one son — a full house, and the first congregation.
          </ChapterTitle>
          {f(10, 'col-span-5 col-start-2 lg:col-span-5 lg:col-start-8', -30)}
        </div>
        <div className="mt-16 grid grid-cols-6 items-start gap-x-4 gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          {f(13, 'col-span-6 lg:col-span-7', 20)}
          {f(11, 'col-span-4 col-start-3 lg:col-span-4 lg:col-start-9 lg:mt-36', -35, 150)}
        </div>
        <div className="mt-16 grid grid-cols-6 items-start gap-x-4 gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          {f(12, 'col-span-4 lg:col-span-4 lg:col-start-2', 30)}
          {f(14, 'col-span-4 col-start-3 lg:col-span-4 lg:col-start-7 lg:mt-28', -25, 150)}
        </div>
      </div>

      {/* III — Laju */}
      <div className="container-wide mt-24 lg:mt-40">
        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {f(15, 'col-span-3 lg:col-span-3 lg:col-start-2', 30)}
          {f(16, 'col-span-3 mt-12 lg:col-span-3 lg:mt-32', -30, 150)}
          <ChapterTitle numeral="III" title="Laju" accent="Iren." className="col-span-6 lg:col-span-4 lg:col-start-9">
            Wife, mother, and the other half of every story told here.
          </ChapterTitle>
        </div>
      </div>

      {/* IV — In between */}
      <div className="container-wide mt-24 lg:mt-40">
        <ChapterTitle numeral="IV" title="In between" accent="the big days." className="mb-12 lg:mb-20">
          Weddings, garden afternoons and quiet portraits — the ordinary days that hold the rest.
        </ChapterTitle>
        <div className="grid grid-cols-6 items-start gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {f(21, 'col-span-6 lg:col-span-7', 20)}
          {f(17, 'col-span-4 col-start-2 lg:col-span-3 lg:col-start-9 lg:mt-24', -30, 150)}
        </div>
        <div className="mt-12 grid grid-cols-6 items-start gap-x-4 gap-y-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          {f(18, 'col-span-3 lg:col-span-4', 30)}
          {f(20, 'col-span-3 mt-10 lg:col-span-3 lg:col-start-5 lg:mt-36', -25, 120)}
          {f(19, 'col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-12', 35, 240)}
        </div>
      </div>

      {/* Finale */}
      <div className="container-wide mt-24 lg:mt-40">
        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {f(22, 'col-span-3 lg:col-span-3 lg:col-start-2', -30)}
          <ChapterTitle numeral="—" title="Home," accent="first." className="col-span-6 row-start-1 text-center lg:col-span-4 lg:col-start-5 lg:row-start-auto [&_p]:mx-auto [&_p]:justify-center">
            The man in the pulpit is, before anything else, a husband and a father.
          </ChapterTitle>
          {f(23, 'col-span-3 lg:col-span-3 lg:col-start-10', 30, 150)}
        </div>
      </div>

      <PhotoViewer photos={PHOTOS} index={open} onChange={setOpen} />
    </section>
  );
}

function QuoteBand({ children }: { children: ReactNode }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={cn('album-quote container-wide my-20 text-center lg:my-32', visible && 'is-visible')}>
      <span aria-hidden="true" className="album-quote-rule mx-auto block h-px w-24 bg-brand" />
      <p className="mx-auto mt-8 max-w-3xl font-display text-3xl leading-tight text-cream text-balance sm:text-4xl lg:text-5xl">{children}</p>
      <span aria-hidden="true" className="album-quote-rule mx-auto mt-8 block h-px w-24 bg-brand" />
    </div>
  );
}
