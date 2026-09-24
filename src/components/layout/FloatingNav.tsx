import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Teaching', path: '/teaching' },
  { label: 'Ministry', path: '/ministry' },
  { label: 'Events', path: '/events' },
  { label: 'Invite', path: '/invite' },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const listRef = useRef<HTMLUListElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bar, setBar] = useState<{ left: number; top: number; width: number } | null>(null);

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
  );
  // The underline sits under the hovered link, and returns to the current page's link on leave.
  const barIndex = hoveredIndex ?? (activeIndex >= 0 ? activeIndex : null);

  useLayoutEffect(() => {
    const measure = () => {
      const label = barIndex === null ? null : labelRefs.current[barIndex];
      const list = listRef.current;
      if (!label || !list) {
        setBar(null);
        return;
      }
      const l = label.getBoundingClientRect();
      const r = list.getBoundingClientRect();
      // The line runs a little wider than the word, sitting near the bar's lower edge.
      setBar({ left: l.left - r.left - 10, top: l.bottom - r.top + 12, width: l.width + 20 });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [barIndex]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out-quart',
          'w-[calc(100%-2rem)] max-w-[80rem]'
        )}
      >
        <div
          className={cn(
            'flex min-h-[80px] items-center justify-between gap-4 rounded-pill pl-3 pr-2 transition-colors duration-500 ease-out-quart',
            // A darker, more solid bar with a soft edge; it deepens a little once the page scrolls.
            'backdrop-blur-md border border-white/10',
            scrolled ? 'bg-ink-2/90' : 'bg-ink-2/70'
          )}
        >
          <NavLink
            to="/"
            aria-label="Apostle Emmanuel Iren — home"
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/15 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img src="/favicon.svg" alt="" className="h-full w-full" />
          </NavLink>

          <ul
            ref={listRef}
            className="relative hidden lg:flex flex-1 items-center justify-evenly gap-1 px-4"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={cn(
                    'relative px-3 py-2 text-base font-medium rounded-pill transition-colors duration-300',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                    // The red travels with the underline: only the link it sits under is highlighted.
                    index === barIndex ? 'text-accent' : 'text-cream'
                  )}
                >
                  <span
                    ref={(el) => {
                      labelRefs.current[index] = el;
                    }}
                    className="relative inline-block"
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-0.5 rounded-pill bg-brand transition-all duration-300 ease-out-quart"
              style={{
                left: bar?.left ?? 0,
                top: bar?.top ?? 0,
                width: bar?.width ?? 0,
                opacity: bar ? 1 : 0,
              }}
            />
          </ul>

          {/* Contact CTA — contained within the nav */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                'hidden lg:inline-flex items-center px-7 py-3.5 text-base font-semibold rounded-pill transition-colors duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                isActive
                  ? 'bg-brand-dark text-cream'
                  : 'bg-brand text-cream hover:bg-brand-dark'
              )
            }
          >
            Contact
          </NavLink>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-11 h-11 mr-1 text-cream rounded-pill hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-out-quart',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-ink-2/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ink flex flex-col transition-transform duration-500 ease-out-quart',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-line">
            <span className="text-eyebrow uppercase tracking-[0.2em] text-ash">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 text-cream rounded-pill hover:bg-surface transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="flex flex-col px-6 py-4 overflow-y-auto">
            {[...NAV_ITEMS, { label: 'Contact', path: '/contact' }].map((item, index) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-baseline gap-4 border-b border-line py-4 font-sans text-2xl font-extrabold tracking-[-0.03em] transition-colors duration-300 focus:outline-none focus-visible:text-accent',
                      isActive ? 'text-accent' : 'text-cream hover:text-accent'
                    )
                  }
                >
                  <span className="text-[0.8125rem] font-semibold tabular-nums tracking-normal text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-line p-6">
            <NavLink
              to="/invite"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 rounded-button bg-cream px-6 py-4 text-base font-semibold text-ink transition-colors duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Invite Emmanuel <ArrowRight className="h-4 w-4 text-accent" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
