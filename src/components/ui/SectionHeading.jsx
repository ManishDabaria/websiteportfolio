import Reveal from './Reveal';

export default function SectionHeading({ id, index, eyebrow, title, description, align = 'left' }) {
  const center = align === 'center';
  return (
    <Reveal className={`mb-14 max-w-2xl sm:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow mb-4 ${center ? 'justify-center' : ''}`}>
        {index && <span className="text-accent">{index}</span>}
        <span className="h-px w-6 bg-line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-fade text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
