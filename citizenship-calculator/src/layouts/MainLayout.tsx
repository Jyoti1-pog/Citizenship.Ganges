import { type ReactNode } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

export function MainLayout({ children }: { children: ReactNode }) {
  const { state } = useAppStore();
  const isResult = state.status === 'result';
  const isLoading = state.status === 'loading';
  const hideHeaderFooter = isResult || isLoading;

  return (
    <div
      className={cn(
        'min-h-screen w-full flex flex-col transition-all duration-1000 ease-in-out relative overflow-x-hidden',
        hideHeaderFooter 
          ? 'bg-[#0B1121]' 
          : 'bg-[#0A1F44]'
      )}
    >
      {/* Decorative ambient grain for premium texture across the whole screen */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

      {/* Subtle geometric pattern overlay during the serious phase */}
      {!hideHeaderFooter && (
        <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-plus-lighter pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwem0xMiAxMmw2LTZ2MTJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+')] bg-repeat" />
      )}

      {!hideHeaderFooter && (
        <header className="relative z-10 w-full flex items-center justify-center sm:justify-start p-6 border-b border-white/5 shadow-sm text-white bg-transparent">
          <ShieldCheck className="w-8 h-8 text-[#C8A95E] mr-3" />
          <h1 className="text-xl font-extrabold tracking-tight">Dept. of Global Citizenship</h1>
        </header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10 w-full max-w-lg mx-auto">
        {children}
      </main>

      {!hideHeaderFooter && (
        <footer className="relative z-10 w-full text-center p-6 text-white/30 font-medium text-xs mt-auto bg-transparent">
          &copy; {new Date().getFullYear()} Federal Citizenship Immigration Processing Module.
        </footer>
      )}
    </div>
  );
}
