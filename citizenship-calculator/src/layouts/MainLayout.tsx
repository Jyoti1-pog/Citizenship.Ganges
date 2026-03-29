import { type ReactNode, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { AnimatedBackgroundIcons } from '@/components/AnimatedBackgroundIcons';

export function MainLayout({ children }: { children: ReactNode }) {
  const { state } = useAppStore();
  const isResult = state.status === 'result';
  const isLoading = state.status === 'loading';
  const hideHeaderFooter = isResult || isLoading;

  // Scroll detection for sticky navbar
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Parallax effect for background elements
  const yParallaxOrange = useTransform(scrollY, [0, 1000], ['0%', '-30%']);
  const yParallaxOcean = useTransform(scrollY, [0, 1000], ['0%', '-40%']);
  const yParallaxRed = useTransform(scrollY, [0, 1000], ['0%', '-20%']);

  return (
    <div
      className={cn(
        'min-h-screen w-full flex flex-col transition-all duration-1000 ease-in-out relative overflow-hidden',
        'bg-[#FFF4E0] text-primary-navy'
      )}
    >
      {/* Global Shopping Animated Background - Re-styled for light theme */}
      <div className="opacity-70">
         <AnimatedBackgroundIcons />
      </div>

      {/* Decorative ambient grain for premium texture */}
      <div className="absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

      {/* Animated Gradient Background Blobs matching poster vibrancy */}
      {!isResult && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-accent-orange blur-[100px] mix-blend-multiply opacity-30 will-change-transform"
            style={{ y: yParallaxOrange }}
            animate={{
              x: ['0%', '10%', '-5%', '0%'],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent-ocean blur-[120px] mix-blend-multiply opacity-25 will-change-transform"
            style={{ y: yParallaxOcean }}
            animate={{
              x: ['0%', '-15%', '5%', '0%'],
              scale: [1, 1.2, 0.85, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[60vw] rounded-full bg-accent-red blur-[130px] mix-blend-multiply opacity-20 will-change-transform"
            style={{ y: yParallaxRed }}
            animate={{
              x: ['0%', '20%', '-10%', '0%'],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        </div>
      )}

      {/* Subtle geometric pattern overlay */}
      {!hideHeaderFooter && (
        <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwem0xMiAxMmw2LTZ2MTJ6IiBmaWxsPSIjMDAwIi8+PC9zdmc+')] bg-repeat" />
      )}

      {!hideHeaderFooter && (
        <motion.header 
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: "-100%", opacity: 0 }
          }}
          initial="visible"
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out
          className="sticky top-0 z-[100] w-full flex items-center justify-center sm:justify-start p-4 sm:p-6 text-primary-navy bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm will-change-transform"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-white/80 p-2 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] mr-3 border border-white"
          >
            <ShieldCheck className="w-8 h-8 text-accent-orange" />
          </motion.div>
          <h1 className="text-xl font-extrabold tracking-tight">Dept. of Global Citizenship</h1>
        </motion.header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-20 w-full max-w-lg mx-auto">
        {children}
      </main>

      {!hideHeaderFooter && (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-10 w-full text-center p-6 text-primary-navy/60 font-medium text-xs mt-auto bg-transparent"
        >
          &copy; {new Date().getFullYear()} Federal Citizenship Immigration Processing Module.
        </motion.footer>
      )}
    </div>
  );
}
