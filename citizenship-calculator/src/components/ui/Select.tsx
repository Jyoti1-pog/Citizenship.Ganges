import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  error?: string;
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, id, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={id}
            className={cn(
              'flex h-11 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
        </div>
        {error && (
          <p id={`${id}-error`} className="text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
