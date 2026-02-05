import { ErrorBoundary } from './components/error';
import { ThemeProvider } from './theme/ThemeProvider';
import { Layout } from './components/layout/Layout';

// Import sections for main page
import { HeroSection } from './components/sections/HeroSection';
import { InstitutionalSection } from './components/sections/InstitutionalSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { PerformanceSection } from './components/sections/PerformanceSection';
import { TechnologySection } from './components/sections/TechnologySection';
import { TradingModesSection } from './components/sections/TradingModesSection';
import { PricingSection } from './components/sections/PricingSection';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout>
          <HeroSection />
          <InstitutionalSection />
          <FeaturesSection />
          <PerformanceSection />
          <TechnologySection />
          <TradingModesSection />
          <PricingSection />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;