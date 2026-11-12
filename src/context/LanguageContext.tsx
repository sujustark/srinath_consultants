import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { BilingualText } from '@/data/siteData';
import { Lang, UI_TRANSLATIONS } from '@/data/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
  L: (text?: BilingualText | string | null) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'sc_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'ta' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [lang]);

  const t = useCallback(
    (key: string) => {
      const entry = UI_TRANSLATIONS[key];
      return entry ? entry[lang] ?? entry.en ?? key : key;
    },
    [lang]
  );

  const L = useCallback(
    (text?: BilingualText | string | null) => {
      if (text == null) return '';
      if (typeof text === 'string') return text;
      return text[lang] ?? text.en ?? '';
    },
    [lang]
  );

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ta' : 'en'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, L }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

