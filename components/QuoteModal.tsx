'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiCheckCircle,
  FiShield,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';
import { useQuoteModal } from '@/components/QuoteModalProvider';

const SERVICE_OPTIONS = [
  'Window Cleaning',
  'Eavestrough & Gutter Care',
  'House Soft Washing',
  'Pressure Washing',
  'Indoor House Cleaning',
  'Christmas Light Installation',
  'Not sure yet / multiple services',
];

interface FormState {
  name: string;
  phone: string;
  service: string;
  email: string;
  location: string;
  propertyType: 'Residential' | 'Commercial';
  contactMethod: 'Phone' | 'Email' | 'Text';
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  name: '',
  phone: '',
  service: '',
  email: '',
  location: '',
  propertyType: 'Residential',
  contactMethod: 'Phone',
  message: '',
  consent: false,
};

// Formats digits as a Canadian phone number while typing: (250) 555-0199
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Formats a Canadian postal code while typing: V2C 1A1
function formatPostal(raw: string): string {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
  if (clean.length <= 3) return clean;
  return `${clean.slice(0, 3)} ${clean.slice(3)}`;
}

export default function QuoteModal(): React.JSX.Element | null {
  const { isOpen, serviceHint, closeModal } = useQuoteModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset to a clean slate whenever the modal opens, and apply any service hint
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialState, service: serviceHint || '' });
      setErrors({});
      setStep(1);
      setSubmitted(false);
      // Lock background scroll while modal is open
      document.body.style.overflow = 'hidden';
      // Move focus into the modal for keyboard/screen reader users
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, serviceHint]);

  // Escape key closes the modal
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Simple focus trap: keep Tab cycling within the dialog
  function handleKeyDownTrap(e: React.KeyboardEvent) {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep1(): boolean {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (form.phone.replace(/\D/g, '').length !== 10) next.phone = 'Enter a valid 10-digit phone number.';
    if (!form.service) next.service = 'Please select a service.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep2(): boolean {
    const next: typeof errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.location.trim().length < 3) next.location = 'Enter your address or postal code.';
    if (!form.consent) next.consent = 'Please confirm you agree to be contacted.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContinue() {
    if (validateStep1()) setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');

      setSubmitted(true);
      toast.success("Thanks! We'll be in touch within 24 hours.");
    } catch {
      toast.error('Something went wrong sending your request. Please call us instead.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onKeyDown={handleKeyDownTrap}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {submitted ? (
              <SuccessState onClose={closeModal} />
            ) : (
              <>
                {/* Sticky Header */}
                <div className="shrink-0 px-6 sm:px-8 pt-6 pb-5 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 id="lead-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Get Your Free Quote
                      </h2>
                      <p className="text-slate-500 text-sm mt-1">
                        {step === 1 ? 'Takes about a minute — no obligation.' : 'Almost done — just a few more details.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      aria-label="Close"
                      className="shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 mt-5" aria-hidden="true">
                    <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-blue-700' : 'bg-slate-200'}`} />
                    <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-blue-700' : 'bg-slate-200'}`} />
                  </div>
                </div>

                {/* Scrollable Body */}
                <form onSubmit={handleSubmit} className="overflow-y-auto grow px-6 sm:px-8 py-6">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <Field label="Full Name" htmlFor="lead-name" error={errors.name} icon={<FiUser />}>
                          <input
                            ref={firstFieldRef}
                            id="lead-name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'lead-name-error' : undefined}
                            className={inputClass(!!errors.name)}
                            placeholder="Jane Smith"
                          />
                        </Field>

                        <Field label="Phone Number" htmlFor="lead-phone" error={errors.phone} icon={<FiPhone />}>
                          <input
                            id="lead-phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => updateField('phone', formatPhone(e.target.value))}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
                            className={inputClass(!!errors.phone)}
                            placeholder="(250) 555-0199"
                          />
                        </Field>

                        <Field label="Which service are you interested in?" htmlFor="lead-service" error={errors.service}>
                          <select
                            id="lead-service"
                            value={form.service}
                            onChange={(e) => updateField('service', e.target.value)}
                            aria-invalid={!!errors.service}
                            aria-describedby={errors.service ? 'lead-service-error' : undefined}
                            className={inputClass(!!errors.service)}
                          >
                            <option value="" disabled>
                              Select a service
                            </option>
                            {SERVICE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <Field label="Email Address" htmlFor="lead-email" error={errors.email} icon={<FiMail />}>
                          <input
                            id="lead-email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'lead-email-error' : undefined}
                            className={inputClass(!!errors.email)}
                            placeholder="jane@email.com"
                          />
                        </Field>

                        <Field
                          label="Property Address or Postal Code"
                          htmlFor="lead-location"
                          error={errors.location}
                          icon={<FiMapPin />}
                          hint="So we can confirm you're in our Kamloops service area."
                        >
                          <input
                            id="lead-location"
                            type="text"
                            value={form.location}
                            onChange={(e) => updateField('location', e.target.value)}
                            aria-invalid={!!errors.location}
                            aria-describedby={errors.location ? 'lead-location-error' : undefined}
                            className={inputClass(!!errors.location)}
                            placeholder="e.g. Sahali, or V2C 1A1"
                            onBlur={(e) => {
                              // Auto-format only if it looks like a bare postal code
                              const val = e.target.value;
                              if (/^[a-zA-Z0-9\s]{5,7}$/.test(val) && /\d/.test(val)) {
                                updateField('location', formatPostal(val));
                              }
                            }}
                          />
                        </Field>

                        <fieldset>
                          <legend className="text-sm font-bold text-slate-800 mb-2">Property Type</legend>
                          <div className="flex gap-3">
                            {(['Residential', 'Commercial'] as const).map((type) => (
                              <label
                                key={type}
                                className={`flex-1 text-center py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-colors ${
                                  form.propertyType === type
                                    ? 'bg-blue-700 border-blue-700 text-white'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="propertyType"
                                  value={type}
                                  checked={form.propertyType === type}
                                  onChange={() => updateField('propertyType', type)}
                                  className="sr-only"
                                />
                                {type}
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className="text-sm font-bold text-slate-800 mb-2">Preferred Contact Method</legend>
                          <div className="flex gap-3">
                            {(['Phone', 'Email', 'Text'] as const).map((method) => (
                              <label
                                key={method}
                                className={`flex-1 text-center py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-colors ${
                                  form.contactMethod === method
                                    ? 'bg-blue-700 border-blue-700 text-white'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="contactMethod"
                                  value={method}
                                  checked={form.contactMethod === method}
                                  onChange={() => updateField('contactMethod', method)}
                                  className="sr-only"
                                />
                                {method}
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <Field label="Anything else we should know? (optional)" htmlFor="lead-message">
                          <textarea
                            id="lead-message"
                            rows={3}
                            value={form.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            className={inputClass(false)}
                            placeholder="e.g. two-story home, gate code, best time to visit..."
                          />
                        </Field>

                        <div>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.consent}
                              onChange={(e) => updateField('consent', e.target.checked)}
                              aria-invalid={!!errors.consent}
                              aria-describedby={errors.consent ? 'lead-consent-error' : undefined}
                              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600 shrink-0"
                            />
                            <span className="text-xs text-slate-600 leading-relaxed">
                              I agree to be contacted by Masterpiece Home Services by phone, email, or text about
                              this quote request. You can unsubscribe from marketing messages at any time.
                            </span>
                          </label>
                          {errors.consent && (
                            <p id="lead-consent-error" className="text-red-600 text-xs font-semibold mt-1.5 ml-7">
                              {errors.consent}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Sticky Footer */}
                <div className="shrink-0 px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/60">
                  <div className="flex items-center gap-3">
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <FiArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                    <button
                      type={step === 1 ? 'button' : 'submit'}
                      onClick={step === 1 ? handleContinue : undefined}
                      disabled={submitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/25"
                    >
                      <span>{step === 1 ? 'Continue' : submitting ? 'Sending...' : 'Send My Request'}</span>
                      {step === 1 && <FiArrowRight className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Trust signals — reduce anxiety right next to the commitment point */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FiShield className="w-3.5 h-3.5 text-blue-600" /> $5M Insured
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="w-3.5 h-3.5 text-blue-600" /> 24-Hr Response
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-8 py-14 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
        <FiCheckCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Request Sent!</h2>
      <p className="text-slate-600 text-sm max-w-xs mx-auto leading-relaxed mb-8">
        Thanks — a member of our Kamloops team will reach out within 24 hours with your free quote.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold py-3.5 px-8 rounded-2xl text-sm transition-all"
      >
        Done
      </button>
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? 'border-red-400 focus:ring-red-200'
      : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
  }`;
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, icon, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5">
        {icon && <span className="text-blue-600 w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">{icon}</span>}
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500 mb-1.5">{hint}</p>}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-red-600 text-xs font-semibold mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}