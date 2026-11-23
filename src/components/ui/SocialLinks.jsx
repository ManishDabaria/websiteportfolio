import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { socials } from '../../config/site';

export const socialItems = [
  { key: 'github', label: 'GitHub', href: socials.github, Icon: FaGithub, external: true },
  { key: 'linkedin', label: 'LinkedIn', href: socials.linkedin, Icon: FaLinkedinIn, external: true },
  { key: 'email', label: 'Email', href: `mailto:${socials.email}`, Icon: Mail, external: false },
];

export default function SocialLinks({ className = '', size = 'md' }) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socialItems.map(({ key, label, href, Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`${box} inline-flex items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg`}
          >
            <Icon size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
