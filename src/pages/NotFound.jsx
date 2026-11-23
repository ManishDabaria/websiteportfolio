import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { personal } from '../config/site';

export default function NotFound() {
  useEffect(() => {
    document.title = `404 — Page not found · ${personal.name}`;
  }, []);

  return (
    <section aria-labelledby="nf-title" className="relative grid min-h-[100svh] place-items-center px-4 pt-20">
      <div className="text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 id="nf-title" className="text-gradient mt-4 font-mono text-[7rem] font-semibold leading-none tracking-[-0.06em] sm:text-[10rem]">
          404
        </h1>
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-line bg-surface/70 p-4 text-left font-mono text-xs leading-relaxed sm:text-sm">
          <p className="text-subtle">$ curl {typeof window !== 'undefined' ? window.location.pathname : '/'}</p>
          <p className="text-rose-500">✗ route not found</p>
          <p className="text-muted">→ suggestion: head back home and try again</p>
        </div>
        <p className="mt-6 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link
          to="/"
          className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-fg/90"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
