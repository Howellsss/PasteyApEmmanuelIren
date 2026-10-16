import { CONTACT_EMAIL } from '@/data/media';

/**
 * The site has no mail server, so forms open the visitor's own email app with the message
 * written out and addressed to the ministry inbox.
 */
export function sendByEmail(subject: string, fields: [label: string, value: FormDataEntryValue | null][]) {
  const body = fields
    .filter(([, value]) => value && String(value).trim())
    .map(([label, value]) => `${label}:\n${String(value).trim()}`)
    .join('\n\n');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
