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
    <footer className="bg-forest-deep text-ivory/85 border-t border-white/10">
      <div className="mx-auto max-w-[84rem] px-5 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="bg-ivory p-2 h-14 flex items-center">
                <img
                  src={BRAND_LOGO_URL}
                  alt="Srinath Consultant"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-semibold text-white">Srinath Consultant</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-sage-muted mt-0.5">
                  Approval Made Simple
                </p>
              </div>
            </div>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              {t('footer.about')}
            </p>
            <p className="text-xs font-mono text-sage-muted">{CONTACT_INFO.hours}</p>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-sage-muted mb-5">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/${service.slug}`}
                    className="text-ivory/75 hover:text-white transition-colors"
                  >
                    {L(service.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-sage-muted mb-5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-ivory/75 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ivory/75 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-ivory/75 hover:text-white transition-colors">
                  {t('nav.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory/75 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-sage-muted mb-5">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4 text-sm text-ivory/75">
              <li>
                <a
                  href={`tel:${settings.phoneRaw}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand shrink-0" />
                  <span>+91 {settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-brand shrink-0" />
                  <span>{settings.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand shrink-0 mt-1" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/55">
          <p>
            © {new Date().getFullYear()} Srinath Consultant. {t('footer.rights')}
          </p>
          <p className="font-mono uppercase tracking-widest text-[10px]">
            Chennai · Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
};

