/**
 * Illustrated, theme-aware product mockups used when a project has no
 * screenshot yet. Pure markup — no images to download.
 */

function Chrome({ url, children }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/20">
      <div className="flex items-center gap-2 border-b border-line bg-elevated/70 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-bg/70 px-3 py-0.5 font-mono text-[10px] text-subtle">{url}</span>
      </div>
      <div className="relative flex-1 overflow-hidden p-3 sm:p-4">{children}</div>
    </div>
  );
}

const Bar = ({ w = 'w-full', className = '' }) => <div className={`h-2 rounded-full bg-line ${w} ${className}`} />;

function Fitness() {
  const bars = [40, 65, 52, 80, 70, 92, 60];
  return (
    <Chrome url="fittrack.ai/dashboard">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-2 flex flex-col items-center justify-center rounded-lg border border-line bg-bg/50 p-3">
          <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90 sm:h-24 sm:w-24" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(var(--line))" strokeWidth="10" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#fg1)" strokeWidth="10" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="70" />
            <defs>
              <linearGradient id="fg1"><stop offset="0" stopColor="rgb(var(--accent))" /><stop offset="1" stopColor="rgb(var(--cyan))" /></linearGradient>
            </defs>
          </svg>
          <p className="mt-2 font-mono text-[11px] font-semibold text-fg">1,840 kcal</p>
          <p className="text-[9px] text-subtle">of 2,400 goal</p>
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-line bg-bg/50 p-3">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-accent/50 to-cyan/80" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="rounded-lg border border-violet/30 bg-violet/10 p-2.5">
            <p className="mb-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-violet">✦ AI Coach</p>
            <Bar w="w-11/12" className="bg-violet/30" />
            <Bar w="w-2/3" className="mt-1.5 bg-violet/30" />
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Legal() {
  return (
    <Chrome url="lexis-ai.app/analyze">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3 space-y-2 rounded-lg border border-line bg-bg/50 p-3">
          <p className="font-mono text-[9px] text-subtle">contract_v3.pdf · p.12</p>
          <Bar w="w-full" />
          <Bar w="w-11/12" />
          <div className="rounded bg-accent/15 p-1 ring-1 ring-accent/30">
            <Bar w="w-full" className="bg-accent/40" />
            <Bar w="w-3/4" className="mt-1 bg-accent/40" />
          </div>
          <Bar w="w-10/12" />
          <Bar w="w-full" />
          <Bar w="w-2/3" />
        </div>
        <div className="col-span-2 flex flex-col justify-end gap-2">
          <div className="ml-auto max-w-[90%] rounded-lg rounded-br-sm bg-fg px-2 py-1.5 text-[9px] leading-tight text-bg">
            What are the termination clauses?
          </div>
          <div className="rounded-lg rounded-bl-sm border border-line bg-elevated p-2">
            <Bar w="w-full" className="bg-subtle/40" />
            <Bar w="w-4/5" className="mt-1.5 bg-subtle/40" />
            <span className="mt-2 inline-block rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[8px] text-accent">§12.3</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-line bg-bg/60 px-2 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
            <span className="font-mono text-[8px] text-subtle">RAG · 4 sources</span>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Artisan() {
  const tiles = ['from-amber-400/60 to-rose-400/50', 'from-cyan/50 to-accent/50', 'from-violet/60 to-fuchsia-400/40', 'from-emerald-400/50 to-cyan/40'];
  return (
    <Chrome url="artisanhub.in/shop">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-1.5">
          {['EN', 'हिं', 'ગુ', 'தமிழ்'].map((l, i) => (
            <span key={l} className={`rounded-full border px-2 py-0.5 text-[9px] ${i === 1 ? 'border-accent/50 bg-accent/15 text-accent' : 'border-line text-subtle'}`}>
              {l}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-4 gap-2">
          {tiles.map((t, i) => (
            <div key={i} className="flex flex-col rounded-lg border border-line bg-bg/50 p-1.5">
              <div className={`flex-1 rounded-md bg-gradient-to-br ${t}`} />
              <Bar w="w-3/4" className="mt-1.5 h-1.5" />
              <Bar w="w-1/2" className="mt-1 h-1.5 bg-accent/40" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet/30 bg-violet/10 px-2.5 py-2">
          <span className="font-mono text-[9px] text-violet">✦ AI listing</span>
          <Bar w="flex-1" className="bg-violet/30" />
          <span className="rounded bg-violet/80 px-1.5 py-0.5 text-[8px] font-medium text-white">Generate</span>
        </div>
      </div>
    </Chrome>
  );
}

const variants = { fitness: Fitness, legal: Legal, artisan: Artisan };

const glows = {
  fitness: 'from-accent/30 via-cyan/20',
  legal: 'from-violet/30 via-accent/20',
  artisan: 'from-amber-400/25 via-violet/20',
};

export default function ProjectMockup({ project, className = '', large = false }) {
  const Comp = variants[project.mockup] ?? Fitness;
  return (
    <div className={`relative overflow-hidden bg-elevated/40 ${className}`}>
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className={`absolute inset-0 bg-gradient-to-br ${glows[project.mockup] ?? glows.fitness} to-transparent`} aria-hidden="true" />
      {project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          width="1200"
          height="750"
          className="relative h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Illustrated interface preview of ${project.title}`}
          className={`relative h-full transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] ${
            large ? 'p-5 sm:px-12 sm:py-10 lg:px-24 lg:py-14' : 'p-5 sm:p-8'
          }`}
        >
          <div className={large ? 'mx-auto h-full max-w-3xl' : 'h-full'}>
            <Comp />
          </div>
        </div>
      )}
    </div>
  );
}
