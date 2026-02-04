import { Suspense, lazy } from 'react';
import { ThemeProvider } from './theme';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/error';

// Lazy load section components for code splitting
const HeroSection = lazy(() => import('./components/sections/HeroSection').then(module => ({ default: module.HeroSection })));
const FeaturesSection = lazy(() => import('./components/sections/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const TradingModesSection = lazy(() => import('./components/sections/TradingModesSection').then(module => ({ default: module.TradingModesSection })));
const PerformanceSection = lazy(() => import('./components/sections/PerformanceSection').then(module => ({ default: module.PerformanceSection })));
const TechnologySection = lazy(() => import('./components/sections/TechnologySection').then(module => ({ default: module.TechnologySection })));
const PricingSection = lazy(() => import('./components/sections/PricingSection').then(module => ({ default: module.PricingSection })));

/**
 * Loading component for Suspense fallback
 * Provides a smooth loading state while section components are being loaded
 */
const SectionLoader = () => (
  <div 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      color: '#B8B8B8'
    }}
  >
    <div>Loading...</div>
  </div>
);

/**
 * Main App Component
 * Assembles all sections in the correct order with ThemeProvider and Layout wrapper
 * Each major section is wrapped with ErrorBoundary for graceful error handling
 * Sections are lazy loaded with Suspense boundaries for code splitting
 * Sections: Hero, Features, Trading Modes, Performance, Technology, Pricing
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ErrorBoundary>
          <Layout>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <HeroSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <FeaturesSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <TradingModesSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <PerformanceSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <TechnologySection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <PricingSection />
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
