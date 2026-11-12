import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Globe, Mail, Menu, Phone, X } from 'lucide-react';
import { BRAND_LOGO_URL, CONTACT_INFO } from '@/data/siteData';
import { SERVICES_LIST } from '@/data/servicesData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { lang, setLang, t, L } = useLanguage();
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const isServiceActive = SERVICES_LIST.some((s) => `/${s.slug}` === pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top Info Strip */}
      <div className="bg-forest text-white/90 text-xs">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5 min-w-0">
            <a
              href={`tel:${settings.phoneRaw}`}
              className="inline-flex items-center gap-1.5 hover:text-white font-medium shrink-0"
            >
              <Phone className="h-3.5 w-3.5 text-brand-glow" />
              <span>+91 {settings.phone}</span>
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white text-white/75 truncate"
            >
              <Mail className="h-3.5 w-3.5 text-brand-glow shrink-0" />
              <span className="truncate">{settings.email}</span>
            </a>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/75">{CONTACT_INFO.hours}</span>
          </div>

          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
            aria-label="Toggle language"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-medium transition-colors"
          >
            <Globe className="h-3 w-3" />
            <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className={`bg-white transition-shadow duration-200 border-b border-sage-border ${
          scrolled ? 'shadow-elevated' : ''
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto max-w-7xl px-5 lg:px-8 h-20 flex items-center justify-between gap-6"
        >
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={BRAND_LOGO_URL}
              alt="Srinath Consultant"
              className="h-14 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col border-l border-sage-border pl-3">
              <span className="font-display text-lg font-bold text-forest leading-tight">
                Srinath Consultant
              </span>
              <span className="text-[11px] font-medium text-brand">Approval Made Simple</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-brand font-semibold' : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.home')}
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === '/about'
                  ? 'text-brand font-semibold'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.about')}
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((o) => !o)}
                aria-expanded={servicesOpen}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                  isServiceActive
                    ? 'text-brand font-semibold'
                    : 'text-ink-muted hover:text-forest'
                }`}
              >
                <span>{t('nav.services')}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full mt-3 w-72 rounded-lg bg-white border border-sage-border shadow-architectural p-2 z-50">
                  {SERVICES_LIST.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${service.slug}`}
                      className={`block px-3.5 py-2.5 rounded-md text-sm transition-colors ${
                        pathname === `/${service.slug}`
                          ? 'bg-brand-light text-forest font-semibold'
                          : 'text-ink hover:bg-ivory'
                      }`}
                    >
                      {L(service.title)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`text-sm font-medium transition-colors ${
                pathname === '/portfolio'
                  ? 'text-brand font-semibold'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.portfolio')}
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === '/contact'
                  ? 'text-brand font-semibold'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              {t('nav.consultation')}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-sage-border text-forest"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-sage-border px-5 py-5 max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex flex-col space-y-1">
              <Link to="/" className="py-2.5 border-b border-ivory-deep text-sm font-medium text-forest">
                {t('nav.home')}
              </Link>
              <Link to="/about" className="py-2.5 border-b border-ivory-deep text-sm font-medium text-forest">
                {t('nav.about')}
              </Link>

              <div className="py-2.5 border-b border-ivory-deep">
                <p className="text-xs font-semibold text-ink-subtle uppercase tracking-wider mb-1.5">
                  {t('nav.services')}
                </p>
                <div className="grid grid-cols-1 gap-1 pl-2">
                  {SERVICES_LIST.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${service.slug}`}
                      className="py-1.5 text-sm text-ink-muted hover:text-brand"
                    >
                      {L(service.title)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/portfolio" className="py-2.5 border-b border-ivory-deep text-sm font-medium text-forest">
                {t('nav.portfolio')}
              </Link>
              <Link to="/contact" className="py-2.5 border-b border-ivory-deep text-sm font-medium text-forest">
                {t('nav.contact')}
              </Link>

              <div className="pt-3">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center rounded-md bg-brand text-white px-5 py-3 text-sm font-semibold"
                >
                  {t('nav.consultation')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
