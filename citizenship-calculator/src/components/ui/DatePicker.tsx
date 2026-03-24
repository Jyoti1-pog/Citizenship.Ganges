import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { subYears } from 'date-fns';

type CustomDatePickerProps = Omit<React.ComponentProps<typeof ReactDatePicker>, 'onChange'> & {
  value?: Date;
  onChange: (date: Date | null) => void;
  label?: string;
  error?: string;
  className?: string;
}

export const DatePicker = forwardRef<ReactDatePicker, CustomDatePickerProps>(
  ({ value, onChange, label, error, className, ...props }, ref) => {
    return (
      <div className="w-full relative space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-700 block drop-shadow-sm">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative group">
          <ReactDatePicker
            ref={ref as any}
            selected={value}
            onChange={(date: any) => onChange(date)}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            maxDate={subYears(new Date(), 18)} /* Natively lock to 18+ */
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
            className={cn(
              "flex h-12 w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-2 pl-12 text-sm text-slate-900 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 hover:bg-white focus:bg-white placeholder:text-slate-400 group-hover:border-slate-400",
              error && "border-red-500 focus-visible:ring-red-500 shadow-red-500/10",
              className
            )}
            wrapperClassName="w-full"
            {...props}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p className="text-xs font-semibold text-red-500 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
