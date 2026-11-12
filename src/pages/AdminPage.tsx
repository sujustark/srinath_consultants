import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { pb } from '@/lib/pb';

interface AdminPageProps {
  section: 'portfolio' | 'checklist' | 'contact';
}

export const AdminPage: React.FC<AdminPageProps> = ({ section }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useState<'idle' | 'loading' | 'authed' | 'error'>(
    pb.authStore.isValid ? 'authed' : 'idle'
  );
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthState('loading');
    setError('');
    try {
      await pb.collection('users').authWithPassword(email, password);
      setAuthState('authed');
    } catch {
      setAuthState('error');
      setError('Invalid credentials or PocketBase backend unavailable.');
    }
  };

  return (
    <div className="pt-[140px] pb-24 px-5">
      <div className="mx-auto max-w-md bg-white border border-sage-border p-8">
        <div className="flex items-center gap-2.5 text-brand mb-3">
          <Lock className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-widest">
            Admin · {section}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-forest">
          Srinath Consultant Portal
        </h1>

        {authState === 'authed' ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-ink-muted">
              Signed in to PocketBase for <strong className="text-forest">{section}</strong>{' '}
              management.
            </p>
            <button
              type="button"
              onClick={() => {
                pb.authStore.clear();
                setAuthState('idle');
              }}
              className="border border-sage-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-forest hover:bg-ivory"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              required
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-sage-border bg-ivory/60 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-sage-border bg-ivory/60 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            {error && <p className="text-xs text-crimson">{error}</p>}
            <button
              type="submit"
              disabled={authState === 'loading'}
              className="w-full bg-forest hover:bg-brand text-white py-3 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              {authState === 'loading' ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-ivory-deep">
          <Link to="/" className="text-xs font-mono text-brand hover:underline">
            ← Return to website
          </Link>
        </div>
      </div>
    </div>
  );
};

