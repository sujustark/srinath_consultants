import React from 'react';
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { SeoHead } from '@/components/SeoHead';
import { EnquiryForm } from '@/components/EnquiryForm';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <div className="pt-[116px]">
      <SeoHead
        title="Contact Srinath Consultant | Real Estate & Building Approval Chennai"
        description="Contact Srinath Consultant in Madhanandhapuram, Chennai for CMDA, DTCP, building plan approval, patta transfer, architectural planning and Vastu consultation."
        path="/contact"
      />

      <section className="bg-forest-deep text-white arch-grid-dark py-14 lg:py-20">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-glow font-semibold">
            {t('nav.contact')}
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-[1.06]">
            Speak with our consultancy desk.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ivory/75 leading-relaxed">
            Visit our office in Madhanandhapuram, call us directly, or submit your project
            requirements below for a prompt consultation.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ivory">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-sage-border shadow-architectural p-7 space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                    Telephone &amp; WhatsApp
                  </p>
                  <a
                    href={`tel:${settings.phoneRaw}`}
                    className="font-display text-2xl font-bold text-forest hover:text-brand transition-colors block mt-1"
                  >
                    +91 {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-ivory-deep">
                <Mail className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                    Email
                  </p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-semibold text-forest hover:text-brand transition-colors block mt-1 break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-ivory-deep">
                <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                    Office Address
                  </p>
                  <p className="text-sm text-ink-muted leading-relaxed mt-1">{settings.address}</p>
                  <a
                    href={CONTACT_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline mt-3"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-ivory-deep">
                <Clock className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                    Consultation Hours
                  </p>
                  <p className="text-sm text-forest font-semibold mt-1">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
};
