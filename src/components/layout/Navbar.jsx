import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Download, Command } from 'lucide-react';
import { navLinks, personal } from '../../config/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollTo } from '../../hooks/useScrollTo';
import Button from '../ui/Button';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import SocialLinks from '../ui/SocialLinks';

const ids = navLinks.map((l) => l.id);

export default function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = useActiveSection(ids, pathname === '/');
  const scrollTo = useScrollTo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close the mobile menu if the viewport grows past the breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // let the menu close before scrolling so the lock is released
    setTimeout(() => scrollTo(id), 10);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <div className={`relative z-10 transition-all duration-300 ${scrolled || open ? 'pt-3' : 'pt-5'}`}>
        <nav
          aria-label="Primary"
          className={`container-content flex h-14 items-center justify-between rounded-full transition-all duration-300 ${
            scrolled || open ? 'glass max-w-[68rem] shadow-[0_8px_32px_-12px_rgb(0_0_0/0.35)]' : 'border border-transparent'
          }`}
        >
          <a href="/" onClick={(e) => go(e, 'home')} aria-label={`${personal.name} — home`} className="shrink-0 rounded-lg">
            <Logo />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-elevated ring-1 ring-line"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface/50 pl-3 pr-2 text-xs text-muted transition-colors hover:text-fg md:inline-flex"
              aria-label="Open command menu"
            >
              <Command size={13} aria-hidden="true" /> Menu
              <span className="kbd">Ctrl K</span>
            </button>
            <ThemeToggle />
            <Button href={personal.resumeUrl} download size="sm" className="hidden sm:inline-flex">
              <Download size={14} aria-hidden="true" /> Resume
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg hover:bg-elevated lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-bg/85 backdrop-blur-md lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.div
            key="panel"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[4.75rem] z-10 overflow-y-auto px-4 pb-8 lg:hidden"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <div className="mx-auto max-w-[68rem] rounded-3xl border border-line bg-surface/95 p-3 shadow-2xl shadow-black/30">

              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => go(e, l.id)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors ${
                        active === l.id ? 'bg-elevated text-fg' : 'text-muted hover:bg-elevated/60 hover:text-fg'
                      }`}
                    >
                      {l.label}
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line px-2 pt-4">
                <SocialLinks size="sm" />
                <Button href={personal.resumeUrl} download size="sm">
                  <Download size={14} aria-hidden="true" /> Resume
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
