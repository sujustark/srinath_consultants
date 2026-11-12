import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES_LIST } from '@/data/servicesData';
import { pb } from '@/lib/pb';

interface EnquiryFormProps {
  defaultService?: string;
}

const inputClasses =
  'w-full rounded-md bg-white border border-sage-border px-4 py-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15';

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
      <div className="rounded-xl bg-white border border-sage-border shadow-elevated p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-light text-brand">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-forest">
          {t('form.thankYou')}
        </h3>
        <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
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
          className="mt-6 text-sm font-semibold text-brand hover:underline"
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
      className="rounded-xl bg-white border border-sage-border shadow-elevated p-6 sm:p-8"
    >
      <div className="mb-6">
        <h3 className="font-display text-2xl font-bold text-forest">{t('form.title')}</h3>
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
            className="rounded-md text-xs font-medium text-crimson bg-crimson-soft px-3.5 py-2.5 border border-crimson/20"
          >
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-md inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover disabled:opacity-60 text-white px-6 py-3.5 text-sm font-semibold transition-colors"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t('form.sending')}</span>
            </>
          ) : (
            <span>{t('form.submit')}</span>
          )}
        </button>

        <p className="text-xs text-ink-subtle text-center pt-1">{t('form.disclaimer')}</p>
      </div>
    </form>
  );
};
