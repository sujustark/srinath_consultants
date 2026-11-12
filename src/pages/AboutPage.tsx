import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
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

      <section className="bg-forest-deep text-white arch-grid-dark py-14 lg:py-24">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-glow font-semibold">
              {t('about.eyebrow')}
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.06]">
              {t('about.title')}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ivory/80 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="mt-4 text-base text-ivory/70 leading-relaxed">{t('about.p2')}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png"
                alt="Completed residential project approved in Chennai"
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-sage-border py-12">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_STATS.map((stat) => (
            <div key={stat.value} className="rounded-xl bg-ivory border border-sage-border p-6">
              <p className="font-display text-4xl font-extrabold text-brand">{stat.value}</p>
              <p className="mt-2 text-sm font-bold text-forest">{L(stat.label)}</p>
              <p className="mt-1 text-xs text-ink-muted">{L(stat.detail)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ivory">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
              {t('areas.eyebrow')}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-forest">
              {t('areas.title')}
            </h2>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">{t('areas.subtitle')}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area.en}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sage-border bg-white px-3 py-1.5 text-xs font-semibold text-forest"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  <span>{L(area)}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-forest text-white p-8 lg:p-10 flex flex-col justify-between shadow-architectural">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-glow">
                Visit Our Chennai Office
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">
                Srinath Consultant
              </h3>
              <p className="mt-4 text-sm text-ivory/80 leading-relaxed">{settings.address}</p>
              <p className="mt-2 text-xs font-mono text-sage-muted">{CONTACT_INFO.hours}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-brand-glow text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                <span>{t('cta.freeConsult')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
