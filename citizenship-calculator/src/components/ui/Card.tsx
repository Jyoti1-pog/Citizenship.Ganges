import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div 
        ref={ref}
        whileHover={{ 
          y: -5, 
          scale: 1.02, 
          boxShadow: "0 25px 50px -12px rgba(0, 56, 101, 0.15)" 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "rounded-3xl border border-white/60 bg-white/60 backdrop-blur-xl text-primary-navy shadow-[0_8px_30px_rgb(0,0,0,0.06)] will-change-transform", 
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
