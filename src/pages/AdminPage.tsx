import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Lock, Plus, Save, Trash2 } from 'lucide-react';
import { pb } from '@/lib/pb';
import { useSiteSettings } from '@/context/SiteSettingsContext';

interface AdminPageProps {
  section: 'portfolio' | 'checklist' | 'contact';
}

interface ProjectRecord {
  id: string;
  title: string;
  category: string;
  location: string;
}

interface ChecklistRecord {
  id: string;
  label: string;
  note?: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({ section }) => {
  const { settings, refresh } = useSiteSettings();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(pb.authStore.isValid);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');

  // Portfolio state
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [newProject, setNewProject] = useState({ title: '', category: 'Residential', location: '' });

  // Checklist state
  const [checklist, setChecklist] = useState<ChecklistRecord[]>([]);
  const [newChecklist, setNewChecklist] = useState({ label: '', note: '' });

  // Contact settings state
  const [contactForm, setContactForm] = useState({
    email: settings.email,
    phone: settings.phone,
    phoneRaw: settings.phoneRaw,
    address: settings.address,
  });
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    return pb.authStore.onChange(() => setAuthed(pb.authStore.isValid));
  }, []);

  const loadSectionData = useCallback(async () => {
    if (!authed) return;
    try {
      if (section === 'portfolio') {
        const res = await pb.collection('projects').getFullList({ sort: '-created' });
        setProjects(
          res.map((r) => ({ id: r.id, title: r.title, category: r.category, location: r.location }))
        );
      } else if (section === 'checklist') {
        const res = await pb.collection('checklist_items').getFullList({ sort: 'position,created' });
        setChecklist(res.map((r) => ({ id: r.id, label: r.label, note: r.note })));
      } else if (section === 'contact') {
        setContactForm({
          email: settings.email,
          phone: settings.phone,
          phoneRaw: settings.phoneRaw,
          address: settings.address,
        });
      }
    } catch {
      // Ignore offline errors
    }
  }, [authed, section, settings]);

  useEffect(() => {
    loadSectionData();
  }, [loadSectionData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');
    try {
      await pb.collection('users').authWithPassword(email, password);
      setAuthed(true);
    } catch {
      setError('Invalid credentials or PocketBase backend unavailable.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    setSaving(true);
    try {
      await pb.collection('projects').create(newProject);
      setNewProject({ title: '', category: 'Residential', location: '' });
      await loadSectionData();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    await pb.collection('projects').delete(id);
    await loadSectionData();
  };

  const handleAddChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklist.label.trim()) return;
    setSaving(true);
    try {
      await pb.collection('checklist_items').create(newChecklist);
      setNewChecklist({ label: '', note: '' });
      await loadSectionData();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteChecklist = async (id: string) => {
    await pb.collection('checklist_items').delete(id);
    await loadSectionData();
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    try {
      if (settings.id) {
        await pb.collection('site_settings').update(settings.id, contactForm);
      } else {
        await pb.collection('site_settings').create(contactForm);
      }
      await refresh();
      setSavedMsg('Contact settings updated.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-[144px] pb-24 px-5 bg-ivory min-h-screen">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white border border-sage-border shadow-architectural p-8">
        <div className="flex items-center justify-between gap-4 border-b border-ivory-deep pb-5">
          <div>
            <div className="flex items-center gap-2 text-brand mb-1">
              <Lock className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-widest">
                Admin · {section}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-forest">
              Srinath Consultant Portal
            </h1>
          </div>

          {authed && (
            <button
              type="button"
              onClick={() => {
                pb.authStore.clear();
                setAuthed(false);
              }}
              className="rounded-lg border border-sage-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-forest hover:bg-ivory"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Admin Sub-Nav */}
        <div className="mt-5 flex flex-wrap gap-2">
          {(['portfolio', 'checklist', 'contact'] as const).map((tab) => (
            <Link
              key={tab}
              to={`/admin/${tab}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                section === tab
                  ? 'bg-forest text-white'
                  : 'bg-ivory text-forest border border-sage-border'
              }`}
            >
              {tab}
            </Link>
          ))}
        </div>

        {!authed ? (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              required
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-sage-border bg-ivory/60 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-sage-border bg-ivory/60 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            {error && <p className="text-xs text-crimson">{error}</p>}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-lg bg-brand hover:bg-forest text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              {authLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            {section === 'portfolio' && (
              <>
                <form onSubmit={handleAddProject} className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))}
                    className="rounded-lg border border-sage-border px-3.5 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newProject.location}
                    onChange={(e) => setNewProject((p) => ({ ...p, location: e.target.value }))}
                    className="rounded-lg border border-sage-border px-3.5 py-2.5 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Project</span>
                  </button>
                </form>

                <div className="space-y-2.5">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-xl border border-sage-border bg-ivory/60 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-forest">{p.title}</p>
                        <p className="text-xs text-ink-muted">
                          {p.category} · {p.location}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id)}
                        aria-label={`Delete ${p.title}`}
                        className="text-crimson hover:bg-crimson-soft p-2 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === 'checklist' && (
              <>
                <form onSubmit={handleAddChecklist} className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Document label"
                    value={newChecklist.label}
                    onChange={(e) => setNewChecklist((c) => ({ ...c, label: e.target.value }))}
                    className="rounded-lg border border-sage-border px-3.5 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Note (optional)"
                    value={newChecklist.note}
                    onChange={(e) => setNewChecklist((c) => ({ ...c, note: e.target.value }))}
                    className="rounded-lg border border-sage-border px-3.5 py-2.5 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Item</span>
                  </button>
                </form>

                <div className="space-y-2.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-sage-border bg-ivory/60 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-forest">{item.label}</p>
                        {item.note && <p className="text-xs text-ink-muted">{item.note}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteChecklist(item.id)}
                        aria-label={`Delete ${item.label}`}
                        className="text-crimson hover:bg-crimson-soft p-2 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === 'contact' && (
              <form onSubmit={handleSaveContact} className="space-y-4">
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full rounded-lg border border-sage-border px-4 py-3 text-sm"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="Display Phone"
                    className="w-full rounded-lg border border-sage-border px-4 py-3 text-sm"
                  />
                  <input
                    type="text"
                    value={contactForm.phoneRaw}
                    onChange={(e) => setContactForm((f) => ({ ...f, phoneRaw: e.target.value }))}
                    placeholder="Raw Phone (e.g. 919080969396)"
                    className="w-full rounded-lg border border-sage-border px-4 py-3 text-sm"
                  />
                </div>
                <textarea
                  rows={2}
                  value={contactForm.address}
                  onChange={(e) => setContactForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Office Address"
                  className="w-full rounded-lg border border-sage-border px-4 py-3 text-sm"
                />
                {savedMsg && <p className="text-xs font-semibold text-brand">{savedMsg}</p>}
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  <span>Save Contact Settings</span>
                </button>
              </form>
            )}
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-ivory-deep">
          <Link to="/" className="text-xs font-mono text-brand hover:underline">
            ← Return to website
          </Link>
        </div>
      </div>
    </div>
  );
};
