import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { GraduationCap, MapPin, Clock, Hammer } from 'lucide-react';
import { about, personal } from '../../config/site';
import { useLocalTime } from '../../hooks/useLocalTime';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import TechIcon from '../ui/TechIcon';

function Counter({ value, suffix, noCount }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const numeric = typeof value === 'number' && !noCount;
  const [display, setDisplay] = useState(numeric && !reduce ? 0 : value);

  useEffect(() => {
    if (!numeric || !inView || reduce) return undefined;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, numeric, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function StatTile({ stat, delay, children }) {
  return (
    <Reveal delay={delay} className="h-full">
      <SpotlightCard className="h-full p-5 sm:p-6" innerClassName="flex min-h-[8.5rem] flex-col justify-between">
        <span className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl">
          <Counter {...stat} />
        </span>
        <span className="mt-4 text-sm leading-snug text-muted">{stat.label}</span>
        {children}
      </SpotlightCard>
    </Reveal>
  );
}

const dailyStack = [
  ['react', 'React'], ['node', 'Node.js'], ['python', 'Python'], ['mongodb', 'MongoDB'], ['tailwind', 'Tailwind CSS'],
  ['javascript', 'JavaScript'], ['postgres', 'PostgreSQL'], ['docker', 'Docker'], ['git', 'Git'],
  ['tensorflow', 'TensorFlow'], ['postman', 'Postman'], ['vscode', 'VS Code'],
];

export default function About() {
  const time = useLocalTime(personal.timezone);
  const [projects, internship, grad, learning] = about.stats;
  const startYear = 2023;
  const now = new Date();
  const pct = Math.min(100, Math.max(0, ((now.getFullYear() + now.getMonth() / 12 - startYear - 0.5) / (grad.value - startYear)) * 100));

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading id="about-title" index="01" eyebrow="About" title={about.heading} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {/* Bio */}
        <Reveal className="col-span-2 lg:row-span-2">
          <SpotlightCard className="h-full p-7 sm:p-9">
            <p className="mb-5 font-mono text-xs text-subtle">
              <span className="text-violet">cat</span> about.md
            </p>
            <div className="space-y-5 text-[15px] leading-[1.8] text-muted sm:text-base">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-fg' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Identity / local time */}
        <Reveal delay={0.05} className="col-span-2">
          <SpotlightCard className="h-full p-6">
            <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(90deg,transparent,#000)]" />
            <div className="relative flex h-full flex-col justify-between gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm text-muted">
                  <MapPin size={14} className="text-accent" aria-hidden="true" /> {personal.location}
                </p>
                <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" aria-hidden="true" />
                  Available for opportunities
                </div>
              </div>
              <div>
                <p className="flex items-center gap-3">
                  <Clock size={18} className="text-subtle" aria-hidden="true" />
                  <span className="whitespace-nowrap font-mono text-4xl font-semibold uppercase tracking-tight text-fg">{time}</span>
                </p>
                <p className="mt-1 font-mono text-xs text-subtle">IST · my local time</p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        <StatTile stat={projects} delay={0.1} />
        <StatTile stat={internship} delay={0.15} />

        {/* Currently building */}
        <Reveal delay={0.05} className="col-span-2">
          <SpotlightCard className="h-full p-6">
            <div className="flex h-full items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet text-white shadow-[0_8px_24px_-8px_rgb(var(--violet)/0.8)]">
                <Hammer size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Currently building</p>
                <p className="mt-1.5 text-lg font-medium leading-snug text-fg">{personal.currentlyBuilding}</p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Graduation */}
        <StatTile stat={grad} delay={0.1}>
          <div className="mt-3" role="progressbar" aria-label="Degree progress" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-1 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-violet" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-subtle">
              <GraduationCap size={11} aria-hidden="true" /> {Math.round(pct)}% through B.Tech
            </p>
          </div>
        </StatTile>
        <StatTile stat={learning} delay={0.15} />

        {/* Daily stack */}
        <Reveal delay={0.05} className="col-span-2 lg:col-span-4">
          <SpotlightCard className="p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="shrink-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Daily drivers</p>
                <p className="mt-1 text-[15px] font-medium text-fg">Tools I reach for every day</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {dailyStack.map(([k, label]) => (
                  <li
                    key={k}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg/60 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_10px_24px_-10px_rgb(var(--accent)/0.7)]"
                    title={label}
                  >
                    <TechIcon name={k} size={20} colored />
                    <span className="sr-only">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      <p className="sr-only">
        {personal.name} studies at {personal.university} and graduates in {personal.graduation}.
      </p>
    </Section>
  );
}
