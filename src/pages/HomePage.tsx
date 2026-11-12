import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
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
  const [heroIdx, setHeroIdx] = useState(3); // Default to OMR High-Rise Tower
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [portfolioFilter, setPortfolioFilter] = useState('All');
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
          setHeroIdx(0);
        }
      })
      .catch(() => {
        // Keep verified fallback projects
      });
  }, []);

  const heroProject = projects[heroIdx] || projects[0];
  const activeService = SERVICES_LIST[activeServiceIdx] || SERVICES_LIST[0];

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (portfolioFilter === 'All') return projects;
    return projects.filter((p) => p.category === portfolioFilter);
  }, [projects, portfolioFilter]);

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

      {/* B. MODERN REAL ESTATE HERO */}
      <section className="relative bg-forest-deep text-white arch-grid-dark overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-brand-glow/10 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[86rem] px-5 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-6 animate-reveal">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-7">
                <span className="h-2 w-2 rounded-full bg-brand-glow animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-sage-muted">
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.04] tracking-tight text-white">
                {t('hero.title1')}{' '}
                <span className="block font-serif italic font-semibold text-brand-glow mt-1">
                  {t('hero.title2')}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg text-ivory/75 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-brand hover:bg-brand-glow text-white px-7 py-4 text-xs font-semibold uppercase tracking-widest shadow-lg transition-all"
                >
                  <span>{t('cta.freeConsult')}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2.5 rounded-lg border border-white/25 bg-white/5 hover:bg-white/10 text-white px-7 py-4 text-xs font-semibold uppercase tracking-widest transition-all"
                >
                  <span>{t('cta.exploreServices')}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Verified Google Rating Pill */}
              <div className="mt-10 pt-7 border-t border-white/10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">5.0</span>
                  <span className="text-xs text-ivory/65">218 Verified Google Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-sage-muted">
                  <ShieldCheck className="h-4 w-4 text-brand-glow" />
                  <span>CMDA · DTCP · GCC · PANCHAYAT</span>
                </div>
              </div>
            </div>

            {/* Interactive Real Estate Showcase Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-forest shadow-2xl">
                <div className="relative h-[380px] sm:h-[460px] overflow-hidden">
                  <img
                    src={heroProject.img}
                    alt={L(heroProject.title)}
                    className="h-full w-full object-cover transition-all duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/25 to-transparent" />

                  {/* Top Authority Tag */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-white">
                      <Building2 className="h-3.5 w-3.5 text-brand-glow" />
                      <span>{heroProject.authority}</span>
                    </span>
                    <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-mono font-semibold text-white">
                      {heroProject.location}
                    </span>
                  </div>

                  {/* Bottom Info & Slider Dots */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-sage-muted">
                        {L(heroProject.tag)}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                        {L(heroProject.title)}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {projects.slice(0, 5).map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setHeroIdx(idx)}
                          aria-label={`View ${L(p.title)}`}
                          className={`h-2 rounded-full transition-all ${
                            heroIdx === idx ? 'w-7 bg-brand-glow' : 'w-2 bg-white/35 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* C. TRUST INDICATORS — Integrated Architectural Metrics Strip */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {VERIFIED_STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 backdrop-blur-sm"
              >
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-brand-glow">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">{L(stat.label)}</p>
                <p className="mt-1 text-xs text-ivory/60 leading-relaxed">{L(stat.detail)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. SERVICES — Interactive Real Estate & Approval Bento */}
      <section id="services" className="py-20 lg:py-28 bg-ivory arch-grid-light">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                {t('services.eyebrow')}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-[1.08]">
                {t('services.title')}
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-ink-muted leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7-Service Interactive Selector */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {SERVICES_LIST.map((service, idx) => {
                const isActive = activeServiceIdx === idx;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveServiceIdx(idx)}
                    className={`group rounded-xl p-5 border transition-all flex flex-col justify-between ${
                      idx === 0 ? 'sm:col-span-2' : ''
                    } ${
                      isActive
                        ? 'bg-forest text-white border-forest shadow-architectural'
                        : 'bg-white text-ink border-sage-border hover:border-brand/50 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                            isActive
                              ? 'bg-white/15 text-brand-glow'
                              : 'bg-brand-light text-brand'
                          }`}
                        >
                          {service.code} · {service.authority}
                        </span>
                        <Link
                          to={`/${service.slug}`}
                          aria-label={L(service.title)}
                          className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                            isActive
                              ? 'bg-brand text-white'
                              : 'bg-ivory text-forest group-hover:bg-brand group-hover:text-white'
                          }`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <Link to={`/${service.slug}`} className="block">
                        <h3
                          className={`font-display text-xl font-bold ${
                            isActive ? 'text-white' : 'text-forest group-hover:text-brand'
                          }`}
                        >
                          {L(service.title)}
                        </h3>
                        <p
                          className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                            isActive ? 'text-ivory/80' : 'text-ink-muted'
                          }`}
                        >
                          {L(service.shortDesc)}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Live Service Spotlight Panel */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl bg-white border border-sage-border shadow-architectural overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={activeService.img}
                      alt={L(activeService.heroTitle)}
                      className="h-full w-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-glow">
                        {activeService.authority}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {L(activeService.heroTitle)}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {L(activeService.intro)}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {activeService.points.slice(0, 3).map((pt) => (
                        <li key={pt.en} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
                          <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                          <span>{L(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-ivory-deep flex items-center justify-between gap-4">
                  <Link
                    to={`/${activeService.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-forest text-white px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>{t('cta.learnMore')}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${settings.phoneRaw}`}
                    className="text-xs font-mono font-semibold text-forest hover:text-brand"
                  >
                    +91 {settings.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. ABOUT SRINATH CONSULTANT — Real Estate Advisory Split */}
      <section className="py-20 lg:py-28 bg-white border-y border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-architectural border border-sage-border">
              <img
                src="https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png"
                alt="Residential villa approved by Srinath Consultant in Thoraipakkam, Chennai"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-6 rounded-xl bg-forest text-white p-5 shadow-xl max-w-xs border border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-glow">
                Madhanandhapuram, Chennai
              </p>
              <p className="font-display text-lg font-bold mt-1">
                15+ Years of Trusted Real Estate &amp; Approval Liaison
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
              {t('about.eyebrow')}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-[1.08]">
              {t('about.title')}
            </h2>
            <p className="mt-6 text-base text-ink-muted leading-relaxed">{t('about.p1')}</p>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">{t('about.p2')}</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-ivory p-4 border border-sage-border">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                  Chennai Office
                </p>
                <p className="text-sm font-semibold text-forest mt-1">{settings.address}</p>
              </div>
              <div className="rounded-xl bg-ivory p-4 border border-sage-border">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                  Consultation Hours
                </p>
                <p className="text-sm font-semibold text-forest mt-1">{CONTACT_INFO.hours}</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-forest text-forest hover:bg-forest hover:text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                <span>About Our Practice</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* F. OUR PROCESS — Sleek 5-Stage Timeline */}
      <section className="py-20 lg:py-24 bg-forest text-white">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-glow font-semibold">
              {t('process.eyebrow')}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white">
              {t('process.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl bg-white/[0.06] border border-white/10 p-6 hover:border-brand-glow/60 transition-colors"
              >
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-brand text-white font-mono text-xs font-bold">
                  {item.step}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {L(item.title)}
                </h3>
                <p className="mt-2.5 text-sm text-ivory/75 leading-relaxed">{L(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. PROJECT PORTFOLIO — Interactive Real Estate Gallery */}
      <section className="py-20 lg:py-28 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
                {t('projects.eyebrow')}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
                {t('projects.title')}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setPortfolioFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    portfolioFilter === cat
                      ? 'bg-forest text-white'
                      : 'bg-white text-forest border border-sage-border hover:border-forest'
                  }`}
                >
                  {cat === 'All' ? t('portfolio.all') : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`group relative rounded-2xl overflow-hidden border border-sage-border bg-white shadow-elevated ${
                  idx === 0 && portfolioFilter === 'All' ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={project.img}
                    alt={L(project.title)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] font-mono font-semibold text-forest">
                      {project.authority}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-brand-glow">
                      {L(project.tag)}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">
                      {L(project.title)}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg bg-forest hover:bg-brand text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <span>{t('projects.viewAll')}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* H. TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-white border-b border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
                {t('reviews.eyebrow')}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-forest">
                {t('reviews.title')}
              </h2>
            </div>

            <div className="inline-flex items-center gap-3.5 rounded-xl border border-sage-border bg-ivory px-5 py-3.5 shrink-0">
              <span className="font-display text-3xl font-extrabold text-forest">5.0</span>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle mt-0.5">
                  218 Google Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VERIFIED_TESTIMONIALS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-2xl bg-ivory border border-sage-border p-7 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="rounded-md bg-brand-light px-2.5 py-1 font-mono text-[10px] font-semibold text-brand">
                      {review.service}
                    </span>
                  </div>
                  <p className="text-base text-forest leading-relaxed font-medium">
                    “{L(review.text)}”
                  </p>
                </div>

                <footer className="mt-7 pt-5 border-t border-sage-border flex items-center gap-3.5">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="h-11 w-11 rounded-full object-cover border border-sage-border"
                    loading="lazy"
                  />
                  <div>
                    <cite className="not-italic text-sm font-bold text-forest block">
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

      {/* I. SERVICE COVERAGE & J. CONSULTATION ENQUIRY */}
      <section id="enquiry" className="py-20 lg:py-28 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
              {t('areas.eyebrow')}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-forest leading-[1.1]">
              {t('areas.title')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
              {t('areas.subtitle')}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
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

            <div className="mt-9 rounded-2xl bg-forest text-white p-7 shadow-architectural">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-glow">
                Direct Real Estate &amp; Approval Desk
              </p>
              <a
                href={`tel:${settings.phoneRaw}`}
                className="mt-2 block font-display text-3xl font-extrabold text-white hover:text-brand-glow transition-colors"
              >
                +91 {settings.phone}
              </a>
              <p className="mt-2 text-xs text-ivory/75 leading-relaxed">{settings.address}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* K. FAQs */}
      <section className="py-20 lg:py-24 bg-white border-b border-sage-border">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">
              {t('faq.eyebrow')}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-forest">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-3">
            {VERIFIED_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q.en}
                  className="rounded-xl border border-sage-border bg-ivory/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-display text-lg font-bold text-forest">
                      {L(faq.q)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-brand shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 text-sm text-ink-muted leading-relaxed">
                      {L(faq.a)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* L. FINAL CTA BANNER */}
      <section className="py-16 lg:py-20 bg-forest-deep text-white">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-glow">
              Start Your Project
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to secure your building approval in Chennai or Tamil Nadu?
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-brand-glow text-white px-7 py-4 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <span>{t('cta.freeConsult')}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${settings.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 hover:bg-white/10 text-white px-7 py-4 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-glow" />
              <span>+91 {settings.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
