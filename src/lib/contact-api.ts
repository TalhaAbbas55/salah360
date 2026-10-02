import type { Lang } from './i18n/lang';

/**
 * The website's own path for sending a contact message. next.config.ts rewrites it to the
 * backend's `POST /contact`, which emails the message to the support inbox.
 */
const CONTACT_ENDPOINT = '/api/contact';

export type ContactMessage = {
  name: string;
  /** Where the team replies. */
  email: string;
  /** A topic id from content/contact.ts; the backend knows the same ids. */
  topic: string;
  message: string;
  language: Lang;
  /** The form's hidden field. Empty unless a bot filled it in. */
  website: string;
};

/**
 * `invalid`: the backend refused the fields (400). `busy`: too many messages just now
 * (429). `failed`: anything else, including no connection.
 */
export type ContactResult = 'sent' | 'invalid' | 'busy' | 'failed';

export async function sendContactMessage(message: ContactMessage): Promise<ContactResult> {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (response.ok) return 'sent';
    if (response.status === 400) return 'invalid';
    if (response.status === 429) return 'busy';
    return 'failed';
  } catch {
    return 'failed';
  }
}
