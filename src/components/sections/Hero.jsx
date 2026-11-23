import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { personal } from '../../config/site';
import { useScrollTo } from '../../hooks/useScrollTo';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import HeroVisual from './HeroVisual';
import { useTypewriter } from '../../hooks/useTypewriter';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollTo = useScrollTo();
  const reduce = useReducedMotion();
  const typed = useTypewriter(personal.typedRoles);

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pb-16 pt-28 outline-none sm:pt-32">
      <div className="container-content grid items-center gap-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <motion.div variants={container} initial={reduce ? false : 'hidden'} animate="show">
          <motion.div variants={item} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pl-2 pr-3 text-xs text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {personal.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
              <MapPin size={12} aria-hidden="true" /> {personal.location}
            </span>
          </motion.div>

          <motion.p variants={item} className="eyebrow mb-5 text-accent">
            Hello, I&apos;m {personal.name}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4rem] xl:text-[4.4rem]"
          >
            Building <span className="text-gradient text-shimmer">Intelligent</span>
            <br className="hidden sm:block" /> Solutions Through Code.
          </motion.h1>

          <motion.p variants={item} className="mt-6 flex min-h-[1.75rem] items-center font-mono text-sm text-muted sm:text-[15px]">
            <span className="mr-2 text-accent" aria-hidden="true">❯</span>
            <span className="sr-only">I build {personal.typedRoles.map((r) => r.replace(/\.$/, '')).join(', ')}.</span>
            <span aria-hidden="true">
              I build <span className="text-fg">{typed}</span>
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse-dot bg-accent" />
            </span>
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m a Computer Science Engineering student and developer passionate about building scalable web
            applications and AI-powered products that solve real-world problems.
          </motion.p>

          <motion.ul variants={item} className="mt-7 flex flex-wrap gap-2" aria-label="What I do">
            {personal.roles.map((r, i) => (
              <li
                key={r}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/50 px-3 py-1.5 text-[13px] text-fg/90"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${['bg-accent', 'bg-violet', 'bg-cyan'][i % 3]}`}
                  aria-hidden="true"
                />
                {r}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => scrollTo('projects')}>
              Explore My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" href={personal.resumeUrl} download>
              <Download size={16} aria-hidden="true" /> Download Resume
            </Button>
            <Button size="lg" variant="ghost" onClick={() => scrollTo('contact')}>
              Let&apos;s Connect
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-4">
            <SocialLinks />
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            <span className="hidden font-mono text-xs text-subtle sm:inline">
              press <span className="kbd">Ctrl</span> <span className="kbd">K</span> to navigate
            </span>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      <button
        type="button"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-fg md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="relative h-9 w-5 rounded-full border border-line">
          <span className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-fg/60" />
        </span>
      </button>
    </section>
  );
}
