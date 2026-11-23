import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personal, socials, skillGroups, experience, projects, exploring } from '../../config/site';
import { useTheme } from '../../hooks/useTheme';
import { useScrollTo } from '../../hooks/useScrollTo';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const PROMPT_USER = 'guest';
const HOST = personal.firstName.toLowerCase();

const Line = ({ children, className = '' }) => <div className={`whitespace-pre-wrap break-words ${className}`}>{children}</div>;
const K = ({ children }) => <span className="text-accent">{children}</span>;
const Dim = ({ children }) => <span className="text-subtle">{children}</span>;

const HELP = [
  ['help', 'list available commands'],
  ['whoami', 'who is Manish?'],
  ['skills', 'tech stack by category'],
  ['experience', 'work history'],
  ['projects', 'featured projects'],
  ['open <n>', 'open project details (e.g. open 1)'],
  ['exploring', "what I'm learning next"],
  ['contact', 'ways to reach me'],
  ['resume', 'download my résumé'],
  ['theme', 'toggle light / dark'],
  ['clear', 'clear the screen'],
];
const COMMANDS = ['help', 'whoami', 'skills', 'experience', 'projects', 'open', 'exploring', 'contact', 'resume', 'theme', 'clear', 'socials', 'date', 'echo', 'ls', 'sudo'];
const CHIPS = ['help', 'whoami', 'skills', 'projects', 'contact', 'sudo hire manish'];

const welcome = () => [
  <Line key="w1">
    <span className="text-fg">Welcome to {HOST}.dev</span> <Dim>— an interactive résumé.</Dim>
  </Line>,
  <Line key="w2">
    Type <K>help</K> to see what you can do, or tap a command below.
  </Line>,
];

