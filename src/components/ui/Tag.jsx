export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-elevated/70 px-2 py-0.5 font-mono text-[11px] text-muted ${className}`}
    >
      {children}
    </span>
  );
}
