import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { CONTACT_INFO, SERVICE_AREAS, VERIFIED_STATS } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { SeoHead } from '@/components/SeoHead';

export const AboutPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <div className="pt-[116px]">
      <SeoHead
        title="About Srinath Consultant | Real Estate & Building Approval Consultancy Chennai"
        description="Learn about Srinath Consultant — 15+ years of CMDA, DTCP, building plan approval, architectural planning, and patta transfer consultancy in Chennai and Tamil Nadu."
        path="/about"
      />

      <section className="bg-forest text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-glow">
              {t('about.eyebrow')}
            </p>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {t('about.title')}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="mt-4 text-base text-white/75 leading-relaxed">{t('about.p2')}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-white/15">
              <img
                src="https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png"
                alt="Completed residential project approved in Chennai"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-sage-border py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_STATS.map((stat) => (
            <div key={stat.value} className="rounded-lg bg-ivory border border-sage-border p-6">
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-forest">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{L(stat.label)}</p>
              <p className="mt-1 text-xs text-ink-muted">{L(stat.detail)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('areas.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-forest">
              {t('areas.title')}
            </h2>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">{t('areas.subtitle')}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area.en}
                  className="inline-flex items-center gap-1.5 rounded-md border border-sage-border bg-white px-3 py-1.5 text-xs font-medium text-forest"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  <span>{L(area)}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rounded-lg bg-forest text-white p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-glow">
                Visit Our Chennai Office
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                Srinath Consultant
              </h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">{settings.address}</p>
              <p className="mt-2 text-xs text-white/70">{CONTACT_INFO.hours}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white px-6 py-3 text-sm font-semibold transition-colors"
              >
                {t('cta.freeConsult')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