export default function Terminal() {
  const [lines, setLines] = useState(welcome);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const scrollTo = useScrollTo();

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const input = raw.trim();
    const [cmd, ...args] = input.split(/\s+/);
    const c = (cmd || '').toLowerCase();
    const echo = (
      <Line key={`in-${Date.now()}-${Math.random()}`}>
        <span className="text-emerald-600 dark:text-emerald-400">{PROMPT_USER}@{HOST}</span>
        <Dim>:~$ </Dim>
        <span className="text-fg">{input}</span>
      </Line>
    );
    let out = [];
    const k = (s) => `${c}-${s}-${Math.random()}`;

    switch (c) {
      case '':
        break;
      case 'help':
        out = HELP.map(([n, d]) => (
          <Line key={k(n)}>
            <K>{n.padEnd(12)}</K>
            <Dim>{d}</Dim>
          </Line>
        ));
        break;
      case 'whoami':
        out = [
          <Line key={k(1)} className="text-fg">{personal.name}</Line>,
          <Line key={k(2)}>{personal.role}</Line>,
          <Line key={k(3)}>
            <Dim>{personal.degree} · {personal.university} · Class of {personal.graduation}</Dim>
          </Line>,
          <Line key={k(4)}>
            <Dim>📍 {personal.location}</Dim>
          </Line>,
        ];
        break;
      case 'skills':
        out = skillGroups.map((g) => (
          <Line key={k(g.title)}>
            <K>{g.title.padEnd(24)}</K>
            {g.skills.map((s) => s.name).join(', ')}
          </Line>
        ));
        break;
      case 'experience':
        out = experience.flatMap((e) => [
          <Line key={k(e.company)}>
            <span className="text-fg">{e.role}</span> <Dim>@</Dim> <K>{e.company}</K> <Dim>({e.period})</Dim>
          </Line>,
          ...e.highlights.map((h) => (
            <Line key={k(h)}>
              <Dim>  • </Dim>
              {h}
            </Line>
          )),
        ]);
        break;
      case 'projects':
      case 'ls':
        out = [
          ...projects.map((p, i) => (
            <Line key={k(p.slug)}>
              <K>[{i + 1}]</K> <span className="text-fg">{p.title.padEnd(28)}</span>
              <Dim>{p.stack.slice(0, 3).join(' · ')}</Dim>
            </Line>
          )),
          <Line key={k('hint')}>
            <Dim>→ type </Dim>
            <K>open 1</K>
            <Dim> to view a project</Dim>
          </Line>,
        ];
        break;
      case 'open': {
        const p = projects[Number(args[0]) - 1];
        if (p) {
          out = [<Line key={k('o')}>Opening {p.title}…</Line>];
          setTimeout(() => navigate(`/projects/${p.slug}`), 450);
        } else out = [<Line key={k('e')} className="text-rose-500">usage: open &lt;1-{projects.length}&gt;</Line>];
        break;
      }
      case 'exploring':
        out = exploring.map((e) => (
          <Line key={k(e.name)}>
            <K>▸</K> {e.name} <Dim>— {e.note}</Dim>
          </Line>
        ));
        break;
      case 'contact':
      case 'socials':
        out = [
          <Line key={k('e')}>
            <K>{'email'.padEnd(10)}</K>
            <a className="underline-offset-4 hover:underline" href={`mailto:${socials.email}`}>{socials.email}</a>
          </Line>,
          <Line key={k('g')}>
            <K>{'github'.padEnd(10)}</K>
            <a className="underline-offset-4 hover:underline" href={socials.github} target="_blank" rel="noopener noreferrer">{socials.github.replace(/^https?:\/\//, '')}</a>
          </Line>,
          <Line key={k('l')}>
            <K>{'linkedin'.padEnd(10)}</K>
            <a className="underline-offset-4 hover:underline" href={socials.linkedin} target="_blank" rel="noopener noreferrer">{socials.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</a>
          </Line>,
        ];
        break;
      case 'resume': {
        const a = document.createElement('a');
        a.href = personal.resumeUrl;
        a.download = '';
        a.click();
        out = [<Line key={k('r')} className="text-emerald-600 dark:text-emerald-400">✓ Downloading resume.pdf…</Line>];
        break;
      }
      case 'theme':
        toggleTheme();
        out = [<Line key={k('t')}>Switched to {theme === 'dark' ? 'light' : 'dark'} mode.</Line>];
        break;
      case 'date':
        out = [<Line key={k('d')}>{new Date().toString()}</Line>];
        break;
      case 'echo':
        out = [<Line key={k('ec')}>{args.join(' ')}</Line>];
        break;
      case 'sudo':
        if (args.join(' ').toLowerCase().startsWith('hire')) {
          out = [
            <Line key={k('s1')}>
              <Dim>[sudo] password for recruiter: ********</Dim>
            </Line>,
            <Line key={k('s2')} className="text-emerald-600 dark:text-emerald-400">✓ Access granted. Great choice!</Line>,
            <Line key={k('s3')}>Redirecting you to the contact form…</Line>,
          ];
          setTimeout(() => scrollTo('contact'), 900);
        } else out = [<Line key={k('s')} className="text-rose-500">Permission denied. Try: sudo hire manish</Line>];
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        out = [
          <Line key={k('nf')}>
            <span className="text-rose-500">command not found: {cmd}</span>
            <Dim> — type </Dim>
            <K>help</K>
          </Line>,
        ];
    }
    setLines((l) => [...l, echo, ...out]);
  };

  const submit = (cmd) => {
    run(cmd);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 50));
    setHIndex(-1);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIndex(i);
        setValue(history[i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : '');
    } else if (e.key === 'Tab' && value.trim()) {
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <Section id="terminal" labelledBy="terminal-title" className="!pt-0">
      <SectionHeading
        id="terminal-title"
        eyebrow="Interactive"
        title="Prefer the command line?"
        description="Explore my portfolio the developer way. Try typing a command — or tap one below."
        align="center"
      />
      <Reveal>
        <div className="relative mx-auto max-w-3xl">
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-violet/20 to-cyan/10 blur-2xl" />
          <div
            className="relative overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-2xl shadow-black/30 backdrop-blur-xl"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <div className="beam-ring" aria-hidden="true" />
            <div className="flex items-center gap-3 border-b border-line bg-elevated/70 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto font-mono text-[11px] text-subtle">
                {PROMPT_USER}@{HOST}: ~ — zsh
              </span>
              <span className="w-[52px]" aria-hidden="true" />
            </div>

            <div
              ref={bodyRef}
              role="log"
              aria-live="polite"
              aria-label="Terminal output"
              className="h-[22rem] overflow-y-auto p-4 font-mono text-[12px] leading-relaxed text-muted sm:p-5 sm:text-[13px]"
            >
              {lines}
              <div className="flex items-center">
                <label htmlFor="term-input" className="shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400">{PROMPT_USER}@{HOST}</span>
                  <Dim>:~$&nbsp;</Dim>
                  <span className="sr-only">Terminal command</span>
                </label>
                <input
                  id="term-input"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  enterKeyHint="send"
                  className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none focus-visible:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-5 flex flex-wrap justify-center gap-2">
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => submit(c)}
                className="rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
