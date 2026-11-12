import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { ProjectItem, VERIFIED_PROJECTS } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';
import { SeoHead } from '@/components/SeoHead';
import { pb } from '@/lib/pb';

export const PortfolioPage: React.FC = () => {
  const { t, L } = useLanguage();
  const [projects, setProjects] = useState<ProjectItem[]>(VERIFIED_PROJECTS);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesQuery =
        !q ||
        L(p.title).toLowerCase().includes(q) ||
        L(p.tag).toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [projects, activeCategory, search, L]);

  return (
    <div className="pt-[116px]">
      <SeoHead
        title="Project Portfolio | Srinath Consultant Chennai"
        description="Explore completed CMDA, DTCP, and building plan approval projects across Chennai and Tamil Nadu by Srinath Consultant."
        path="/portfolio"
      />

      <section className="bg-forest-deep text-white arch-grid-dark py-14 lg:py-20">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-glow font-semibold">
            {t('portfolio.eyebrow')}
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-[1.06]">
            {t('portfolio.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ivory/75 leading-relaxed">
            {t('portfolio.subtitle')}
          </p>

          {/* Filter & Search Bar */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? 'bg-brand text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat === 'All' ? t('portfolio.all') : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="h-4 w-4 text-ivory/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('portfolio.search')}
                className="w-full rounded-lg bg-white/10 border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-ivory/50 outline-none focus:border-brand-glow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center py-16 text-ink-muted">{t('portfolio.noMatch')}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <article
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden border border-sage-border bg-white shadow-elevated"
                >
                  <div className="relative h-72 overflow-hidden">
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
                      <h2 className="font-display text-2xl font-bold text-white mt-1">
                        {L(project.title)}
                      </h2>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-forest">
              Ready to start your building approval?
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Get a clear, transparent consultation for your plot in Chennai or Tamil Nadu.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-forest text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors shrink-0"
          >
            <span>{t('cta.freeConsult')}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
