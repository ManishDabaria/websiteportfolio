import { forwardRef } from 'react';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants = {
  primary:
    'bg-fg text-bg hover:bg-fg/90 shadow-[0_0_0_1px_rgb(var(--fg)/0.1),0_8px_30px_-8px_rgb(var(--accent)/0.6)] hover:shadow-[0_0_0_1px_rgb(var(--fg)/0.1),0_12px_40px_-8px_rgb(var(--accent)/0.8)]',
  accent:
    'text-white bg-gradient-to-r from-accent to-violet hover:brightness-110 shadow-[0_8px_30px_-10px_rgb(var(--violet)/0.8)]',
  secondary: 'border border-line bg-surface/60 text-fg backdrop-blur hover:border-subtle/60 hover:bg-elevated',
  ghost: 'text-muted hover:text-fg hover:bg-elevated',
};

const sizes = {
  sm: 'h-9 px-4',
  md: 'h-11 px-5',
  lg: 'h-12 px-6 text-[15px]',
  icon: 'h-10 w-10',
};

/** Renders <a> when `href` is set, otherwise <button>. */
const Button = forwardRef(function Button(
  { href, variant = 'primary', size = 'md', className = '', children, external, ...props },
  ref,
) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a ref={ref} href={href} className={cls} {...ext} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} {...props}>
      {children}
    </button>
  );
});

export default Button;
