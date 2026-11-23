import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { personal } from '../../config/site';

/* Syntax colours (theme-aware via CSS vars where possible) */
const C = {
  kw: 'text-violet',
  var: 'text-fg',
  prop: 'text-cyan',
  str: 'text-emerald-600 dark:text-emerald-400',
  bool: 'text-amber-600 dark:text-amber-400',
  fn: 'text-accent',
  p: 'text-muted',
  cm: 'text-subtle italic',
};

/** Each line is a list of [colourKey, text] tokens. */
const CODE = [
  [['cm', '// hello, world — nice to meet you']],
  [['kw', 'const '], ['var', 'manish'], ['p', ' = {']],
  [['prop', '  role'], ['p', ': '], ['str', '"Full-Stack & AI Engineer"'], ['p', ',']],
  [['prop', '  based'], ['p', ': '], ['str', '"Jaipur, India"'], ['p', ',']],
  [['prop', '  education'], ['p', ': '], ['str', '"B.Tech CSE @ JECRC \'27"'], ['p', ',']],
  [['prop', '  stack'], ['p', ': ['], ['str', '"React"'], ['p', ', '], ['str', '"Node"'], ['p', ', '], ['str', '"Python"'], ['p', '],']],
  [['prop', '  ai'], ['p', ': ['], ['str', '"LLMs"'], ['p', ', '], ['str', '"RAG"'], ['p', ', '], ['str', '"GenAI"'], ['p', '],']],
  [['prop', '  openToWork'], ['p', ': '], ['bool', 'true'], ['p', ',']],
  [['p', '};']],
  [],
  [['kw', 'await '], ['var', 'manish'], ['p', '.'], ['fn', 'build'], ['p', '('], ['str', '"something great"'], ['p', ');']],
];

const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [, t]) => m + t.length, 0) + 1, 0);

function useTypedCount(total, reduce) {
  const [count, setCount] = useState(reduce ? total : 0);
  useEffect(() => {
    if (reduce) return undefined;
    let n = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        n += 2;
        setCount(Math.min(n, total));
        if (n >= total) clearInterval(id);
      }, 22);
    }, 700);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [total, reduce]);
  return count;
}

function CodeLines({ count }) {
  let remaining = count;
  let cursorPlaced = false;
  return CODE.map((line, li) => {
    const lineLen = line.reduce((m, [, t]) => m + t.length, 0);
    const visibleOnLine = Math.max(0, Math.min(lineLen, remaining));
    const lineStarted = remaining > 0 || (li === 0 && count === 0);
    let left = visibleOnLine;
    const tokens = line.map(([k, t], ti) => {
      const show = t.slice(0, Math.max(0, left));
      left -= t.length;
      return show ? (
        <span key={ti} className={C[k]}>
          {show}
        </span>
      ) : null;
    });
    const showCursor = !cursorPlaced && (remaining <= lineLen || li === CODE.length - 1);
    if (showCursor) cursorPlaced = true;
    remaining -= lineLen + 1;
    return (
      <div key={li} className={`flex ${lineStarted ? '' : 'opacity-0'}`}>
        <span className="w-8 shrink-0 select-none pr-3 text-right text-subtle/60">{li + 1}</span>
        <span className="whitespace-pre">
          {tokens}
          {showCursor && <span className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse-dot bg-accent" />}
        </span>
      </div>
    );
  });
}

/** Avatar with animated conic ring — photo if configured, else monogram. */
function Avatar() {
  return (
    <div className="relative h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20">
      <div
        aria-hidden="true"
        className="absolute -inset-[3px] animate-spin-slow rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgb(var(--accent)), rgb(var(--violet)), rgb(var(--cyan)), rgb(var(--accent)))',
          animationDuration: '5s',
        }}
      />
      <div aria-hidden="true" className="absolute -inset-3 rounded-full bg-violet/30 blur-xl" />
      <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-full border-2 border-bg bg-surface">
        {personal.profileImage ? (
          <img
            src={personal.profileImage}
            alt={`Portrait of ${personal.name}`}
            width="80"
            height="80"
            fetchpriority="high"
            className="h-full w-full object-cover"
          />
        ) : (
          <span role="img" aria-label={`${personal.name} — profile photo placeholder`} className="font-mono text-xl font-semibold tracking-tighter text-fg">
            {personal.initials}
            <span className="text-accent">.</span>
          </span>
        )}
      </div>
      <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-emerald-400" aria-hidden="true" />
    </div>
  );
}

/** Code-editor hero visual with live typing, pointer tilt and a deploy terminal. */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  const count = useTypedCount(TOTAL, reduce);
  const done = count >= TOTAL;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const srText = useMemo(() => CODE.map((l) => l.map(([, t]) => t).join('')).join('\n'), []);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto w-full max-w-[34rem] pt-8 [perspective:1200px] lg:pt-0"
    >
      {/* glow */}
      <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-accent/30 via-violet/25 to-cyan/20 opacity-80 blur-3xl" />

      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative">
        {/* Editor window */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="beam-ring" aria-hidden="true" />
          <div className="flex items-center gap-3 border-b border-line bg-elevated/70 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>
            <div className="flex gap-1 font-mono text-[11px]">
              <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-fg">manish.ts</span>
              <span className="hidden px-2.5 py-1 text-subtle sm:inline">projects.ts</span>
            </div>
            <span className="ml-auto hidden font-mono text-[10px] text-subtle sm:inline">TypeScript</span>
          </div>

          <pre className="sr-only">{srText}</pre>
          <div aria-hidden="true" className="min-h-[17.5rem] overflow-x-auto p-4 pr-6 font-mono text-[11.5px] leading-[1.75] sm:text-[12.5px]">
            <CodeLines count={count} />
          </div>

          <div className="flex items-center justify-between border-t border-line bg-elevated/50 px-4 py-1.5 font-mono text-[10px] text-subtle">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> main
            </span>
            <span>UTF-8 · Ln {CODE.length}, Col 42</span>
          </div>
        </div>

        {/* Avatar */}
        <div className="absolute right-2 -top-8 sm:-right-6 sm:-top-10" style={{ transform: 'translateZ(60px)' }}>
          <Avatar />
        </div>

        {/* Terminal toast */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass absolute -bottom-16 -left-2 w-[17rem] rounded-xl p-3 font-mono text-[11px] shadow-2xl shadow-black/30 sm:-left-8"
          style={{ transform: 'translateZ(80px)' }}
          aria-hidden="true"
        >
          <p className="text-subtle">
            <span className="text-violet">~/portfolio</span> $ npm run ship
          </p>
          <p className="mt-1 text-emerald-600 dark:text-emerald-400">✓ build passed · 0 errors</p>
          <p className="text-fg">
            ▲ deployed to <span className="text-accent">production</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
