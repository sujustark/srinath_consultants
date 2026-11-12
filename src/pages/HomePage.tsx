import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react';
import {
  CONTACT_INFO,
  PROCESS_STEPS,
  ProjectItem,
  SERVICE_AREAS,
  VERIFIED_FAQS,
  VERIFIED_PROJECTS,
  VERIFIED_STATS,
  VERIFIED_TESTIMONIALS,
} from '@/data/siteData';
import { SERVICES_LIST } from '@/data/servicesData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { SeoHead } from '@/components/SeoHead';
import { EnquiryForm } from '@/components/EnquiryForm';
import { pb } from '@/lib/pb';

export const HomePage: React.FC = () => {
  const { t, L } = useLanguage();
  const { settings } = useSiteSettings();
  const [projects, setProjects] = useState<ProjectItem[]>(VERIFIED_PROJECTS);
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => {
    pb.collection('projects')
      .getFullList({ sort: '-created' })
      .then((records) => {
        if (records.length > 0) {
          setProjects(
            records.map((r) => ({
              id: r.id,
              img: r.image ? pb.files.getURL(r, r.image) : VERIFIED_PROJECTS[0].img,
              title: { en: r.title, ta: r.title },
              tag: {
                en: [r.category, r.location].filter(Boolean).join(' · '),
                ta: [r.category, r.location].filter(Boolean).join(' · '),
              },
              category: r.category || 'Project',
              location: r.location || 'Chennai',
              authority: r.category || 'Approved',
            }))
          );
        }
      })
      .catch(() => {
        // Keep verified fallback projects
      });
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Srinath Consultant',
    description:
      'Real estate, building approval and architectural consultancy in Chennai — CMDA, DTCP, building plan approval and patta transfer.',
    areaServed: 'Chennai, Tamil Nadu',
    telephone: settings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '218',
    },
  };

  return (
    <div className="pt-[116px]">
      <SeoHead
        title="Srinath Consultant | CMDA, DTCP & Building Plan Approval in Chennai"
        description="Chennai's trusted real estate & building approval consultancy with 15+ years of experience. CMDA approval, DTCP approval, building plan approval, patta transfer, architectural planning and vastu consultation."
        path="/"
        jsonLd={jsonLd}
      />

      {/* FULL-BLEED REAL ESTATE HERO */}
      <section className="relative min-h-[600px] lg:min-h-[660px] flex items-center bg-forest-deep overflow-hidden">
        <img
          src="https://images.hostinger.com/899bc59f-63df-4233-8f66-bc320c2c31a1.png"
          alt="Approved high-rise development in Chennai"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(15, 36, 25, 0.94) 0%, rgba(15, 36, 25, 0.78) 52%, rgba(15, 36, 25, 0.35) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-5 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-glow mb-4">
              {t('hero.badge')}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1]">
              {t('hero.title1')} {t('hero.title2')}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white px-7 py-3.5 text-sm font-semibold transition-colors"
              >
                {t('cta.freeConsult')}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm font-semibold transition-colors"
              >
                <span>{t('cta.exploreServices')}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-sm text-white/85">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">5.0</span>
                <span className="text-white/75">(218 Google Reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-brand-glow" />
                <span>CMDA · DTCP · Corporation · Panchayat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="bg-white border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-sage-border">
            {VERIFIED_STATS.map((stat) => (
              <div key={stat.value} className="py-8 px-4 lg:px-8 first:pl-0 last:pr-0">
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-forest">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{L(stat.label)}</p>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">{L(stat.detail)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('services.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('services.title')}
            </h2>
            <p className="mt-3 text-base text-ink-muted leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((service, idx) => (
              <Link
                key={service.id}
                to={`/${service.slug}`}
                className={`group rounded-lg bg-white border border-sage-border overflow-hidden hover:border-brand hover:shadow-elevated transition-all flex flex-col justify-between ${
                  idx === 6 ? 'md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center' : ''
                }`}
              >
                <div className={idx === 6 ? 'lg:w-1/3 h-52 lg:h-full overflow-hidden' : 'h-48 overflow-hidden'}>
                  <img
                    src={service.img}
                    alt={L(service.title)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className={`p-6 flex flex-col justify-between flex-1 ${idx === 6 ? 'lg:p-8' : ''}`}>
                  <div>
                    <p className="text-xs font-semibold text-brand mb-1.5">{service.authority}</p>
                    <h3 className="font-display text-xl font-bold text-forest group-hover:text-brand transition-colors">
                      {L(service.title)}
                    </h3>
                    <p className="mt-2.5 text-sm text-ink-muted leading-relaxed">
                      {L(service.shortDesc)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-ivory-deep flex items-center gap-1.5 text-sm font-semibold text-forest group-hover:text-brand">
                    <span>{t('cta.learnMore')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 lg:py-24 bg-white border-y border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-lg overflow-hidden border border-sage-border">
              <img
                src="https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png"
                alt="Residential villa approved by Srinath Consultant in Thoraipakkam, Chennai"
                className="w-full h-[380px] lg:h-[420px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('about.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest leading-tight">
              {t('about.title')}
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed">{t('about.p1')}</p>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">{t('about.p2')}</p>

            <div className="mt-7 grid sm:grid-cols-2 gap-4 pt-6 border-t border-ivory-deep">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  Chennai Office
                </p>
                <p className="text-sm font-medium text-forest mt-1">{settings.address}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  Consultation Hours
                </p>
                <p className="text-sm font-medium text-forest mt-1">{CONTACT_INFO.hours}</p>
              </div>
            </div>

            <div className="mt-7">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-forest text-forest hover:bg-forest hover:text-white px-6 py-3 text-sm font-semibold transition-colors"
              >
                <span>About Srinath Consultant</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-24 bg-ivory-deep border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('process.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('process.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="rounded-lg bg-white border border-sage-border p-6"
              >
                <div className="h-9 w-9 rounded-full bg-brand-light text-brand font-display font-bold text-sm flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-forest">
                  {L(item.title)}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{L(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT PORTFOLIO */}
      <section className="py-20 lg:py-24 bg-white border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                {t('projects.eyebrow')}
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
                {t('projects.title')}
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-forest transition-colors"
            >
              <span>{t('projects.viewAll')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group rounded-lg bg-white border border-sage-border overflow-hidden hover:shadow-elevated transition-shadow"
              >
                <div className="h-60 overflow-hidden bg-ivory">
                  <img
                    src={project.img}
                    alt={L(project.title)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-brand">{L(project.tag)}</p>
                  <h3 className="font-display text-xl font-bold text-forest mt-1">
                    {L(project.title)}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                {t('reviews.eyebrow')}
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
                {t('reviews.title')}
              </h2>
            </div>

            <div className="inline-flex items-center gap-3 rounded-lg border border-sage-border bg-white px-5 py-3 shrink-0">
              <span className="font-display text-2xl font-extrabold text-forest">5.0</span>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-ink-subtle mt-0.5">218 Google Reviews</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VERIFIED_TESTIMONIALS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-lg bg-white border border-sage-border p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-brand">{review.service}</span>
                  </div>
                  <p className="text-sm sm:text-base text-ink leading-relaxed">
                    “{L(review.text)}”
                  </p>
                </div>

                <footer className="mt-6 pt-4 border-t border-ivory-deep flex items-center gap-3">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <cite className="not-italic text-sm font-semibold text-forest block">
                      {review.name}
                    </cite>
                    <span className="text-xs text-ink-subtle">{t('reviews.verified')}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE & CONSULTATION ENQUIRY */}
      <section id="enquiry" className="py-20 lg:py-24 bg-white border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('areas.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('areas.title')}
            </h2>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">
              {t('areas.subtitle')}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area.en}
                  className="inline-flex items-center gap-1.5 rounded-md border border-sage-border bg-ivory px-3 py-1.5 text-xs font-medium text-forest"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  <span>{L(area)}</span>
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-lg bg-forest text-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-glow">
                Direct Consultation Desk
              </p>
              <a
                href={`tel:${settings.phoneRaw}`}
                className="mt-1.5 block font-display text-2xl font-bold text-white hover:text-brand-glow transition-colors"
              >
                +91 {settings.phone}
              </a>
              <p className="mt-2 text-xs text-white/75 leading-relaxed">{settings.address}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t('faq.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-3">
            {VERIFIED_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q.en}
                  className="rounded-lg border border-sage-border bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-forest">
                      {L(faq.q)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-brand shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-ink-muted leading-relaxed">
                      {L(faq.a)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-forest text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Ready to secure your building approval in Chennai or Tamil Nadu?
            </h2>
            <p className="mt-1.5 text-sm text-white/75">
              Speak with our team for a transparent, step-by-step assessment of your plot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white px-6 py-3.5 text-sm font-semibold transition-colors"
            >
              {t('cta.freeConsult')}
            </Link>
            <a
              href={`tel:${settings.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 hover:bg-white/10 text-white px-6 py-3.5 text-sm font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+91 {settings.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
