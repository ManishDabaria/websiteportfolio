import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Send, LoaderCircle, CheckCircle2, AlertCircle, Copy, Check, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { socials } from '../../config/site';
import { LIMITS, mailtoHref, sendMessage, validate } from '../../lib/contact';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import Button from '../ui/Button';

const empty = { name: '', email: '', subject: '', message: '', company: '' };

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {hint}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500"
          >
            <AlertCircle size={12} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');
  const [copied, setCopied] = useState(false);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      await sendMessage(values);
      setStatus('success');
      setValues(empty);
      setTouched({});
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  };

  const fieldProps = (name) => ({
    id: `cf-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    maxLength: LIMITS[name],
    'aria-invalid': touched[name] && errors[name] ? 'true' : 'false',
    'aria-describedby': touched[name] && errors[name] ? `cf-${name}-error` : undefined,
    className: `input ${touched[name] && errors[name] ? '!border-rose-500/60 focus:!ring-rose-500/15' : ''}`,
  });

  const showErr = (n) => (touched[n] ? errors[n] : undefined);

  const channels = [
    { label: 'LinkedIn', value: 'Connect professionally', href: socials.linkedin, Icon: FaLinkedinIn },
    { label: 'GitHub', value: 'Browse my code', href: socials.github, Icon: FaGithub },
  ];

  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-4">
            <span className="text-accent">07</span>
            <span className="h-px w-6 bg-line" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="text-fade text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.08]">
            Have an Interesting Idea? Let&apos;s Build Something Together.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m open to internships, full-time SDE / AI engineering roles, freelance work and collaborations.
            My inbox is always open — I usually reply within a day or two.
          </p>

          <div className="mt-8 space-y-3">
            <SpotlightCard className="p-4">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet text-white">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-subtle">Email</p>
                  <a href={`mailto:${socials.email}`} className="block truncate font-medium text-fg hover:underline hover:underline-offset-4">
                    {socials.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:text-fg"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                  <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </SpotlightCard>

            <div className="grid gap-3 sm:grid-cols-2">
              {channels.map(({ label, value, href, Icon }) => (
                <SpotlightCard key={label} className="group">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-elevated text-fg">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-fg">{label}</span>
                      <span className="block truncate text-xs text-subtle">{value}</span>
                    </span>
                    <ArrowUpRight size={15} className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SpotlightCard className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 size={30} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-fg">Message sent — thank you!</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted">I&apos;ll get back to you as soon as possible.</p>
                  <Button variant="secondary" size="sm" className="mt-6" onClick={() => setStatus('idle')}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="cf-name" label="Name" error={showErr('name')}>
                      <input type="text" autoComplete="name" placeholder="Jane Doe" required {...fieldProps('name')} />
                    </Field>
                    <Field id="cf-email" label="Email" error={showErr('email')}>
                      <input type="email" autoComplete="email" inputMode="email" placeholder="jane@company.com" required {...fieldProps('email')} />
                    </Field>
                  </div>
                  <Field id="cf-subject" label="Subject" error={showErr('subject')}>
                    <input type="text" placeholder="Internship opportunity, project idea…" required {...fieldProps('subject')} />
                  </Field>
                  <Field
                    id="cf-message"
                    label="Message"
                    error={showErr('message')}
                    hint={
                      <span className="font-mono text-[11px] text-subtle" aria-hidden="true">
                        {values.message.length}/{LIMITS.message}
                      </span>
                    }
                  >
                    <textarea rows={6} placeholder="Tell me about what you're building…" required {...fieldProps('message')} className={`${fieldProps('message').className} resize-y`} />
                  </Field>

                  {/* Honeypot — hidden from humans */}
                  <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="cf-company">Company</label>
                    <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
                  </div>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        className="flex gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-sm"
                      >
                        <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                        <p className="text-fg/90">
                          {serverError || 'Something went wrong.'}{' '}
                          <a href={mailtoHref(values)} className="font-medium text-accent underline underline-offset-4">
                            Send it via your email app instead
                          </a>
                          .
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                    <p className="text-xs text-subtle">Your details are only used to reply to you.</p>
                    <Button type="submit" variant="accent" size="lg" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        <>
                          Send Message <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
