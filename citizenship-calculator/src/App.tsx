import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/layouts/MainLayout';
import { CalculatorForm } from '@/components/CalculatorForm';
import { FadeIn } from '@/components/animations/FadeIn';

function App() {
  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <FadeIn key="form" className="w-full">
          <CalculatorForm />
        </FadeIn>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
