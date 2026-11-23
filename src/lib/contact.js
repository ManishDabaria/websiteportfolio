import { contactForm, socials } from '../config/site';

export const LIMITS = { name: 80, email: 120, subject: 120, message: 3000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a map of field → error message (empty object when valid). */
export function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`;

  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = 'Please enter a valid email address.';

  if (subject.length < 3) errors.subject = 'Add a short subject (3+ characters).';
  else if (subject.length > LIMITS.subject) errors.subject = `Keep it under ${LIMITS.subject} characters.`;

  if (message.length < 20) errors.message = 'Tell me a little more (20+ characters).';
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`;

  return errors;
}

export function mailtoHref({ name, subject, message }) {
  const body = `${message}\n\n— ${name}`;
  return `mailto:${socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Sends the message through the configured provider. Throws on failure. */
export async function sendMessage(values) {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    company: values.company, // honeypot
  };

  let url;
  let body = payload;
  if (contactForm.provider === 'web3forms') {
    if (!contactForm.web3formsKey) throw new Error('Contact form is not configured yet.');
    url = 'https://api.web3forms.com/submit';
    body = { ...payload, access_key: contactForm.web3formsKey, from_name: 'Portfolio contact form', botcheck: payload.company };
  } else if (contactForm.provider === 'formspree') {
    if (!contactForm.formspreeEndpoint) throw new Error('Contact form is not configured yet.');
    url = contactForm.formspreeEndpoint;
    body = { ...payload, _subject: payload.subject, _gotcha: payload.company };
  } else {
    url = contactForm.apiEndpoint;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      throw new Error(data.error || data.message || 'The message could not be sent.');
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
