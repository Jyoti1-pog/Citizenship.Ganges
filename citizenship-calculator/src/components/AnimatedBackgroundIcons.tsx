import { useMemo, useEffect, useState } from 'react';
import { ShoppingCart, ShoppingBag, Tag, Gift, Coins } from 'lucide-react';
import { FloatingIcon } from './FloatingIcon';

const ICONS = [ShoppingCart, ShoppingBag, Tag, Gift, Coins];
const COLORS = ['#F39C12', '#D32F2F', '#2980B9', '#003865']; // Poster Orange, Red, Ocean, Navy

export function AnimatedBackgroundIcons() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const floatingIcons = useMemo(() => {
    // HEAVY background animations requested: 45 on desktop, 18 on mobile
    const iconCount = isMobile ? 18 : 45;

    return Array.from({ length: iconCount }).map((_, i) => {
      const Icon = ICONS[i % ICONS.length];
      const color = COLORS[i % COLORS.length];
      
      // Keep mobile perspective clean by avoiding edges and scaling down sizes slightly
      const startX = `${5 + Math.random() * 90}vw`; 
      const endX = `${Math.random() * 100}vw`;
      
      const delay = Math.random() * 20; // Spread out more due to heavy count
      const duration = 20 + Math.random() * 25; // 20-45s duration
      const size = isMobile 
        ? 12 + Math.random() * 18 // smaller bounds on mobile
        : 16 + Math.random() * 32; 
      
      return (
        <FloatingIcon
          key={i}
          Icon={Icon}
          startX={startX}
          endX={endX}
          delay={delay}
          duration={duration}
          size={size}
          color={color}
        />
      );
    });
  }, [isMobile]); // Repopulate if device orientation changes significantly 

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {floatingIcons}
    </div>
  );
}
