import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore, type FormData } from '@/store/useAppStore';
import { calculateCitizenship } from '@/utils/calculateCitizenship';
import { DatePicker } from '@/components/ui/DatePicker';
import { differenceInYears } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  dob: z.date().refine((date) => differenceInYears(new Date(), date) >= 18, {
    message: 'You must be at least 18 years old to apply',
  }),
  yearsLived: z.number().min(0, 'Cannot be negative').max(100, 'Invalid number of years'),
  visaStatus: z.enum([
    'Student Visa',
    'Work Permit',
    'Permanent Resident',
    'Investor Visa',
    'Temporary Protection',
    'Other'
  ], {
    message: 'Please select a valid visa status'
  }),
});

export function CalculatorForm() {
  const setLoading = useAppStore((s) => s.setLoading);
  const setResult = useAppStore((s) => s.setResult);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    console.log("[Citizenship Calculator] Form validated successfully. Data:", data);
    
    // 1. Trigger loading state
    console.log("[Citizenship Calculator] Setting phase to 'loading'");
    setLoading(data);
    
    // 2. Run the citizenship calculation
    console.log("[Citizenship Calculator] Running algorithmic citizenship calculation and cross-referencing databases...");
    const resultObject = calculateCitizenship(data);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // 3. Transition to result phase with the dynamically calculated result
    console.log("[Citizenship Calculator] Setting phase to 'result' with outcome:", resultObject);
    setResult(resultObject);
  };

  return (
    <Card className="w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-500">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Applicant Details</h2>
        <p className="text-sm text-slate-500 mt-2">
          Provide accurate data to ensure algorithm precision.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={control}
          name="dob"
          render={({ field }) => {
            const age = field.value ? differenceInYears(new Date(), field.value) : null;
            
            return (
              <div className="space-y-1">
                <DatePicker
                  label="Date of Birth"
                  required
                  value={field.value as Date | null}
                  onChange={(date: Date | null) => {
                    if (date) field.onChange(date);
                  }}
                  error={errors.dob?.message}
                />
                <AnimatePresence>
                  {age !== null && age >= 18 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-semibold text-emerald-600 pl-1"
                    >
                      Calculated Age: {age} years old
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }}
        />

        <Input
          label="Years Lived in Country"
          type="number"
          min={0}
          max={100}
          placeholder="e.g., 5"
          required
          error={errors.yearsLived?.message}
          {...register('yearsLived', { valueAsNumber: true })}
        />

        <Select
          label="Current Visa Status"
          required
          error={errors.visaStatus?.message}
          {...register('visaStatus')}
          defaultValue=""
        >
          <option value="" disabled>Select status...</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Work Permit">Work Permit</option>
          <option value="Permanent Resident">Permanent Resident</option>
          <option value="Investor Visa">Investor Visa</option>
          <option value="Temporary Protection">Temporary Protection</option>
          <option value="Other">Other</option>
        </Select>

        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            By analyzing your status, you consent to digital processing governed by the Automated Bureaucracy Act of 2026.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Initializing...' : 'Analyze Immigration Status'}
        </Button>
      </form>
    </Card>
  );
}
