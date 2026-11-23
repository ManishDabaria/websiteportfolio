import { useSpotlight } from '../../hooks/useSpotlight';

/** Card with a cursor-following glow and gradient border. */
export default function SpotlightCard({ as: Comp = 'div', className = '', innerClassName = '', beam = false, children, ...props }) {
  const onMove = useSpotlight();
  return (
    <Comp onMouseMove={onMove} className={`card spotlight overflow-hidden ${beam ? 'group' : ''} ${className}`} {...props}>
      {beam && <div className="beam-ring on-hover" aria-hidden="true" />}
      <div className={`relative z-[2] h-full ${innerClassName}`}>{children}</div>
    </Comp>
  );
}
