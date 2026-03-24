import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { Scale, Globe, FileText } from 'lucide-react';

export function HeroSection() {
  const setForm = useAppStore((s) => s.setForm);

  return (
    <div className="flex flex-col items-center text-center text-white py-8 w-full">
      <div className="p-4 bg-white/10 rounded-full mb-6">
        <Scale className="w-12 h-12 text-[#C8A95E]" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 mt-2">
        Know Exactly When You'll Get Your Citizenship
      </h1>
      
      <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-md mx-auto leading-relaxed">
        Our advanced algorithmic matrix calculates your exact processing timeline based on demographic and legislative data.
      </p>

      <div className="flex flex-col gap-6 w-full px-4 mb-10">
        <div className="flex items-center gap-4 text-left p-4 rounded-lg bg-white/5 border border-white/10">
          <Globe className="w-6 h-6 text-[#C8A95E] shrink-0" />
          <p className="text-sm text-slate-300">Cross-referenced with global birth registry databases in real-time.</p>
        </div>
        <div className="flex items-center gap-4 text-left p-4 rounded-lg bg-white/5 border border-white/10">
          <FileText className="w-6 h-6 text-[#C8A95E] shrink-0" />
          <p className="text-sm text-slate-300">Fully compliant with international bureaucratic regulations.</p>
        </div>
      </div>

      <Button onClick={setForm} size="lg" className="w-[80%] mx-auto bg-[#C8A95E] hover:bg-[#b09450] text-[#0A1F44] shadow-xl">
        Calculate Now
      </Button>
    </div>
  );
}
