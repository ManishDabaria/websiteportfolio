import { useEffect, useState } from 'react';

/** Returns the id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(enabled ? ids[0] : null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return undefined;
    }
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    setActive(ids[0]);

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const first = ids.find((id) => visible.get(id));
        if (first) setActive(first);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
