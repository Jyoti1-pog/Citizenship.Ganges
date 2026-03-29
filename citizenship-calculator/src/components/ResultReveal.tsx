import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { useShare } from '@/hooks/useShare';
import { Share2, Repeat, Check, ShieldCheck, TrendingUp, AlertCircle, Info, Mail } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.01 2.005a9.98 9.98 0 00-8.525 15.17l-1.325 4.832 4.944-1.296A9.98 9.98 0 0012.01 22a9.98 9.98 0 000-19.995zM12.01 20.372a8.358 8.358 0 01-4.257-1.161l-.305-.181-3.16.828.845-3.08-.2-.317A8.344 8.344 0 013.653 12a8.356 8.356 0 018.357-8.357A8.356 8.356 0 0120.367 12a8.356 8.356 0 01-8.357 8.372zm4.597-6.273c-.252-.126-1.492-.736-1.724-.821-.232-.084-.4-.126-.568.126-.168.253-.652.821-.8 1.073-.016.027-.1-.037-.235-.101-.252-.126-.252-.126-.525-.231a3.02 3.02 0 01-1.579-.982c-.894-.972-1.076-1.272-1.203-1.499-.126-.226-.013-.347.113-.473.113-.113.252-.294.378-.441.126-.147.168-.252.252-.42.084-.168.042-.315-.021-.441-.063-.126-.568-1.365-.778-1.87-.205-.494-.413-.427-.568-.435l-.483-.01c-.168 0-.441.063-.673.315-.232.252-.884.861-.884 2.1s.904 2.435 1.031 2.603c.126.168 1.77 2.7 4.28 3.722.599.243 1.068.388 1.435.497.602.179 1.15.153 1.583.093.486-.067 1.492-.61 1.703-1.198.21-.588.21-1.092.147-1.198-.063-.105-.232-.168-.484-.294z" />
  </svg>
);

