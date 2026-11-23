import { motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '../../config/site';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import TechIcon from '../ui/TechIcon';

const accentText = { accent: 'text-accent', violet: 'text-violet', cyan: 'text-cyan' };
const accentBg = { accent: 'from-accent/25', violet: 'from-violet/25', cyan: 'from-cyan/25' };

function Marquee() {
  const all = skillGroups.flatMap((g) => g.skills);
  const row = [...all, ...all];
  return (
    <div
      aria-hidden="true"
      className="relative mt-6 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {row.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-muted">
            <TechIcon name={s.icon} size={14} colored />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        index="02"
        eyebrow="Skills"
        title="The toolkit I build with."
        description="From low-level problem solving in C++ to shipping LLM-powered products — a stack chosen for speed, scale and intelligence."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {skillGroups.map((g, gi) => (
          <Reveal
            key={g.title}
            delay={0.06 * gi}
            className={gi < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}
          >
            <SpotlightCard className="h-full p-6">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accentBg[g.accent]} to-transparent blur-2xl`}
              />
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-fg">{g.title}</h3>
                <span className={`grid h-9 w-9 place-items-center rounded-lg border border-line bg-elevated ${accentText[g.accent]}`}>
                  <TechIcon name={g.icon} size={16} />
                </span>
              </div>
              <motion.ul
                className="flex flex-wrap gap-2"
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              >
                {g.skills.map((s) => (
                  <motion.li
                    key={s.name}
                    variants={{ hidden: { opacity: 0, y: 8, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                    className="group/skill inline-flex cursor-default items-center gap-2 rounded-lg border border-line bg-bg/50 px-3 py-2 text-sm text-fg/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-elevated hover:shadow-[0_6px_20px_-8px_rgb(var(--accent)/0.5)]"
                  >
                    <span className="grayscale-[60%] transition-[filter] duration-200 group-hover/skill:grayscale-0">
                      <TechIcon name={s.icon} size={16} colored />
                    </span>
                    {s.name}
                  </motion.li>
                ))}
              </motion.ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Marquee />
    </Section>
  );
}
