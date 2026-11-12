import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { ServiceLandingPage } from '@/pages/ServiceLandingPage';
import { AdminPage } from '@/pages/AdminPage';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SiteSettingsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-ivory text-ink">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/admin/portfolio" element={<AdminPage section="portfolio" />} />
                <Route path="/admin/checklist" element={<AdminPage section="checklist" />} />
                <Route path="/admin/contact" element={<AdminPage section="contact" />} />
                <Route path="/:slug" element={<ServiceLandingPage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingActions />
          </div>
        </BrowserRouter>
      </SiteSettingsProvider>
    </LanguageProvider>
  );
};

export default App;

