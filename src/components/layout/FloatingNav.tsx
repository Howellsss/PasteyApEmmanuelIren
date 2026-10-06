import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { mediaSections } from '@/data/media';
import { toggleHeroSound, useHeroSound } from '@/lib/heroSound';

type NavItem = { label: string; path: string; children?: { label: string; path: string }[] };

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Teaching', path: '/teaching' },
  { label: 'Ministry', path: '/ministry' },
  { label: 'Media', path: '/media', children: mediaSections },
  { label: 'Events', path: '/events' },
  { label: 'Invite', path: '/invite' },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const heroSound = useHeroSound();
  const listRef = useRef<HTMLUListElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bar, setBar] = useState<{ left: number; top: number; width: number } | null>(null);
  // Desktop: which dropdown is open. Phone: whether the Media group is expanded in the menu card.
  const [dropdownPath, setDropdownPath] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);

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
    setDropdownPath(null);
    setMobileExpanded(location.pathname.startsWith('/media'));
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDropdownPath(null);
      setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
          'w-[calc(100%-2.5rem)] sm:w-[calc(100%-2rem)] max-w-[80rem]'
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
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink ring-1 ring-white/15 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img src="/logo-mark.png" alt="" className="h-6 w-auto" />
          </NavLink>

          <ul
            ref={listRef}
            className="relative hidden lg:flex flex-1 items-center justify-evenly gap-1 px-4"
            onMouseLeave={() => {
              setHoveredIndex(null);
              setDropdownPath(null);
            }}
          >
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.path}
                className={cn(item.children && 'relative')}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setDropdownPath(item.children ? item.path : null);
                }}
                onFocus={() => {
                  setHoveredIndex(index);
                  if (item.children) setDropdownPath(item.path);
                }}
                onBlur={(event) => {
                  if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
                  setHoveredIndex(null);
                  setDropdownPath(null);
                }}
              >
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children ? dropdownPath === item.path : undefined}
                  className={cn(
                    'relative inline-flex items-center gap-1 px-3 py-2 text-base font-medium rounded-pill transition-colors duration-300',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                    // The gold travels with the underline: only the link it sits under is highlighted.
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
                  {item.children && (
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('h-4 w-4 transition-transform duration-300', dropdownPath === item.path && 'rotate-180')}
                    />
                  )}
                </NavLink>
                {item.children && (
                  // The padding bridges the gap to the panel so the pointer can travel down without closing it.
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-10 -translate-x-1/2 pt-7 transition-all duration-300 ease-out-quart',
                      dropdownPath === item.path ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                    )}
                  >
                    <ul className="min-w-[15rem] rounded-2xl border border-white/10 bg-ink-2 p-2 shadow-2xl shadow-black/50">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            end
                            className={({ isActive }) =>
                              cn(
                                'block rounded-xl px-4 py-2.5 text-[0.9375rem] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                isActive ? 'bg-white/5 text-accent' : 'text-cream hover:bg-white/5 hover:text-accent'
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

          <div className="flex items-center gap-2">
            {/* Hero video sound: a quiet round toggle, shown only while the home video is on the page. */}
            {heroSound.available && (
              <button
                type="button"
                data-hero-sound-toggle
                onClick={toggleHeroSound}
                aria-pressed={!heroSound.muted}
                aria-label={heroSound.muted ? 'Unmute video' : 'Mute video'}
                title={heroSound.muted ? 'Unmute' : 'Mute'}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-cream transition-colors duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {heroSound.muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            )}

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
        </div>
      </nav>

      {/* Phone menu: a floating card over the blurred page, with the current page highlighted. */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ease-out-quart',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
        <div className="relative flex h-full flex-col overflow-y-auto px-5 pb-8 pt-5">
          <div className="flex items-center justify-between">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink ring-1 ring-white/15">
                <img src="/logo-mark.png" alt="" className="h-5 w-auto" />
              </span>
              <span className="font-display text-2xl text-cream">
                Emmanuel <span className="text-brand">Iren</span>
              </span>
            </NavLink>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-ink text-cream transition-colors duration-300 hover:bg-ink-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className={cn(
              'mt-6 rounded-[2rem] border border-white/10 bg-ink/95 p-3 shadow-2xl shadow-black/50 transition-all duration-500 ease-out-quart',
              menuOpen ? 'translate-y-0 scale-100' : '-translate-y-2 scale-[0.98]'
            )}
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
                return (
                  <li key={item.path}>
                    <div className={cn('flex items-center rounded-[1.25rem] transition-colors duration-300', active ? 'bg-surface' : 'hover:bg-white/5')}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          'flex-1 px-6 py-4 text-[1.375rem] transition-colors duration-300 focus:outline-none focus-visible:text-accent',
                          active ? 'text-cream' : 'text-cream/85'
                        )}
                      >
                        {item.label}
                      </NavLink>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setMobileExpanded((open) => !open)}
                          aria-expanded={mobileExpanded}
                          aria-label={mobileExpanded ? 'Hide media pages' : 'Show media pages'}
                          className="mr-3 flex h-11 w-11 items-center justify-center rounded-full text-cream/85 transition-colors duration-300 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <ChevronDown className={cn('h-6 w-6 transition-transform duration-300', mobileExpanded && 'rotate-180')} />
                        </button>
                      )}
                    </div>
                    {item.children && mobileExpanded && (
                      <ul className="mb-2 ml-6 mt-1 border-l border-line pl-4">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              end
                              onClick={() => setMenuOpen(false)}
                              className={({ isActive }) =>
                                cn(
                                  'block rounded-xl px-3 py-2.5 text-lg transition-colors duration-300',
                                  isActive ? 'text-accent' : 'text-ash hover:text-cream'
                                )
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block rounded-[1.25rem] bg-brand py-5 text-center text-xl font-semibold text-cream transition-colors duration-300 hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Get in Touch
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
