import { motion } from 'framer-motion';

interface LoadingProgressBarProps {
  progress: number;
}

export function LoadingProgressBar({ progress }: LoadingProgressBarProps) {
  return (
    <div className="w-full mt-8">
      <div className="relative w-full h-1.5 bg-primary-navy/10 rounded-full overflow-hidden shadow-inner border border-primary-navy/5">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 via-accent-orange to-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Shimmer Effect wrapper */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                width: '50%',
              }}
              animate={{ x: ['-200%', '300%'] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-3">
        <motion.p 
          className="text-[10px] tracking-widest text-accent-orange font-bold font-mono"
          key={Math.round(progress)}
          initial={{ opacity: 0.5, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {Math.round(progress)}% COMPLETE
        </motion.p>
      </div>
    </div>
  );
}
