/**
 * Lead shape + validation, shared by the browser form and the API route so
 * both enforce exactly the same rules.
 */

export const LEAD_SERVICES = [
  'Window cleaning',
  'Gutter & eavestrough cleaning',
  'House soft washing',
  'Pressure washing',
  'Christmas light installation',
  'Not sure yet',
] as const;

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  /** Which form sent this, e.g. "home-hero". Handy for attribution. */
  source: string;
}

export type LeadErrors = Partial<Record<'name' | 'phone' | 'email', string>>;

type ValidationResult = { ok: true; data: LeadInput } | { ok: false; errors: LeadErrors };

const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export function validateLead(raw: Record<string, unknown>): ValidationResult {
  const name = text(raw.name, 100);
  const phone = text(raw.phone, 30);
  const email = text(raw.email, 120);
  const service = text(raw.service, 100);
  const message = text(raw.message, 1000);
  const source = text(raw.source, 50) || 'unknown';

  const errors: LeadErrors = {};

  if (name.length < 2) errors.name = 'Please enter your name.';

  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) errors.phone = 'Please enter a valid phone number.';

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      phone,
      source,
      ...(email ? { email } : {}),
      ...(service ? { service } : {}),
      ...(message ? { message } : {}),
    },
  };
}
