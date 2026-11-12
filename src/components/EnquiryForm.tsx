import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES_LIST } from '@/data/servicesData';
import { pb } from '@/lib/pb';

interface EnquiryFormProps {
  defaultService?: string;
}

const inputClasses =
  'w-full rounded-lg bg-ivory/80 border border-sage-border px-4 py-3.5 text-sm text-ink placeholder:text-ink-subtle outline-none transition-all focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15';

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ defaultService = '' }) => {
  const { t, L } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    location: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg(t('form.error'));
      return;
    }

    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg(t('form.error'));
      return;
    }

    setStatus('loading');
    try {
      await pb.collection('enquiries').create(form);
      setStatus('done');
    } catch {
      setStatus('error');
      setErrorMsg(t('form.errorSend'));
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-2xl bg-white border border-sage-border shadow-architectural p-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-light text-brand">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-display text-3xl font-bold text-forest">
          {t('form.thankYou')}
        </h3>
        <p className="mt-3 text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
          {t('form.received')}
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({
              name: '',
              phone: '',
              email: '',
              service: defaultService,
              location: '',
              message: '',
            });
            setStatus('idle');
          }}
          className="mt-6 text-xs font-mono uppercase tracking-widest text-brand hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-white border border-sage-border shadow-architectural p-7 sm:p-10"
    >
      <div className="border-b border-ivory-deep pb-5 mb-6">
        <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
          Real Estate &amp; Approval Desk
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest mt-1.5">
          {t('form.title')}
        </h3>
        <p className="text-sm text-ink-muted mt-1">{t('form.subtitle')}</p>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            id="enquiry-name"
            type="text"
            required
            placeholder={t('form.name')}
            value={form.name}
            onChange={updateField('name')}
            className={inputClasses}
          />
          <input
            id="enquiry-phone"
            type="tel"
            required
            placeholder={t('form.phone')}
            value={form.phone}
            onChange={updateField('phone')}
            className={inputClasses}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            id="enquiry-email"
            type="email"
            placeholder={t('form.email')}
            value={form.email}
            onChange={updateField('email')}
            className={inputClasses}
          />
          <select
            id="enquiry-service"
            value={form.service}
            onChange={updateField('service')}
            className={inputClasses}
          >
            <option value="">{t('form.selectService')}</option>
            {SERVICES_LIST.map((s) => (
              <option key={s.id} value={s.title.en}>
                {L(s.title)}
              </option>
            ))}
          </select>
        </div>

        <input
          id="enquiry-location"
          type="text"
          placeholder={t('form.location')}
          value={form.location}
          onChange={updateField('location')}
          className={inputClasses}
        />

        <textarea
          id="enquiry-message"
          rows={3}
          placeholder={t('form.message')}
          value={form.message}
          onChange={updateField('message')}
          className={inputClasses}
        />

        {errorMsg && (
          <p
            role="alert"
            className="rounded-lg text-xs font-medium text-crimson bg-crimson-soft px-4 py-3 border border-crimson/20"
          >
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg inline-flex items-center justify-center gap-2 bg-brand hover:bg-forest disabled:opacity-60 text-white px-6 py-4 text-xs font-semibold uppercase tracking-widest shadow-sm transition-all"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t('form.sending')}</span>
            </>
          ) : (
            <>
              <span>{t('form.submit')}</span>
              <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-[11px] font-mono text-ink-subtle text-center pt-1">
          {t('form.disclaimer')}
        </p>
      </div>
    </form>
  );
};
