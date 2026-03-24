import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#0A1F44] text-white hover:bg-[#0A1F44]/90 shadow-sm': variant === 'primary',
            'bg-[#C8A95E] text-white hover:bg-[#C8A95E]/90 shadow-sm': variant === 'secondary',
            'border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900': variant === 'outline',
            'hover:bg-slate-100 text-slate-900': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg font-semibold': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
