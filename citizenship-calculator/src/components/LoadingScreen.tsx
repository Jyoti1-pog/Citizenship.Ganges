import { useEffect, useState } from 'react';
import { Loader2, ShoppingCart, ShoppingBag, Store, Gift, Tag, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackgroundIcons } from './AnimatedBackgroundIcons';
import { LoadingProgressBar } from './LoadingProgressBar';

const messages = [
  "Scanning immigration databases...",
  "Cross-referencing global birth records...",
  "Calculating bureaucratic delays...",
  "Finalizing timeline..."
];

const ICONS = [ShoppingCart, ShoppingBag, Store, Gift, Tag, CreditCard];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // 3 seconds total duration
    const duration = 3000;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Change message 4 times over 3 seconds (every 750ms)
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 750);
    return () => clearInterval(msgTimer);
  }, []);

  const CurrentIcon = ICONS[messageIndex % ICONS.length];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {/* Ambient background icons layer */}
      <AnimatedBackgroundIcons />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm mx-auto"
      >
        {/* Continuous floating motion for the whole card */}
        <motion.div
          animate={{ y: [-4, 4] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3,
            ease: "easeInOut"
          }}
        >
          <Card className="w-full p-8 text-center bg-white border border-primary-navy/20 text-primary-navy shadow-lg relative overflow-hidden">
            {/* Subtle background gradient animation inside card */}
            <motion.div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(243,156,18,0.15) 0%, transparent 60%)'
              }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              <div className="flex justify-center items-center h-24 mb-4 relative">
                {/* Glow pulse effect behind main icon */}
                <motion.div
                  className="absolute inset-0 bg-accent-orange/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                
                {/* Beautiful cyclic icon animations */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={messageIndex}
                    initial={{ scale: 0.2, opacity: 0, rotate: -45, y: 15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45, y: -15 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 12,
                      mass: 0.8 
                    }}
                    className="absolute"
                  >
                    <CurrentIcon 
                      className="w-16 h-16 text-accent-orange drop-shadow-md relative z-10" 
                      strokeWidth={1.5} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 flex items-center justify-center gap-3 tracking-wide mt-2">
                <Loader2 className="w-5 h-5 animate-spin text-accent-orange" />
                Processing Request
              </h2>
              
              <p className="text-sm text-primary-navy/70 mb-6 h-5 transition-opacity duration-300 font-light">
                {messages[messageIndex]}
              </p>

              <LoadingProgressBar progress={progress} />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
