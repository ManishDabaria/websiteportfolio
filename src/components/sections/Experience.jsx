import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Check } from 'lucide-react';
import { experience } from '../../config/site';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import Tag from '../ui/Tag';

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        index="03"
        eyebrow="Experience"
        title="Where I've shipped code."
        description="Real teams, real codebases, measurable impact."
      />

      <ol ref={ref} className="relative ml-3 sm:ml-5">
        {/* timeline rail */}
        <span aria-hidden="true" className="absolute left-0 top-2 h-[calc(100%-0.5rem)] w-px bg-line" />
        <motion.span
          aria-hidden="true"
          style={{ height }}
          className="absolute left-0 top-2 w-px bg-gradient-to-b from-accent via-violet to-transparent"
        />

        {experience.map((job, i) => (
          <li key={`${job.company}-${i}`} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
            <span aria-hidden="true" className="absolute -left-[7px] top-2 grid h-[15px] w-[15px] place-items-center rounded-full border border-accent/60 bg-bg">
              <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent))]" />
            </span>

            <Reveal>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-gradient-to-br from-accent/15 to-violet/15 text-accent">
                      <Briefcase size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-fg sm:text-xl">{job.role}</h3>
                      <p className="mt-0.5 text-[15px] text-muted">
                        {job.companyUrl ? (
                          <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-4 hover:underline">
                            {job.company}
                          </a>
                        ) : (
                          <span className="text-fg">{job.company}</span>
                        )}
                        <span className="mx-2 text-subtle">·</span>
                        {job.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-subtle sm:flex-col sm:items-end">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} aria-hidden="true" /> {job.period}
                    </span>
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} aria-hidden="true" /> {job.location}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                        <Check size={10} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>
                        {/* emphasise the metric */}
                        {h.includes('25%') ? (
                          <>
                            {h.split('approximately 25%')[0]}
                            <strong className="font-semibold text-fg">~25%</strong>
                            {h.split('approximately 25%')[1]}
                          </>
                        ) : (
                          h
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {job.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
