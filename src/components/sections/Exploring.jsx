import { motion, useReducedMotion } from 'framer-motion';
import { exploring } from '../../config/site';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import TechIcon from '../ui/TechIcon';
import { useSpotlight } from '../../hooks/useSpotlight';

const iconKey = (k) => (k === 'git' ? 'gitbranch' : k);

export default function Exploring() {
  const onMove = useSpotlight();
  const reduce = useReducedMotion();

  return (
    <Section id="exploring" labelledBy="exploring-title" className="!pt-0">
      <div
        onMouseMove={onMove}
        className="card spotlight relative overflow-hidden px-6 py-14 sm:px-12 sm:py-16"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[100px]" />

        <div className="relative z-[2]">
          <SectionHeading
            id="exploring-title"
            eyebrow="Currently Exploring"
            title="What I'm learning next."
            description="The frontier I'm actively studying and prototyping with — towards autonomous, production-grade AI systems."
            align="center"
          />

          <motion.ul
            className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3"
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            {exploring.map((e, i) => (
              <motion.li
                key={e.name}
                variants={{ hidden: { opacity: 0, y: 14, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                className="group relative"
              >
                <div className="glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_rgb(var(--violet)/0.6)]">
                  <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-violet/20 text-fg">
                    <TechIcon name={iconKey(e.icon)} size={18} />
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400"
                      style={{ animationDelay: `${i * 0.3}s` }}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-medium text-fg">{e.name}</span>
                    <span className="block text-xs text-subtle">{e.note}</span>
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}
