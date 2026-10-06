import { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { FloatingNav } from '@/components/layout/FloatingNav';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { TeachingPage } from '@/pages/TeachingPage';
import { MinistryPage } from '@/pages/MinistryPage';
import { EventsPage } from '@/pages/EventsPage';
import { InvitePage } from '@/pages/InvitePage';
import { ContactPage } from '@/pages/ContactPage';
import {
  BooksPage,
  GalleryPage,
  IrensPage,
  MediaOverviewPage,
  ReelsPage,
} from '@/pages/MediaPages';

const SITE = 'Apostle Emmanuel Iren';

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE} — Teacher, Author, Founder of Celebration Church International`,
    description: 'The digital home of Apostle Emmanuel Iren — teachings, ministry, events, and invitations.',
  },
  '/about': {
    title: `About — ${SITE}`,
    description: 'The journey, calling, and ministry of Apostle Emmanuel Iren, from a campus fellowship to a global church.',
  },
  '/teaching': {
    title: `Teachings — ${SITE}`,
    description: 'Sermons, series, and conversations from Apostle Emmanuel Iren to help you know Christ and live purposefully.',
  },
  '/ministry': {
    title: `Ministry — ${SITE}`,
    description: 'Celebration Church International, Manifest, Triumph30, and Outburst — one calling, many expressions.',
  },
  '/media': {
    title: `Media — ${SITE}`,
    description: 'Sermons, reels, resources, books and family — the message of Apostle Emmanuel Iren in every form.',
  },
  '/media/reels': {
    title: `Reels — ${SITE}`,
    description: 'Short moments from recent messages by Apostle Emmanuel Iren.',
  },
  '/media/gallery': {
    title: `Gallery — ${SITE}`,
    description: 'Photographs of Apostle Emmanuel Iren from the pulpit, the studio and beyond.',
  },
  '/media/the-irens': {
    title: `The Irens — ${SITE}`,
    description: 'Emmanuel and Laju Iren, and the family beneath the public work.',
  },
  '/media/books': {
    title: `The Books — ${SITE}`,
    description: 'Six books by Emmanuel Iren on leadership, purpose, grace, love, discernment and prayer.',
  },
  '/events': {
    title: `Events — ${SITE}`,
    description: 'Where Apostle Emmanuel Iren is ministering: upcoming gatherings and past appearances.',
  },
  '/invite': {
    title: `Invite Emmanuel — ${SITE}`,
    description: 'Invite Apostle Emmanuel Iren to speak at your church, conference, or event.',
  },
  '/contact': {
    title: `Contact — ${SITE}`,
    description: 'Get in touch for general enquiries, partnerships, or media requests.',
  },
};

/** Resets scroll (or goes to a #section) and sets the per-page title and description on navigation. */
function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Wait for the page to render and the top-of-page scroll to run, then go to the section.
    const id = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const meta = PAGE_META[pathname] ?? PAGE_META['/'];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <FloatingNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teaching" element={<TeachingPage />} />
        <Route path="/ministry" element={<MinistryPage />} />
        <Route path="/media" element={<MediaOverviewPage />} />
        <Route path="/media/reels" element={<ReelsPage />} />
        <Route path="/media/gallery" element={<GalleryPage />} />
        {/* Messages, resources and the archive moved to the Teaching page; old links land on the matching section. */}
        <Route path="/media/messages" element={<Navigate to={{ pathname: '/teaching', hash: '#latest' }} replace />} />
        <Route path="/media/resources" element={<Navigate to={{ pathname: '/teaching', hash: '#notes' }} replace />} />
        <Route path="/media/the-irens" element={<IrensPage />} />
        <Route path="/media/books" element={<BooksPage />} />
        <Route path="/media/archive" element={<Navigate to={{ pathname: '/teaching', hash: '#series' }} replace />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
