/** Semantic section wrapper with consistent vertical rhythm. */
export default function Section({ id, children, className = '', labelledBy }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-24 outline-none sm:py-32 ${className}`}>
      <div className="container-content">{children}</div>
    </section>
  );
}
