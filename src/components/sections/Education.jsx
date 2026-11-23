import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { education } from '../../config/site';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';

export default function Education() {
  return (
    <Section id="education" labelledBy="education-title" className="!pt-0">
      <SectionHeading id="education-title" index="05" eyebrow="Education" title="Foundations in computer science." />
      <div className="grid gap-6">
        {education.map((e) => {
          const [start, end] = e.period.split('–').map((s) => Number(s.trim()));
          const now = new Date().getFullYear() + new Date().getMonth() / 12;
          const pct = Math.min(100, Math.max(0, ((now - start - 0.5) / (end - start)) * 100));
          return (
            <Reveal key={e.degree}>
              <SpotlightCard className="p-6 sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet/25 to-accent/10 blur-3xl"
                />
                <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl border border-line bg-gradient-to-br from-accent/20 to-violet/20 text-fg">
                    <GraduationCap size={28} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{e.degree}</h3>
                    <p className="mt-1 text-[15px] text-muted">{e.institution}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-subtle">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={12} aria-hidden="true" /> {e.period}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" /> {e.location}</span>
                    </div>
                    <ul className="mt-5 space-y-1.5">
                      {e.details.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {Number.isFinite(pct) && (
                    <div className="md:w-48">
                      <div className="flex justify-between font-mono text-[11px] text-subtle">
                        <span>{start}</span>
                        <span>{end}</span>
                      </div>
                      <div
                        className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
                        role="progressbar"
                        aria-label="Degree progress"
                        aria-valuenow={Math.round(pct)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className="h-full rounded-full bg-gradient-to-r from-accent to-violet" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-muted">{pct >= 100 ? 'Graduated' : `Class of ${end} · in progress`}</p>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
