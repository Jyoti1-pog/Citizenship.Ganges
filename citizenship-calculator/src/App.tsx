import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { MainLayout } from '@/layouts/MainLayout';
import { HeroSection } from '@/components/HeroSection';
import { CalculatorForm } from '@/components/CalculatorForm';
import { LoadingScreen } from '@/components/LoadingScreen';
import { FadeIn } from '@/components/animations/FadeIn';

// Lazy load the heavy confetti and result components
const ResultReveal = lazy(() => import('@/components/ResultReveal'));

function App() {
  const { state } = useAppStore();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        {state.status === 'landing' && (
          <FadeIn key="landing" className="w-full">
            <HeroSection />
          </FadeIn>
        )}

        {state.status === 'form' && (
          <FadeIn key="form" className="w-full">
            <CalculatorForm />
          </FadeIn>
        )}

        {state.status === 'loading' && (
          <FadeIn key="loading" className="w-full">
            <LoadingScreen />
          </FadeIn>
        )}

        {state.status === 'result' && (
          <FadeIn key="result" className="w-full">
            <Suspense fallback={<div className="text-white font-bold animate-pulse text-center w-full">Loading your shocking truth...</div>}>
              <ResultReveal />
            </Suspense>
          </FadeIn>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
