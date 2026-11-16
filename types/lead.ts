export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  /** Service title, or "Not sure yet". */
  service: string;
  message: string;
  /** Honeypot. Real visitors never see it, so it must stay empty. */
  website: string;
}