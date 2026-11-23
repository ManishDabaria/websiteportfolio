import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** Smooth-scrolls to a section; navigates home first when on another route. */
export function useScrollTo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id) => {
      if (pathname !== '/') {
        navigate(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id === 'home' ? '/' : `#${id}`);
      // Move focus for keyboard & screen-reader users without re-scrolling
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    },
    [navigate, pathname],
  );
}
