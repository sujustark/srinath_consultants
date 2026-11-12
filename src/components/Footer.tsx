import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BRAND_LOGO_URL, CONTACT_INFO } from '@/data/siteData';
import { SERVICES_LIST } from '@/data/servicesData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export const Footer: React.FC = () => {
  const { t, L } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-forest-deep text-white/85 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-md p-1.5 h-12 flex items-center">
                <img
                  src={BRAND_LOGO_URL}
                  alt="Srinath Consultant"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white">Srinath Consultant</p>
                <p className="text-xs text-brand-glow">Approval Made Simple</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {t('footer.about')}
            </p>
            <p className="text-xs text-white/60">{CONTACT_INFO.hours}</p>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-glow mb-4">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/${service.slug}`}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {L(service.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-glow mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-white/75 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/75 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/75 hover:text-white transition-colors">
                  {t('nav.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-glow mb-4">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3.5 text-sm text-white/75">
              <li>
                <a
                  href={`tel:${settings.phoneRaw}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-glow shrink-0" />
                  <span>+91 {settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-brand-glow shrink-0" />
                  <span>{settings.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-glow shrink-0 mt-1" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} Srinath Consultant. {t('footer.rights')}
          </p>
          <p>Chennai · Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
};