export default function ResultReveal() {
  const { state, setLanding } = useAppStore();
  const { handleCopy, copied } = useShare();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const result = state.status === 'result' ? state.result : null;
  const isHighProbability = result ? result.probability >= 50 : false;

  useEffect(() => {
    if (state.status === 'result' && isHighProbability) {
      const t = setTimeout(() => setShowConfetti(true), 800);
      return () => clearTimeout(t);
    }
  }, [state.status, isHighProbability]);

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (state.status === 'result' && result) {
      const animation = animate(count, result.probability, { duration: 1.5, ease: "easeOut", delay: 0.6 });
      return animation.stop;
    }
  }, [state.status, result?.probability, count]);

  if (state.status !== 'result' || !result) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
      className="relative w-full max-w-xl mx-auto z-10"
    >
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-center overflow-hidden">
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={800}
          gravity={0.15}
          initialVelocityY={25}
          colors={['#ffffff', '#F39C12', '#D32F2F', '#E67E22', '#FDF5E6']}
          className="z-[999]"
        />
        </div>
      )}
      
      {/* Light Poster Style Ambient Glow */}
      <div className={`absolute -inset-4 blur-3xl opacity-20 rounded-[3rem] ${isHighProbability ? 'bg-emerald-400' : 'bg-accent-orange'} animate-pulse`}></div>

      <div className="relative w-full p-8 sm:p-10 bg-white/90 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,56,101,0.12)] rounded-3xl border border-white/60 overflow-hidden flex flex-col items-center">
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

        {/* Shield Icon neatly integrated INSIDE the card (Stripe style) */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${isHighProbability ? 'bg-emerald-50 border-emerald-200 text-emerald-500' : 'bg-red-50 border-red-200 text-accent-red'}`}>
          <ShieldCheck className="w-8 h-8" strokeWidth={2} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-navy mb-2 tracking-tight text-center drop-shadow-sm">
          Assessment Complete
        </h2>
        <p className="text-primary-navy/70 mb-8 max-w-sm mx-auto text-center font-medium text-sm sm:text-base">
          {isHighProbability ? 'Your profile has been analyzed perfectly 🌍' : 'Analysis concluded based on metrics ⚖️'}
        </p>
        
        {/* Animated Score Box */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ 
            scale: [0.95, 1.1, 1], 
            opacity: 1 
          }}
          transition={{ 
            delay: 0.4, 
            type: 'spring', 
            bounce: 0.4,
            scale: { repeat: Infinity, repeatType: "mirror", duration: 1.5, ease: "easeInOut", delay: 1.5 }
          }}
          className={`w-full flex flex-col items-center justify-center p-8 rounded-2xl mb-6 relative overflow-hidden group transition-all duration-300 hover:shadow-lg ${isHighProbability ? 'bg-emerald-50 border border-emerald-200' : 'bg-orange-50 border border-orange-200'}`}
        >
          <TrendingUp className={`w-6 h-6 mb-3 ${isHighProbability ? 'text-emerald-500' : 'text-accent-orange'}`} />
          <h3 className="text-xs font-bold text-primary-navy/50 tracking-[0.2em] uppercase mb-1">Probability</h3>
          
          <div className="flex items-baseline gap-1">
            <motion.span className={`text-6xl sm:text-7xl font-black tracking-tighter ${isHighProbability ? 'text-emerald-600' : 'text-primary-navy drop-shadow-sm'}`}>
              {rounded}
            </motion.span>
            <span className={`text-2xl font-bold ${isHighProbability ? 'text-emerald-500' : 'text-accent-orange'}`}>%</span>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="w-full space-y-3 mb-6">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`w-full flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl border ${isHighProbability ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}
          >
             <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${isHighProbability ? 'text-emerald-500' : 'text-accent-red'}`} />
             <div>
               <p className="text-sm font-bold text-primary-navy mb-1">Status Overview</p>
               <p className="text-sm text-primary-navy/80 leading-relaxed font-medium">
                 {result.message}
               </p>
             </div>
          </motion.div>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200"
          >
            <Info className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
            <div>
               <p className="text-sm font-bold text-primary-navy mb-1">Recommendation</p>
               <p className="text-sm text-primary-navy/80 leading-relaxed font-medium">{result.recommendation}</p>
            </div>
          </motion.div>
        </div>

        {/* Playful aesthetic badge */}
        <motion.a 
          href="https://www.ganges.world/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
          className="w-full relative overflow-hidden group mb-10 p-[1px] rounded-2xl bg-gradient-to-r from-accent-orange to-accent-red shadow-[0_10px_30px_rgba(243,156,18,0.25)] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300 block cursor-pointer"
        >
          <div className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-xl group-hover:bg-white/80 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-orange"></span>
            </span>
            <span className="text-[13px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-orange to-accent-red tracking-widest uppercase mt-0.5">
              Shop like you're in India
            </span>
            <span className="text-lg drop-shadow-sm">✨</span>
          </div>
        </motion.a>

        {/* Actions & Support Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full flex flex-col items-center pt-8 border-t border-slate-200 pb-20 md:pb-0"
        >
          <div className="w-full flex items-center justify-between mb-5">
            <h4 className="text-xs font-bold text-primary-navy/50 uppercase tracking-wider">Support & Sharing</h4>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center gap-3 mb-8">
            <Button 
              onClick={() => window.open('https://wa.me/918209893843?text=Hello%2C%20I%20need%20help%20with%20my%20citizenship%20calculator%20result.', '_blank')} 
              variant="outline" 
              className="flex-1 w-full h-12 gap-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-primary-navy font-bold transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-xl hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              WhatsApp Support
            </Button>

            <Button 
              onClick={handleCopy} 
              variant="outline" 
              className="flex-1 w-full h-12 gap-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-primary-navy font-bold transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-xl hover:-translate-y-0.5"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5 text-primary-navy/70" />}
              {copied ? 'Link Copied' : 'Copy Link'}
            </Button>
          </div>

          {/* Elegant Email Text Layout */}
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <span className="text-xs text-primary-navy/50 font-bold tracking-wide uppercase mb-1">Email us directly</span>
            <a 
              href="mailto:support@ganges.world" 
              className="group flex items-center gap-2 text-sm font-bold text-primary-navy relative"
            >
              <Mail className="w-4 h-4 text-primary-navy/50 group-hover:text-accent-orange transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
              <span className="relative">
                support@ganges.world
                <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-accent-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              </span>
            </a>
          </div>
          
          {/* Mobile Sticky Bottom Action Bar Wrapper for Primary Action */}
          <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 sm:pb-4 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-[60] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] md:static md:bg-transparent md:border-none md:p-0 md:shadow-none md:mt-8 md:block flex flex-col items-center">
            <div className="max-w-xl mx-auto w-full">
              <Button 
                onClick={setLanding} 
                className="w-full h-14 sm:h-12 bg-primary-navy text-accent-orange hover:bg-[#002543] gap-2 rounded-xl font-bold shadow-lg md:shadow-none md:bg-transparent md:text-primary-navy/60 md:hover:text-primary-navy md:hover:bg-slate-100 transition-all border-b-[3px] border-[#00182C] active:border-b-[1px] md:border-none"
              >
                <Repeat className="w-5 h-5 md:w-4 md:h-4" />
                <span className="text-lg md:text-base">Restart Assessment</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
