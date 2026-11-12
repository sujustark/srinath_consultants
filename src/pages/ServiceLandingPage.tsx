import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle2, FileText, Phone } from 'lucide-react';
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

      {/* Service Hero */}
      <section className="bg-forest text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-xs text-white/70 mb-5">
              <Link to="/" className="hover:text-white transition-colors">
                {t('landing.home')}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">{L(service.title)}</span>
            </nav>

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-glow mb-3">
              {service.authority}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight text-white">
              {L(service.heroTitle)}
            </h1>

            <p className="mt-4 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">
              {L(service.tagline)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#service-enquiry"
                className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white px-6 py-3.5 text-sm font-semibold transition-colors"
              >
                {t('cta.freeConsult')}
              </a>
              <a
                href={`tel:${settings.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 hover:bg-white/10 text-white px-6 py-3.5 text-sm font-semibold transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+91 {settings.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-white/15">
              <img
                src={service.img}
                alt={L(service.heroTitle)}
                className="w-full h-[340px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scope & Documents Required */}
      <section className="py-16 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('landing.overview')}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('landing.whatWeHandle')}
            </h2>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">{L(service.intro)}</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {service.points.map((pt) => (
                <div
                  key={pt.en}
                  className="rounded-lg bg-white border border-sage-border p-5 flex items-start gap-3"
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
            <div className="rounded-lg bg-white border border-sage-border shadow-elevated p-6 sm:p-7">
              <div className="flex items-center gap-2.5 pb-4 border-b border-ivory-deep">
                <FileText className="h-5 w-5 text-brand" />
                <h3 className="font-display text-xl font-bold text-forest">
                  {t('landing.docsRequired')}
                </h3>
              </div>

              <ul className="mt-4 space-y-3">
                {service.docs.map((doc) => (
                  <li
                    key={doc.en}
                    className="flex items-center gap-3 text-sm text-forest pb-3 border-b border-ivory-deep last:border-0 last:pb-0"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                    <span className="font-medium">{L(doc)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-md text-xs text-ink-subtle leading-relaxed bg-ivory p-4 border border-sage-border/70">
                {t('landing.docsNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-ivory-deep border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {t('process.eyebrow')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-forest mb-10">
            {t('process.title')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="rounded-lg bg-white border border-sage-border p-5"
              >
                <div className="h-8 w-8 rounded-full bg-brand-light text-brand font-display font-bold text-sm flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-forest">
                  {L(step.title)}
                </h3>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">{L(step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Enquiry */}
      <section id="service-enquiry" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Get Started
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              Consult with our {L(service.title)} team.
            </h2>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">
              Share your plot location, area, and current document status. We will review
              jurisdiction requirements and outline the exact approval roadmap.
            </p>

            <div className="mt-8 pt-6 border-t border-ivory-deep">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle mb-3">
                Explore Other Services
              </p>
              <div className="flex flex-wrap gap-2">
                {otherServices.map((other) => (
                  <Link
                    key={other.id}
                    to={`/${other.slug}`}
                    className="rounded-md border border-sage-border bg-ivory hover:border-brand hover:text-brand px-3.5 py-2 text-xs font-semibold text-forest transition-colors"
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
