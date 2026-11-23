import { ArrowUp } from 'lucide-react';
import { navLinks, personal } from '../../config/site';
import { useScrollTo } from '../../hooks/useScrollTo';
import SocialLinks from '../ui/SocialLinks';
import Logo from './Logo';

export default function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <footer className="relative border-t border-line/70">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto] md:gap-16">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {personal.tagline} Full-stack engineering meets applied AI — from Jaipur, for the world.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line/70 pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {personal.name}. Designed &amp; Built by {personal.name}.
          </p>
          <a
            href="#home"
            onClick={(e) => go(e, 'home')}
            className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-transform group-hover:-translate-y-0.5">
              <ArrowUp size={13} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
