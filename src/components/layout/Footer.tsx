import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Instagram, Youtube, Twitter } from 'lucide-react';
import { CONTACT_EMAIL, ministryLinks } from '@/data/media';

type FooterLink = { label: string; to?: string; href?: string };

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Teaching', to: '/teaching' },
    { label: 'Media', to: '/media' },
    { label: 'Events', to: '/events' },
  ],
  Ministry: [
    { label: 'Celebration Church', href: ministryLinks['Celebration Church International'].url },
    { label: 'Manifest', href: ministryLinks.Manifest.url },
    { label: 'Triumph30', href: ministryLinks.Triumph30.url },
    { label: 'Outburst', href: ministryLinks.Outburst.url },
  ],
  Connect: [
    { label: 'Invite Emmanuel', to: '/invite' },
    { label: 'Contact', to: '/contact' },
  ],
};

// Add each profile URL to show its icon; entries without a URL stay hidden so no icon leads nowhere.
const SOCIALS = [
  { icon: Instagram, href: '', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@pst_iren', label: 'YouTube' },
  { icon: Twitter, href: 'https://x.com/pst_iren', label: 'X (Twitter)' },
].filter((social) => social.href);

export function Footer() {
  return (
    <footer className="bg-ink-2 text-cream border-t-2 border-brand">
      <div className="container-wide py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <p className="text-eyebrow text-ash uppercase tracking-widest mb-4">
              Emmanuel Iren
            </p>
            <h2 className="font-display text-3xl lg:text-4xl leading-tight text-balance mb-6">
              Teaching the word, creating with purpose, building the church<span className="text-brand">.</span>
            </h2>
            <p className="text-ash text-sm max-w-md leading-relaxed">
              Apostle, author, and creative leader. Founder of Celebration Church International.
              This is the digital home for the work and the word.
            </p>
            <div className="flex items-center gap-3 mt-8">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-pill border border-line text-ash hover:text-accent hover:border-brand transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Email ${CONTACT_EMAIL}`}
                className="flex items-center justify-center w-10 h-10 rounded-pill border border-line text-ash hover:text-accent hover:border-brand transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block break-all text-sm text-cream transition-colors duration-300 hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-eyebrow text-ash uppercase tracking-widest mb-5">
                  {heading}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-sm text-cream hover:text-accent transition-colors duration-300"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      ) : (
                        <Link
                          to={link.to ?? '/'}
                          className="group inline-flex items-center gap-1 text-sm text-cream hover:text-accent transition-colors duration-300"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-meta text-ash">
            © {new Date().getFullYear()} Emmanuel Iren. All rights reserved.
          </p>
          <p className="text-meta text-ash">
            Celebration Church International · Manifest · Triumph30 · Outburst
          </p>
        </div>
      </div>
    </footer>
  );
}
