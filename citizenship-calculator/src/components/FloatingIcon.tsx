import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FloatingIconProps {
  Icon: LucideIcon;
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  startX: string;
  endX: string;
  className?: string;
}

export function FloatingIcon({
  Icon,
  size = 24,
  color = '#F39C12',
  delay = 0,
  duration = 15,
  startX,
  endX,
  className = '',
}: FloatingIconProps) {
  return (
    <motion.div
      className={`absolute opacity-0 ${className} [perspective:1000px]`}
      initial={{ x: startX, y: '110vh', opacity: 0, rotateZ: 0, rotateX: 0, rotateY: 0 }}
      animate={{
        x: [startX, endX],
        y: ['110vh', '-10vh'],
        opacity: [0, 0.25, 0.4, 0.25, 0],
        rotateZ: [0, 180, 360],
        rotateX: [0, 260, 720],
        rotateY: [0, 360, 180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      <Icon size={size} color={color} strokeWidth={1.5} className="drop-shadow-lg" />
    </motion.div>
  );
}
