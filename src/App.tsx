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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FloatingNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teaching" element={<TeachingPage />} />
        <Route path="/ministry" element={<MinistryPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
