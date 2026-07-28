import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  name: string;
  phone: string;
  service: string;
  email: string;
  location: string;
  propertyType: string;
  contactMethod: string;
  message: string;
  consent: boolean;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Minimal server-side validation — never trust the client alone
  if (!body.name || !body.phone || !body.service || !body.email || !body.consent) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // TODO: replace this with real delivery — pick one:
  //   - Email via Resend/SendGrid to your team inbox
  //   - Push to a CRM (HubSpot, Pipedrive, etc.) via their API
  //   - Insert into a Sanity "lead" document for tracking in Studio
  // Left as a console log so the endpoint works end-to-end without
  // guessing which provider you want wired in.
  console.log('New lead submission:', body);

  return NextResponse.json({ success: true });
}