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
          colors={['#0A1F44', '#C8A95E', '#ffffff', '#3b82f6', '#22c55e', '#fbbf24']}
          className="z-[999]"
        />
        </div>
      )}
      
      {/* SaaS Style Ambient Glow */}
      <div className={`absolute -inset-4 blur-3xl opacity-30 rounded-[3rem] ${isHighProbability ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-amber-500 to-red-600'} animate-pulse`}></div>

      <div className="relative w-full p-8 sm:p-10 bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl border border-slate-200/60 overflow-hidden flex flex-col items-center">
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

        {/* Shield Icon neatly integrated INSIDE the card (Stripe style) */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${isHighProbability ? 'bg-green-50/80 border-green-200/60 text-green-600' : 'bg-red-50/80 border-red-200/60 text-red-600'}`}>
          <ShieldCheck className="w-8 h-8" strokeWidth={2} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2 tracking-tight text-center">
          Assessment Complete
        </h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto text-center font-medium text-sm sm:text-base">
          {isHighProbability ? 'Your profile has been analyzed perfectly 🌍' : 'Analysis concluded based on metrics ⚖️'}
        </p>
        
        {/* Animated Score Box */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.4 }}
          className={`w-full flex flex-col items-center justify-center p-8 rounded-2xl mb-6 relative overflow-hidden group transition-all duration-300 hover:shadow-md ${isHighProbability ? 'bg-gradient-to-b from-green-50/50 to-emerald-50/80 border border-green-100' : 'bg-gradient-to-b from-amber-50/50 to-orange-50/80 border border-amber-100'}`}
        >
          <TrendingUp className={`w-6 h-6 mb-3 ${isHighProbability ? 'text-emerald-500' : 'text-amber-500'}`} />
          <h3 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-1">Probability</h3>
          
          <div className="flex items-baseline gap-1">
            <motion.span className={`text-6xl sm:text-7xl font-semibold tracking-tighter ${isHighProbability ? 'text-emerald-900' : 'text-amber-900'}`}>
              {rounded}
            </motion.span>
            <span className={`text-2xl font-semibold ${isHighProbability ? 'text-emerald-500' : 'text-amber-500'}`}>%</span>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="w-full space-y-3 mb-6">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`w-full flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl border ${isHighProbability ? 'bg-emerald-50/40 border-emerald-100' : 'bg-rose-50/40 border-rose-100'}`}
          >
             <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${isHighProbability ? 'text-emerald-600' : 'text-rose-600'}`} />
             <div>
               <p className="text-sm font-semibold text-slate-900 mb-1">Status Overview</p>
               <p className="text-sm text-slate-600 leading-relaxed">
                 {result.message}
               </p>
             </div>
          </motion.div>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-blue-50/40 border border-blue-100"
          >
            <Info className="w-5 h-5 mt-0.5 shrink-0 text-blue-600" />
            <div>
               <p className="text-sm font-semibold text-slate-900 mb-1">Recommendation</p>
               <p className="text-sm text-slate-600 leading-relaxed">{result.recommendation}</p>
            </div>
          </motion.div>
        </div>

        {/* Playful aesthetic badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
          className="w-full relative overflow-hidden group mb-10 p-[1px] rounded-2xl bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 shadow-sm hover:shadow-md transition-all duration-500"
        >
          <div className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-xl group-hover:bg-white/90 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-[13px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-600 tracking-widest uppercase mt-0.5">
              Shop like you're in India
            </span>
            <span className="text-lg">✨</span>
          </div>
        </motion.div>

        {/* Actions & Support Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full flex flex-col items-center pt-8 border-t border-slate-100"
        >
          <div className="w-full flex items-center justify-between mb-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support & Sharing</h4>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center gap-3 mb-8">
            <Button 
              onClick={() => window.open('https://wa.me/918209893843?text=Hello%2C%20I%20need%20help%20with%20my%20citizenship%20calculator%20result.', '_blank')} 
              variant="outline" 
              className="flex-1 w-full h-12 gap-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium transition-all shadow-sm rounded-xl hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
              WhatsApp Support
            </Button>

            <Button 
              onClick={handleCopy} 
              variant="outline" 
              className="flex-1 w-full h-12 gap-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium transition-all shadow-sm rounded-xl hover:-translate-y-0.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-slate-400" />}
              {copied ? 'Link Copied' : 'Copy Link'}
            </Button>
          </div>

          {/* Elegant Email Text Layout */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-1">Email us directly</span>
            <a 
              href="mailto:support@ganges.world" 
              className="group flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              support@ganges.world
            </a>
          </div>
          
          <Button 
            onClick={setLanding} 
            variant="ghost" 
            className="w-full mt-8 h-12 text-slate-400 hover:text-slate-900 gap-2 hover:bg-slate-50 transition-all rounded-xl font-medium"
          >
            <Repeat className="w-4 h-4" />
            Restart Assessment
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
