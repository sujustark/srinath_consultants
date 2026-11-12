import React, { useState } from 'react';
import { CheckCircle2, FileDown, Loader2, MessageCircle, Phone, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { pb } from '@/lib/pb';

interface ChecklistRecord {
  id: string;
  label: string;
  note?: string;
  pdf?: string;
}

const FALLBACK_CHECKLIST: ChecklistRecord[] = [
  { id: 'c1', label: 'Patta / Chitta / Adangal Extract', note: 'Latest revenue record in current owner name' },
  { id: 'c2', label: 'Registered Sale Deed & Parent Document', note: 'Complete chain of title documents' },
  { id: 'c3', label: 'FMB Sketch (Field Measurement Book)', note: 'Certified boundary & dimension sketch' },
  { id: 'c4', label: 'Encumbrance Certificate (EC)', note: 'Up-to-date 15–30 year EC' },
  { id: 'c5', label: 'Proposed Site & Building Drawings', note: 'Prepared by Srinath Consultant as per TNCDRBR norms' },
];

export const FloatingActions: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [items, setItems] = useState<ChecklistRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const openChecklist = async () => {
    setChecklistOpen(true);
    if (items.length > 0) return;
    setLoading(true);
    try {
      const records = await pb.collection('checklist_items').getFullList({ sort: 'position,created' });
      if (records.length > 0) {
        setItems(
          records.map((r) => ({
            id: r.id,
            label: r.label,
            note: r.note,
            pdf: r.pdf ? pb.files.getURL(r, r.pdf) : undefined,
          }))
        );
      } else {
        setItems(FALLBACK_CHECKLIST);
      }
    } catch {
      setItems(FALLBACK_CHECKLIST);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${settings.phoneRaw}?text=${encodeURIComponent(
    t('float.whatsappMsg')
  )}`;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={openChecklist}
          aria-label="Approval Document Checklist"
          title="Document Checklist"
          className="group relative grid h-12 w-12 place-items-center bg-forest text-white border border-white/15 shadow-lg hover:bg-brand transition-colors"
        >
          <FileDown className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap bg-ink text-white px-3 py-1.5 text-xs font-medium opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            Approval Checklist
          </span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative grid h-12 w-12 place-items-center bg-[#25D366] text-white shadow-lg hover:brightness-95 transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap bg-ink text-white px-3 py-1.5 text-xs font-medium opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            {t('float.whatsapp')}
          </span>
        </a>

        <a
          href={`tel:${settings.phoneRaw}`}
          aria-label="Call Srinath Consultant"
          className="group relative grid h-12 w-12 place-items-center bg-brand text-white shadow-lg hover:bg-brand-hover transition-colors"
        >
          <Phone className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap bg-ink text-white px-3 py-1.5 text-xs font-medium opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            {t('float.call')}
          </span>
        </a>
      </div>

      {/* Document Checklist Modal */}
      {checklistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setChecklistOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-ivory border border-sage-border shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between gap-4 p-6 border-b border-sage-border bg-white">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-brand">
                  Srinath Consultant
                </p>
                <h3 className="font-serif text-2xl font-semibold text-forest mt-1">
                  Approval Document Checklist
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setChecklistOpen(false)}
                aria-label="Close modal"
                className="grid h-9 w-9 place-items-center border border-sage-border text-ink-muted hover:text-forest"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {loading ? (
                <div className="py-10 grid place-items-center text-ink-muted">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 bg-white border border-sage-border p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-forest">{item.label}</p>
                        {item.note && (
                          <p className="text-xs text-ink-muted mt-0.5">{item.note}</p>
                        )}
                      </div>
                    </div>
                    {item.pdf && (
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-light text-forest text-xs font-semibold hover:bg-brand hover:text-white transition-colors shrink-0"
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

