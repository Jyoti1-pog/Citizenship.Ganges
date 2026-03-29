import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorX = useMotionValue(-16);
  const cursorY = useMotionValue(-16);
  
  // Smooth, premium ease for the cursor follower
  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktops). Disables entirely on touch interfaces.
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-accent-orange/30 rounded-full pointer-events-none z-[9999] mix-blend-multiply blur-[2px] will-change-transform shadow-[0_0_15px_rgba(243,156,18,0.4)]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
