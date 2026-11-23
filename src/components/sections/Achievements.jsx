import { Award, Users, Rocket, BookOpen, Trophy, GitPullRequest, ArrowUpRight } from 'lucide-react';
import { achievements } from '../../config/site';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';

const TYPES = {
  community: { Icon: Users, label: 'Community', cls: 'text-accent bg-accent/10 border-accent/25' },
  activity: { Icon: Rocket, label: 'Activity', cls: 'text-cyan bg-cyan/10 border-cyan/25' },
  certification: { Icon: Award, label: 'Certification', cls: 'text-amber-500 bg-amber-500/10 border-amber-500/25' },
  hackathon: { Icon: Trophy, label: 'Hackathon', cls: 'text-rose-500 bg-rose-500/10 border-rose-500/25' },
  learning: { Icon: BookOpen, label: 'Learning', cls: 'text-violet bg-violet/10 border-violet/25' },
  opensource: { Icon: GitPullRequest, label: 'Open Source', cls: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25' },
};

export default function Achievements() {
  return (
    <Section id="achievements" labelledBy="achievements-title">
      <SectionHeading
        id="achievements-title"
        index="06"
        eyebrow="Achievements & Activities"
        title="Beyond the classroom."
        description="Communities, events and the habits that keep me growing."
      />
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {achievements.map((a, i) => {
          const t = TYPES[a.type] ?? TYPES.activity;
          const Wrapper = a.link ? 'a' : 'div';
          const wrapperProps = a.link ? { href: a.link, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <Reveal as="li" key={a.title} delay={0.06 * i}>
              <SpotlightCard className="group h-full">
                <Wrapper {...wrapperProps} className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-11 w-11 place-items-center rounded-xl border ${t.cls}`}>
                      <t.Icon size={18} aria-hidden="true" />
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${t.cls}`}>
                      {t.label}
                    </span>
                  </div>
                  <h3 className="mt-5 flex items-center gap-1.5 text-[17px] font-semibold text-fg">
                    {a.title}
                    {a.link && <ArrowUpRight size={15} className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-muted">{a.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-subtle">{a.description}</p>
                </Wrapper>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
