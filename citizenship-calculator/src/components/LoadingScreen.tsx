import { useEffect, useState } from 'react';
import { Loader2, Server } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const messages = [
  "Scanning immigration databases...",
  "Cross-referencing global birth records...",
  "Calculating bureaucratic delays...",
  "Finalizing timeline..."
];

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

  return (
    <Card className="w-full p-8 text-center animate-in fade-in zoom-in duration-500 max-w-sm mx-auto bg-[#0A1F44] border-white/10 text-white shadow-2xl">
      <div className="flex justify-center mb-6">
        <Server className="w-16 h-16 text-[#C8A95E] animate-pulse" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-[#C8A95E]" />
        Processing Request
      </h2>
      
      <p className="text-sm text-slate-400 mb-8 h-5 transition-opacity duration-300">
        {messages[messageIndex]}
      </p>

      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#C8A95E] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-3 font-mono">
        {Math.round(progress)}% COMPLETE
      </p>
    </Card>
  );
}
