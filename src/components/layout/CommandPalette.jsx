import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search, CornerDownLeft, Hash, Download, Copy, Sun, Moon, ArrowUpRight, Check,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { navLinks, personal, socials } from '../../config/site';
import { useTheme } from '../../hooks/useTheme';
import { useScrollTo } from '../../hooks/useScrollTo';

/** Raycast-style ⌘K / Ctrl+K command menu for keyboard-first navigation. */
export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const lastFocus = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const scrollTo = useScrollTo();

  const commands = useMemo(
    () => [
      ...navLinks.map((l) => ({
        id: `nav-${l.id}`,
        group: 'Navigate',
        label: l.label,
        Icon: Hash,
        run: () => scrollTo(l.id),
      })),
      {
        id: 'resume',
        group: 'Actions',
        label: 'Download résumé',
        Icon: Download,
        run: () => {
          const a = document.createElement('a');
          a.href = personal.resumeUrl;
          a.download = '';
          a.click();
        },
      },
      {
        id: 'copy-email',
        group: 'Actions',
        label: `Copy email — ${socials.email}`,
        Icon: copied ? Check : Copy,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(socials.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            window.location.href = `mailto:${socials.email}`;
          }
        },
      },
      {
        id: 'theme',
        group: 'Actions',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        Icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
      {
        id: 'github',
        group: 'Links',
        label: 'Open GitHub',
        Icon: FaGithub,
        external: true,
        run: () => window.open(socials.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        group: 'Links',
        label: 'Open LinkedIn',
        Icon: FaLinkedinIn,
        external: true,
        run: () => window.open(socials.linkedin, '_blank', 'noopener,noreferrer'),
      },
    ],
    [scrollTo, theme, toggleTheme, copied],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      setQuery('');
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${index}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const execute = (cmd) => {
    if (!cmd) return;
    if (!cmd.keepOpen) onClose();
    // run after close so scroll locks are released
    setTimeout(() => cmd.run(), cmd.keepOpen ? 0 : 60);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(filtered[index]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-subtle" aria-hidden="true" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="h-14 flex-1 bg-transparent text-[15px] text-fg placeholder:text-subtle focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
                aria-label="Search commands"
              />
              <span className="kbd">Esc</span>
            </div>

            <ul id="cmd-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”.</li>}
              {filtered.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null;
                lastGroup = cmd.group;
                const { Icon } = cmd;
                const selected = i === index;
                return (
                  <li key={cmd.id} role="presentation">
                    {header && <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">{header}</p>}
                    <div
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={selected}
                      data-idx={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => execute(cmd)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        selected ? 'bg-elevated text-fg' : 'text-muted'
                      }`}
                    >
                      <span className={`grid h-7 w-7 place-items-center rounded-lg border border-line ${selected ? 'bg-surface text-accent' : 'bg-elevated/60'}`}>
                        <Icon size={14} aria-hidden="true" />
                      </span>
                      <span className="flex-1 truncate">{cmd.label}</span>
                      {cmd.external && <ArrowUpRight size={14} className="text-subtle" aria-hidden="true" />}
                      {selected && <CornerDownLeft size={14} className="text-subtle" aria-hidden="true" />}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-subtle">
              <span className="flex items-center gap-1.5"><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
              <span className="flex items-center gap-1.5"><span className="kbd">↵</span> select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
