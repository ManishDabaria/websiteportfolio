import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from 'framer-motion';

/** Fixed ambient backdrop: grid, aurora glows, grain, cursor glow + scroll progress bar. */
export default function Background() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Cursor-following glow — only for precise pointers (mouse/trackpad)
  const [finePointer, setFinePointer] = useState(false);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 220, damping: 40, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 40, mass: 0.6 });
  const glow = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, rgb(var(--accent) / 0.07), transparent 40%)`;

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFinePointer(mq.matches);
    if (!mq.matches) return undefined;
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-violet to-cyan"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 animate-aurora rounded-full bg-accent/[0.13] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[30%] h-[28rem] w-[28rem] animate-drift rounded-full bg-violet/[0.09] blur-[120px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[26rem] w-[26rem] animate-drift rounded-full bg-cyan/[0.06] blur-[120px] [animation-delay:-12s]" />
        <div className="noise absolute inset-0 opacity-[0.025] mix-blend-overlay" />
      </div>
      {finePointer && (
        <motion.div aria-hidden="true" style={{ background: glow }} className="pointer-events-none fixed inset-0 -z-10" />
      )}
    </>
  );
}
