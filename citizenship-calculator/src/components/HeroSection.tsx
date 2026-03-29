import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { Scale, Globe, FileText } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

// Word animation variants
const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: "spring" as const, damping: 12, stiffness: 200 }
  }
};

export function HeroSection() {
  const setForm = useAppStore((s) => s.setForm);
  const title = "Know Exactly When You'll Get Your Citizenship";

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center text-primary-navy py-8 w-full z-10 relative"
    >
      <motion.div 
        variants={itemVariants} 
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="p-5 bg-white/60 backdrop-blur-md shadow-xl shadow-accent-orange/10 rounded-full mb-6 relative group cursor-pointer border border-white"
      >
        <div className="absolute inset-0 rounded-full bg-accent-orange/50 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        <Scale className="w-14 h-14 text-accent-orange relative z-10 drop-shadow-md" />
      </motion.div>
      
      <motion.h1 
        className="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold tracking-tight mb-6 mt-2 relative inline-block text-primary-navy [perspective:1000px]"
        style={{ lineHeight: 1.15 }}
      >
        <span className="relative z-10 flex flex-wrap justify-center gap-x-[0.25em]">
          {title.split(" ").map((word, index) => (
            <motion.span variants={wordAnimation} key={index} className="inline-block origin-bottom shadow-sm drop-shadow-sm">
              {word}
            </motion.span>
          ))}
        </span>
        {/* Highlight behind text matching poster vibrancy */}
        <motion.span 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] origin-center h-4 bg-accent-orange/30 rounded-full -z-10 blur-[4px]"
        />
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-lg sm:text-xl text-primary-navy/80 mb-10 max-w-md mx-auto leading-relaxed font-medium"
      >
        Our advanced algorithmic matrix calculates your exact processing timeline based on demographic and legislative data.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col gap-5 w-full px-4 mb-12">
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4 text-left p-5 rounded-3xl bg-white/70 backdrop-blur-lg border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <div className="p-3 bg-accent-ocean/15 rounded-xl">
            <Globe className="w-6 h-6 text-accent-ocean shrink-0" />
          </div>
          <p className="text-sm font-bold text-primary-navy">Cross-referenced with global birth registry databases in real-time.</p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4 text-left p-5 rounded-3xl bg-white/70 backdrop-blur-lg border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <div className="p-3 bg-accent-red/15 rounded-xl">
            <FileText className="w-6 h-6 text-accent-red shrink-0" />
          </div>
          <p className="text-sm font-bold text-primary-navy">Fully compliant with international bureaucratic regulations.</p>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full relative">
        <div className="absolute -inset-2 bg-accent-orange/30 blur-2xl rounded-full animate-pulse top-2 pointer-events-none"></div>
        <Button 
          onClick={setForm} 
          size="lg" 
          className="relative overflow-hidden group w-full sm:w-[90%] mx-auto bg-gradient-to-r from-primary-navy to-[#0F766E] hover:from-[#0F766E] hover:to-primary-navy text-accent-orange font-extrabold text-2xl h-16 shadow-[0_15px_40px_rgba(0,56,101,0.4)] hover:-translate-y-1 active:translate-y-1 rounded-full transition-all border-b-[6px] border-[#00182C] active:border-b-[2px]"
        >
          <motion.div 
            animate={{ x: ["-100%", "200%"], opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
          <span className="relative flex items-center justify-center gap-2 tracking-wide font-sans group-hover:scale-105 transition-transform duration-300">
            Apply Now!
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
