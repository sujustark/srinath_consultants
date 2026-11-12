import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CONTACT_INFO } from '@/data/siteData';
import { pb } from '@/lib/pb';

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  enabled: boolean;
}

export interface SiteSettings {
  id: string | null;
  email: string;
  phone: string;
  phoneRaw: string;
  address: string;
  socials: SocialLink[];
}

const DEFAULT_SETTINGS: SiteSettings = {
  id: null,
  email: CONTACT_INFO.email,
  phone: CONTACT_INFO.phone,
  phoneRaw: CONTACT_INFO.phoneRaw,
  address: CONTACT_INFO.address,
  socials: [
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      url: `https://wa.me/${CONTACT_INFO.whatsapp}`,
      enabled: true,
    },
  ],
};

interface SiteSettingsContextValue {
  settings: SiteSettings;
  loaded: boolean;
  refresh: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await pb.collection('site_settings').getList(1, 1, { sort: 'created' });
      if (res.items.length > 0) {
        const rec = res.items[0];
        setSettings({
          id: rec.id,
          email: rec.email || CONTACT_INFO.email,
          phone: rec.phone || CONTACT_INFO.phone,
          phoneRaw: rec.phoneRaw || CONTACT_INFO.phoneRaw,
          address: rec.address || CONTACT_INFO.address,
          socials: Array.isArray(rec.socials) ? rec.socials : DEFAULT_SETTINGS.socials,
        });
      }
    } catch {
      // Fallback to verified static CONTACT_INFO when offline or running standalone
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SiteSettingsContext.Provider value={{ settings, loaded, refresh }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  return ctx;
};

