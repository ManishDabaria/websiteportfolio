/**
 * Vercel Serverless Function — POST /api/contact
 * Delivers contact-form messages by email via Resend (https://resend.com).
 *
 * Required env vars (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     – your Resend API key
 *   CONTACT_TO_EMAIL   – inbox that receives messages
 * Optional:
 *   CONTACT_FROM_EMAIL – verified sender, defaults to "Portfolio <onboarding@resend.dev>"
 */

const LIMITS = { name: 80, email: 120, subject: 120, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function validate({ name, email, subject, message }) {
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > LIMITS.name) return 'Invalid name.';
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > LIMITS.email) return 'Invalid email.';
  if (typeof subject !== 'string' || subject.trim().length < 3 || subject.length > LIMITS.subject) return 'Invalid subject.';
  if (typeof message !== 'string' || message.trim().length < 20 || message.length > LIMITS.message) return 'Invalid message.';
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  // Honeypot: bots fill hidden fields. Pretend success.
  if (body.company) return res.status(200).json({ success: true });

  const error = validate(body);
  if (error) return res.status(400).json({ success: false, error });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return res.status(500).json({ success: false, error: 'Email service is not configured.' });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const subject = body.subject.trim();
  const message = body.message.trim();

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr/><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend error', r.status, detail);
      return res.status(502).json({ success: false, error: 'Could not deliver the message right now.' });
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: 'Unexpected server error.' });
  }
}
