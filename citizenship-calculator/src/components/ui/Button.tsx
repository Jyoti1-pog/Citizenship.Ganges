import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy disabled:pointer-events-none disabled:opacity-50 will-change-transform',
          {
            'bg-primary-navy text-accent-orange hover:bg-primary-navy/90 shadow-[0_4px_14px_0_rgba(0,56,101,0.2)] hover:shadow-[0_6px_20px_rgba(0,56,101,0.25)]': variant === 'primary',
            'bg-accent-orange text-white hover:bg-accent-orange/90 shadow-[0_4px_14px_0_rgba(243,156,18,0.2)] hover:shadow-[0_6px_20px_rgba(243,156,18,0.25)]': variant === 'secondary',
            'border border-slate-200 bg-transparent hover:bg-slate-50 text-primary-navy shadow-sm': variant === 'outline',
            'hover:bg-slate-100 text-primary-navy': variant === 'ghost',
            'h-9 px-4 text-sm min-h-[44px]': size === 'sm', // Ensure minimum 44px for touch on mobile
            'h-11 px-6 text-base min-h-[44px]': size === 'md',
            'h-14 px-8 text-lg font-semibold min-h-[44px]': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
