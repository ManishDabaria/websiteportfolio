import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { personal, projects } from '../config/site';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import ProjectMockup from '../components/ui/ProjectMockup';
import ProjectLinks from '../components/ui/ProjectLinks';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    if (project) document.title = `${project.title} — ${personal.name}`;
  }, [project]);

  if (!project) return <NotFound />;

  return (
    <article className="pb-24 pt-32 sm:pt-36" aria-labelledby="project-title">
      <div className="container-content">
        <Reveal>
          <Link to="/#projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            All projects
          </Link>

          <p className="eyebrow mt-10 flex">
            <span className="text-accent">0{index + 1}</span>
            <span className="h-px w-6 bg-line" aria-hidden="true" />
            {project.category}
          </p>
          <h1 id="project-title" className="text-fade mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.overview}</p>
          <div className="mt-8">
            <ProjectLinks project={project} showView={false} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="card group overflow-hidden">
            <ProjectMockup project={project} large className="aspect-[4/3] sm:aspect-[16/9]" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="text-xl font-semibold text-fg">Highlights</h2>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-fg">Impact</h2>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="card px-4 py-4">
                    <dt className="text-xs text-subtle">{m.label}</dt>
                    <dd className="text-gradient mt-1 text-2xl font-semibold">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">Tech stack</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag className="px-2.5 py-1 text-xs">{s}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {next && next.slug !== project.slug && (
          <Link
            to={`/projects/${next.slug}`}
            className="card group mt-20 flex items-center justify-between gap-6 p-6 transition-colors hover:border-accent/40 sm:p-8"
          >
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-2 text-xl font-semibold text-fg sm:text-2xl">{next.title}</p>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition-transform group-hover:translate-x-1">
              <ArrowRight size={18} aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
