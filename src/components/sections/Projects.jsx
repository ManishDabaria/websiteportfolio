import { Link } from 'react-router-dom';
import { projects } from '../../config/site';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import Tag from '../ui/Tag';
import ProjectMockup from '../ui/ProjectMockup';
import ProjectLinks from '../ui/ProjectLinks';

function ProjectCard({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <SpotlightCard as="article" beam aria-labelledby={`p-${project.slug}`} className="group">
        <div className="grid lg:grid-cols-2">
          <Link
            to={`/projects/${project.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className={`block aspect-[4/3] border-b sm:aspect-[16/10] border-line lg:aspect-auto lg:min-h-[24rem] lg:border-b-0 ${
              flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'
            }`}
          >
            <ProjectMockup project={project} className="h-full" />
          </Link>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent">0{index + 1}</span>
              <span className="h-px w-6 bg-line" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">{project.category}</span>
            </div>

            <h3 id={`p-${project.slug}`} className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]">
              {project.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.overview}</p>

            <ul className="mt-5 space-y-2">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-line bg-bg/40 px-4 py-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-xl font-semibold text-fg">{m.value}</dd>
                  <dd className="text-xs text-subtle" aria-hidden="true">{m.label}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
              {project.stack.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        index="04"
        eyebrow="Featured Projects"
        title="Selected work at the intersection of AI and the web."
        description="Products that pair full-stack engineering with LLMs, retrieval and generative models to solve real problems."
      />
      <div className="space-y-6 sm:space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
