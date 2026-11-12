import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
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

      <section className="bg-forest text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-glow">
            {t('portfolio.eyebrow')}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-white max-w-3xl leading-tight">
            {t('portfolio.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 leading-relaxed">
            {t('portfolio.subtitle')}
          </p>

          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
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
              <Search className="h-4 w-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('portfolio.search')}
                className="w-full rounded-md bg-white/10 border border-white/20 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/55 outline-none focus:border-brand-glow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ivory border-b border-sage-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center py-16 text-ink-muted">{t('portfolio.noMatch')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
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
                    <h2 className="font-display text-xl font-bold text-forest mt-1">
                      {L(project.title)}
                    </h2>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-forest">
              Ready to start your building approval?
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Get a clear, transparent consultation for your plot in Chennai or Tamil Nadu.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-brand hover:bg-brand-hover text-white px-6 py-3.5 text-sm font-semibold transition-colors shrink-0"
          >
            {t('cta.freeConsult')}
          </Link>
        </div>
      </section>
    </div>
  );
};
