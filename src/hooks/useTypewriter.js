import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Types and deletes each phrase in turn, forever. */
export function useTypewriter(words, { typeMs = 70, deleteMs = 35, holdMs = 1600 } = {}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || !words.length) return undefined;
    const word = words[index % words.length];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduce, typeMs, deleteMs, holdMs]);

  return text;
}
