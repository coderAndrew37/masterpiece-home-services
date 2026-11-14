import { NextResponse } from 'next/server';
import { validateLead, type LeadInput } from '@/lib/leads';

export const runtime = 'nodejs';

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

function buildEmail(lead: LeadInput): { text: string; html: string } {
  const rows: [string, string | undefined][] = [
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email],
    ['Service', lead.service],
    ['Message', lead.message],
    ['Form', lead.source],
  ];
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));

  return {
    text: filled.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<table>${filled
      .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
      .join('')}</table>`,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;

  // Honeypot: bots fill the hidden "company" field. Pretend success, send nothing.
  if (typeof raw.company === 'string' && raw.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(raw);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }
  const lead = result.data;

  const { RESEND_API_KEY, LEADS_TO_EMAIL, LEADS_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !LEADS_TO_EMAIL || !LEADS_FROM_EMAIL) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[leads] email not configured; dev mode, lead not sent:', lead);
      return NextResponse.json({ ok: true });
    }
    // Never report success for a lead nobody will receive.
    console.error('[leads] RESEND_API_KEY / LEADS_TO_EMAIL / LEADS_FROM_EMAIL are not set');
    return NextResponse.json({ error: 'Lead delivery is not configured' }, { status: 503 });
  }

  const { text, html } = buildEmail(lead);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: LEADS_FROM_EMAIL,
      to: [LEADS_TO_EMAIL],
      subject: `New quote request: ${lead.name}`,
      text,
      html,
      ...(lead.email ? { reply_to: lead.email } : {}),
    }),
  });

  if (!response.ok) {
    console.error('[leads] email provider returned', response.status);
    return NextResponse.json({ error: 'Could not send lead' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
