import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import Button from './Button';

/** GitHub / Live Demo / View Project actions. Missing URLs render as disabled "soon" buttons. */
export default function ProjectLinks({ project, showView = true }) {
  const soon = 'Link coming soon';
  return (
    <div className="flex flex-wrap items-center gap-2">
      {showView && (
        <Link
          to={`/projects/${project.slug}`}
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-bg transition-all hover:bg-fg/90"
          aria-label={`View project details: ${project.title}`}
        >
          View Project
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
      {project.github ? (
        <Button href={project.github} external variant="secondary" size="sm" className="h-10" aria-label={`${project.title} source code on GitHub`}>
          <FaGithub size={15} aria-hidden="true" /> GitHub
        </Button>
      ) : (
        <Button variant="secondary" size="sm" className="h-10" disabled title={soon} aria-label={`GitHub for ${project.title} — ${soon}`}>
          <FaGithub size={15} aria-hidden="true" /> GitHub
        </Button>
      )}
      {project.demo ? (
        <Button href={project.demo} external variant="ghost" size="sm" className="h-10" aria-label={`Live demo of ${project.title}`}>
          Live Demo <ArrowUpRight size={15} aria-hidden="true" />
        </Button>
      ) : (
        <Button variant="ghost" size="sm" className="h-10" disabled title={soon} aria-label={`Live demo for ${project.title} — ${soon}`}>
          Live Demo <ArrowUpRight size={15} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
