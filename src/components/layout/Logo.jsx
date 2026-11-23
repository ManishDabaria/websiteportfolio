import { personal } from '../../config/site';

/** MD monogram. */
export default function Logo({ withName = true }) {
  return (
    <span className="group inline-flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-fg text-bg transition-transform duration-300 group-hover:rotate-[-6deg]">
        <span className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-br from-accent to-violet opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80" />
        <span className="font-mono text-[13px] font-semibold tracking-tighter">{personal.initials}</span>
      </span>
      {withName && (
        <span className="hidden text-sm font-semibold tracking-tight text-fg sm:inline">
          {personal.name}
        </span>
      )}
    </span>
  );
}
