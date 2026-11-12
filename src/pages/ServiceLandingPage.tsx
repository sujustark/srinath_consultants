import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, FileText, Phone } from 'lucide-react';
import { SERVICES_LIST } from '@/data/servicesData';
import { PROCESS_STEPS } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { SeoHead } from '@/components/SeoHead';
import { EnquiryForm } from '@/components/EnquiryForm';

export const ServiceLandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, L } = useLanguage();
  const { settings } = useSiteSettings();

  const service = SERVICES_LIST.find((s) => s.slug === slug);
  if (!service) {
    return <Navigate to="/" replace />;
  }

  const otherServices = SERVICES_LIST.filter((s) => s.id !== service.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: L(service.title),
    provider: {
      '@type': 'ProfessionalService',
      name: 'Srinath Consultant',
    },
    areaServed: 'Chennai, Tamil Nadu',
    description: L(service.tagline),
  };

  return (
    <div className="pt-[116px]">
      <SeoHead
        title={`${L(service.heroTitle)} | Srinath Consultant`}
        description={`${L(service.tagline)} 15+ years of experience. Free consultation, transparent process and end-to-end support in Chennai.`}
        path={`/${service.slug}`}
        jsonLd={jsonLd}
      />

      {/* Dark Real Estate Service Hero */}
      <section className="bg-forest-deep text-white arch-grid-dark py-14 lg:py-20">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-xs font-mono text-ivory/60 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                {t('landing.home')}
              </Link>
              <span className="mx-2 text-brand-glow">/</span>
              <span className="text-white">{L(service.title)}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-brand-glow mb-5">
              {service.code} · {service.authority}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white">
              {L(service.heroTitle)}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-ivory/75 leading-relaxed">
              {L(service.tagline)}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#service-enquiry"
                className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-brand-glow text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                <span>{t('cta.freeConsult')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${settings.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-glow" />
                <span>+91 {settings.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src={service.img}
                alt={L(service.heroTitle)}
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scope & Documents Required */}
      <section className="py-20 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
              {t('landing.overview')}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('landing.whatWeHandle')}
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed">{L(service.intro)}</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {service.points.map((pt) => (
                <div
                  key={pt.en}
                  className="rounded-xl bg-white border border-sage-border p-5 flex items-start gap-3.5 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-forest leading-relaxed">
                    {L(pt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-sage-border shadow-architectural p-7">
              <div className="flex items-center gap-2.5 pb-4 border-b border-ivory-deep">
                <FileText className="h-5 w-5 text-brand" />
                <h3 className="font-display text-2xl font-bold text-forest">
                  {t('landing.docsRequired')}
                </h3>
              </div>

              <ul className="mt-5 space-y-3">
                {service.docs.map((doc) => (
                  <li
                    key={doc.en}
                    className="flex items-center gap-3 text-sm text-ink-muted pb-3 border-b border-ivory-deep last:border-0 last:pb-0"
                  >
                    <span className="h-2 w-2 rounded-full bg-brand shrink-0" />
                    <span className="font-medium text-forest">{L(doc)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl text-xs text-ink-subtle leading-relaxed bg-ivory p-4 border border-sage-border/70">
                {t('landing.docsNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-forest text-white">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-glow font-semibold">
            {t('process.eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white mb-10">
            {t('process.title')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-xl bg-white/[0.06] border border-white/10 p-5"
              >
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-brand text-white font-mono text-xs font-bold">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {L(step.title)}
                </h3>
                <p className="mt-2 text-xs text-ivory/75 leading-relaxed">{L(step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Enquiry */}
      <section id="service-enquiry" className="py-20 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
              Get Started
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-forest">
              Consult with our {L(service.title)} team.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
              Share your plot location, area, and current document status. We will review
              jurisdiction requirements and outline the exact approval roadmap.
            </p>

            <div className="mt-8 pt-6 border-t border-sage-border">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mb-3">
                Explore Other Practice Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {otherServices.map((other) => (
                  <Link
                    key={other.id}
                    to={`/${other.slug}`}
                    className="rounded-lg border border-sage-border bg-white hover:border-brand hover:text-brand px-3.5 py-2 text-xs font-semibold text-forest transition-colors"
                  >
                    {L(other.title)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm defaultService={service.title.en} />
          </div>
        </div>
      </section>
    </div>
  );
};
