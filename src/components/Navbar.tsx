import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Globe, Mail, Menu, Phone, X } from 'lucide-react';
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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      {/* Top Bar */}
      <div className="bg-forest-deep text-ivory/90 border-b border-white/10">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 h-9 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-5 min-w-0">
            <a
              href={`tel:${settings.phoneRaw}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium shrink-0"
            >
              <Phone className="h-3 w-3 text-brand-glow" />
              <span>+91 {settings.phone}</span>
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors truncate text-ivory/75"
            >
              <Mail className="h-3 w-3 text-brand-glow shrink-0" />
              <span className="truncate">{settings.email}</span>
            </a>
            <span className="hidden md:inline-block text-ivory/30">|</span>
            <span className="hidden md:inline-block text-ivory/70 tracking-wide">
              {CONTACT_INFO.hours}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
            aria-label="Toggle language"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-medium tracking-wider uppercase transition-colors"
          >
            <Globe className="h-3 w-3 text-brand-glow" />
            <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-elevated border-b border-sage-border/80'
            : 'bg-white/90 backdrop-blur-md border-b border-sage-border/50'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto max-w-[86rem] px-5 lg:px-8 h-20 flex items-center justify-between gap-6"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="h-14 w-auto flex items-center">
              <img
                src={BRAND_LOGO_URL}
                alt="Srinath Consultant logo"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-sage-border pl-3.5">
              <span className="font-display text-lg font-bold tracking-tight text-forest leading-none">
                SRINATH CONSULTANT
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand mt-1">
                Real Estate &amp; Approvals
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/' ? 'text-brand' : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.home')}
            </Link>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/about' ? 'text-brand' : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.about')}
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((o) => !o)}
                aria-expanded={servicesOpen}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  isServiceActive ? 'text-brand' : 'text-ink-muted hover:text-forest'
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
                <div className="absolute left-0 top-full mt-4 w-[380px] rounded-xl bg-white border border-sage-border shadow-architectural p-2.5 z-50">
                  <div className="px-3 py-2 border-b border-ivory-deep mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink-subtle">
                      Real Estate &amp; Approval Services
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  </div>
                  <div className="space-y-0.5">
                    {SERVICES_LIST.map((service) => (
                      <Link
                        key={service.id}
                        to={`/${service.slug}`}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          pathname === `/${service.slug}`
                            ? 'bg-brand-light text-forest font-semibold'
                            : 'text-ink hover:bg-ivory'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] font-semibold text-brand bg-brand-light px-1.5 py-0.5 rounded">
                            {service.code}
                          </span>
                          <span>{L(service.title)}</span>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-sage shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/portfolio' ? 'text-brand' : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.portfolio')}
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/contact' ? 'text-brand' : 'text-ink-muted hover:text-forest'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-forest text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
            >
              <span>{t('nav.consultation')}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-sage-border bg-ivory text-forest"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-sage-border px-5 py-6 max-h-[80vh] overflow-y-auto shadow-architectural">
            <div className="flex flex-col space-y-1">
              <Link to="/" className="py-3 border-b border-ivory-deep text-sm font-semibold text-forest">
                {t('nav.home')}
              </Link>
              <Link to="/about" className="py-3 border-b border-ivory-deep text-sm font-semibold text-forest">
                {t('nav.about')}
              </Link>

              <div className="py-3 border-b border-ivory-deep">
                <p className="text-[11px] font-mono uppercase tracking-widest text-ink-subtle mb-2">
                  {t('nav.services')}
                </p>
                <div className="grid grid-cols-1 gap-1 pl-2">
                  {SERVICES_LIST.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${service.slug}`}
                      className="py-2 text-sm text-ink-muted hover:text-brand flex items-center gap-2.5"
                    >
                      <span className="font-mono text-[11px] text-brand font-semibold">{service.code}</span>
                      <span>{L(service.title)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/portfolio" className="py-3 border-b border-ivory-deep text-sm font-semibold text-forest">
                {t('nav.portfolio')}
              </Link>
              <Link to="/contact" className="py-3 border-b border-ivory-deep text-sm font-semibold text-forest">
                {t('nav.contact')}
              </Link>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand text-white px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                >
                  <span>{t('nav.consultation')}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
