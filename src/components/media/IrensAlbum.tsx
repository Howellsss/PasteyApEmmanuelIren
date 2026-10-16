import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/cn';
import { PhotoViewer } from './PhotoViewer';

/* The Irens photo album: three chapters of photographs in even, edge-to-edge rows, read top to bottom. */

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

/** A thin gold line at the top of the window showing how far through the album the reader is. */
function AlbumProgress({ target }: { target: RefObject<HTMLElement> }) {
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

/** One photograph in a row: it takes its share of the row's width by its shape, so every row ends flush. */
function Frame({ n, onOpen, delay }: { n: number; onOpen: (index: number) => void; delay: number }) {
  const { ref, visible } = useReveal<HTMLButtonElement>(0.15);
  const p = PHOTOS[n - 1];
  const ratio = p.width / p.height;
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(n - 1)}
      aria-label={`Open photograph: ${p.alt}`}
      className={cn('album-frame group relative min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent', visible && 'is-visible')}
      style={{ flex: `${ratio} 1 0%`, aspectRatio: `${p.width} / ${p.height}`, '--album-delay': `${delay}ms` } as CSSProperties}
    >
      <span className="album-curtain absolute inset-0 overflow-hidden rounded-[3px] bg-surface">
        <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="album-img h-full w-full object-cover" />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 text-[0.6875rem] uppercase tracking-[0.22em] text-cream opacity-0 transition-opacity duration-500 tabular-nums group-hover:opacity-100">
          {String(n).padStart(2, '0')}
        </span>
      </span>
    </button>
  );
}

/**
 * Rows of photographs at one height, filling the width edge to edge. Phones show them two at a time.
 */
function PhotoRows({ rows, onOpen }: { rows: number[][]; onOpen: (index: number) => void }) {
  // Phones: the chapter's photographs in pairs, the last three together when the count is odd.
  const all = rows.flat();
  const phoneRows: number[][] = [];
  for (let i = 0; i < all.length; i += 2) phoneRows.push(all.slice(i, i + 2));
  if (phoneRows.length > 1 && phoneRows[phoneRows.length - 1].length === 1) phoneRows[phoneRows.length - 2].push(phoneRows.pop()![0]);
  const render = (list: number[][], className: string) => (
    <div className={cn('flex-col gap-2 lg:gap-3', className)}>
      {list.map((row) => (
        <div key={row.join('-')} className="flex gap-2 lg:gap-3">
          {row.map((n, i) => (
            <Frame key={n} n={n} onOpen={onOpen} delay={i * 110} />
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <>
      {render(rows, 'hidden sm:flex')}
      {render(phoneRows, 'flex sm:hidden')}
    </>
  );
}

function ChapterTitle({ numeral, title, accent, children, className }: { numeral: string; title: string; accent?: string; children?: ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn('album-title flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10', visible && 'is-visible', className)}>
      <h2 className="album-title-line flex items-baseline gap-4 font-display text-3xl leading-none tracking-[-0.01em] text-cream sm:text-4xl lg:text-5xl">
        <span className="text-base text-accent sm:text-lg">{numeral}</span>
        <span>
          {title}
          {accent && <> <span className="text-brand">{accent}</span></>}
        </span>
      </h2>
      {children && (
        <p className="album-title-line max-w-sm text-sm leading-relaxed text-ash sm:text-right" style={{ transitionDelay: '150ms' }}>
          {children}
        </p>
      )}
    </div>
  );
}

export function IrensAlbum() {
  const [open, setOpen] = useState<number | null>(null);
  const album = useRef<HTMLElement>(null);

  return (
    <section ref={album} aria-label="Photo album" className="relative py-14 md:py-20 lg:py-24">
      <AlbumProgress target={album} />
      <div className="container-wide space-y-16 lg:space-y-24">
        <div>
          <ChapterTitle numeral="I" title="Two," accent="before everything." className="mb-6 lg:mb-8">
            Married in November 2014 — the partnership the rest of the work is built on.
          </ChapterTitle>
          <PhotoRows rows={[[1, 4, 2, 6], [3, 7, 5, 8, 9]]} onOpen={setOpen} />
        </div>

        <div>
          <ChapterTitle numeral="II" title="Then came" accent="the children." className="mb-6 lg:mb-8">
            Three daughters and one son — a full house, and the first congregation.
          </ChapterTitle>
          <PhotoRows rows={[[10, 13, 11], [12, 14, 15, 16]]} onOpen={setOpen} />
        </div>

        <div>
          <ChapterTitle numeral="III" title="In between" accent="the big days." className="mb-6 lg:mb-8">
            Weddings, garden afternoons and quiet portraits — the ordinary days that hold the rest.
          </ChapterTitle>
          <PhotoRows rows={[[21, 18, 17], [19, 20, 22, 23]]} onOpen={setOpen} />
        </div>

        <ClosingLine />
      </div>
      <PhotoViewer photos={PHOTOS} index={open} onChange={setOpen} />
    </section>
  );
}

function ClosingLine() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={cn('album-quote text-center', visible && 'is-visible')}>
      <span aria-hidden="true" className="album-quote-rule mx-auto block h-px w-24 bg-brand" />
      <p className="mx-auto mt-8 max-w-3xl font-display text-3xl leading-tight text-cream text-balance sm:text-4xl lg:text-5xl">
        Home, <span className="text-brand">first.</span>
      </p>
      <p className="mx-auto mt-4 max-w-md text-ash">The man in the pulpit is, before anything else, a husband and a father.</p>
    </div>
  );
}
