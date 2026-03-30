import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type FormData } from '@/store/useAppStore';
import { DatePicker } from '@/components/ui/DatePicker';
import { differenceInYears } from 'date-fns';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
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

const staggeredContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const formItemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export function CalculatorForm() {
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
    // Just simulate network wait to give satisfying button feedback, but it's a static page
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Submitted", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
      className="w-full [perspective:1000px]"
    >
      <Card className="w-full p-6 sm:p-8 bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_rgba(0,56,101,0.12)] relative overflow-hidden rounded-3xl">
        {/* Subtle decorative glow behind form */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-accent-orange/20 rounded-full blur-[80px] pointer-events-none"
        ></motion.div>

        <div className="mb-8 text-center relative z-10">
          <h2 className="text-2xl font-black text-primary-navy tracking-tight drop-shadow-sm">Applicant Details</h2>
          <p className="text-sm text-primary-navy/70 mt-2 font-medium">
            Provide accurate data to ensure algorithm precision.
          </p>
        </div>

        <motion.form 
          variants={staggeredContainer}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 relative z-10"
        >
          <motion.div variants={formItemVariant}>
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
                          initial={{ opacity: 0, height: 0, x: -10 }}
                          animate={{ opacity: 1, height: 'auto', x: 0 }}
                          exit={{ opacity: 0, height: 0, x: 10 }}
                          className="text-xs font-bold text-accent-ocean pl-1"
                        >
                          Calculated Age: {age} years old
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }}
            />
          </motion.div>

          <motion.div variants={formItemVariant}>
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
          </motion.div>

          <motion.div variants={formItemVariant}>
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
          </motion.div>

          <motion.div variants={formItemVariant} className="flex items-start gap-3 p-4 bg-accent-orange/10 border border-accent-orange/20 rounded-xl overflow-hidden relative">
            <motion.div 
               animate={{ x: ["-100%", "200%"] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 opacity-50" 
            />
            <AlertCircle className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
            <p className="text-xs text-primary-navy/80 font-bold leading-relaxed relative z-10">
              By analyzing your status, you consent to digital processing governed by the Automated Bureaucracy Act of 2026.
            </p>
          </motion.div>

          <motion.div 
            variants={formItemVariant} 
            // Mobile sticky bottom bar implementation
            className="fixed bottom-0 left-0 right-0 p-4 pb-8 sm:pb-4 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-[60] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] md:static md:bg-transparent md:border-none md:p-0 md:shadow-none"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -inset-2 bg-accent-orange/30 blur-2xl rounded-full animate-pulse top-2 pointer-events-none md:block hidden"></div>
              <Button
                type="submit"
                className="w-full relative overflow-hidden group h-14 sm:h-16 bg-gradient-to-r from-primary-navy to-[#002543] hover:from-[#002543] hover:to-[#00182C] text-accent-orange font-extrabold text-xl shadow-[0_8px_20px_rgba(0,56,101,0.2)] border-b-[4px] border-[#00182C] rounded-full hover:-translate-y-0.5 active:translate-y-1 active:border-b-[2px] transition-all"
                disabled={isSubmitting}
              >
                <motion.div 
                  animate={{ x: ["-100%", "200%"], opacity: [0, 1, 0] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
                <span className="group-hover:scale-105 transition-transform duration-300">
                  {isSubmitting ? 'Processing...' : 'Analyze Status'}
                </span>
              </Button>
            </div>
          </motion.div>
        </motion.form>
      </Card>
    </motion.div>
  );
}
