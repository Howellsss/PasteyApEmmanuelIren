import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
  ArchivePage,
  BooksPage,
  IrensPage,
  MediaOverviewPage,
  MessagesPage,
  ReelsPage,
  ResourcesPage,
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
  '/media/messages': {
    title: `Messages — ${SITE}`,
    description: 'Recent sermons and teachings by Apostle Emmanuel Iren, to watch in full.',
  },
  '/media/resources': {
    title: `Message Resources — ${SITE}`,
    description: 'Sermon notes, scripture references, discussion guides and transcripts, shared on request.',
  },
  '/media/the-irens': {
    title: `The Irens — ${SITE}`,
    description: 'Emmanuel and Laju Iren, and the family beneath the public work.',
  },
  '/media/books': {
    title: `The Books — ${SITE}`,
    description: 'Six books by Emmanuel Iren on leadership, purpose, grace, love, discernment and prayer.',
  },
  '/media/archive': {
    title: `Archive — ${SITE}`,
    description: 'The series, programmes, podcasts and gatherings behind the teaching of Apostle Emmanuel Iren.',
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

/** Resets scroll and sets the per-page title and description on navigation. */
function RouteEffects() {
  const { pathname } = useLocation();

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
        <Route path="/media/messages" element={<MessagesPage />} />
        <Route path="/media/resources" element={<ResourcesPage />} />
        <Route path="/media/the-irens" element={<IrensPage />} />
        <Route path="/media/books" element={<BooksPage />} />
        <Route path="/media/archive" element={<ArchivePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
