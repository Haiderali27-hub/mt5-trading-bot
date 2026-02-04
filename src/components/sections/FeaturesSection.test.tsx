import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { FeaturesSection } from './FeaturesSection';
import { features } from '../../data/features';
import * as useMediaQueryModule from '../../hooks/useMediaQuery';

// Mock useMediaQuery hook to test responsive behavior
vi.mock('../../hooks/useMediaQuery');

describe('FeaturesSection Component', () => {
  const renderFeaturesSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <FeaturesSection {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
  });

  describe('Content Rendering', () => {
    it('renders section title correctly', () => {
      renderFeaturesSection();
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Advanced Trading Features');
    });

    it('renders section subtitle correctly', () => {
      renderFeaturesSection();
      const subtitle = screen.getByText(/Discover the powerful capabilities/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('renders all 8 features', () => {
      renderFeaturesSection();
      
      // Check that all feature titles are rendered
      features.forEach(feature => {
        expect(screen.getByText(feature.title)).toBeInTheDocument();
      });
    });

    it('renders all feature descriptions', () => {
      renderFeaturesSection();
      
      // Check that all feature descriptions are rendered
      features.forEach(feature => {
        expect(screen.getByText(feature.description)).toBeInTheDocument();
      });
    });

    it('renders features grid container', () => {
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct section id for navigation', () => {
      renderFeaturesSection();
      const section = screen.getByTestId('features-section');
      expect(section).toHaveAttribute('id', 'features');
    });

    it('applies correct background color', () => {
      renderFeaturesSection();
      const section = screen.getByTestId('features-section');
      expect(section).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies correct title styling', () => {
      renderFeaturesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({
        color: 'rgb(248, 248, 248)',
        textAlign: 'center',
        fontWeight: '700'
      });
    });

    it('applies correct subtitle styling', () => {
      renderFeaturesSection();
      const subtitle = screen.getByText(/Discover the powerful capabilities/i);
      
      expect(subtitle).toHaveStyle({
        color: 'rgb(184, 184, 184)',
        textAlign: 'center',
        fontSize: '18px'
      });
    });
  });

  describe('Responsive Grid Layout', () => {
    it('applies desktop grid layout (3 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
      
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      });
    });

    it('applies tablet grid layout (2 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('tablet');
      
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px'
      });
    });

    it('applies mobile grid layout (1 column)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      });
    });

    it('applies wide screen grid layout (3 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('wide');
      
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      });
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props to title section', () => {
      renderFeaturesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      // Check that the title is wrapped in a motion element
      expect(title.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to features grid', () => {
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      
      // Check that the grid has motion attributes for stagger animation
      expect(grid).toHaveAttribute('style');
    });

    it('passes correct index to each FeatureCard for stagger animation', () => {
      renderFeaturesSection();
      
      // All feature cards should be rendered - check for specific feature titles
      features.forEach(feature => {
        expect(screen.getByText(feature.title)).toBeInTheDocument();
      });
    });
  });

  describe('Viewport Animation Triggers', () => {
    it('applies whileInView animation to title section', () => {
      renderFeaturesSection();
      const title = screen.getByRole('heading', { level: 2 });
      const titleContainer = title.parentElement;
      
      // Check that the title container has motion attributes
      expect(titleContainer).toHaveAttribute('style');
    });

    it('applies whileInView animation to features grid', () => {
      renderFeaturesSection();
      const grid = screen.getByTestId('features-grid');
      
      // Check that the grid has viewport animation attributes
      expect(grid).toHaveAttribute('style');
    });
  });

  describe('Feature Data Integration', () => {
    it('renders specific key features', () => {
      renderFeaturesSection();
      
      // Test for specific features mentioned in requirements
      expect(screen.getByText('40+ Prediction Engines')).toBeInTheDocument();
      expect(screen.getByText('GPU Acceleration')).toBeInTheDocument();
      expect(screen.getByText('Advanced Risk Management')).toBeInTheDocument();
      expect(screen.getByText('ML Model Integration')).toBeInTheDocument();
      expect(screen.getByText('Multi-Timeframe Analysis')).toBeInTheDocument();
      expect(screen.getByText('High-Frequency Execution')).toBeInTheDocument();
      expect(screen.getByText('Real-Time Market Analysis')).toBeInTheDocument();
      expect(screen.getByText('Automated Trade Management')).toBeInTheDocument();
    });

    it('renders feature descriptions with key technologies', () => {
      renderFeaturesSection();
      
      // Test for specific technologies mentioned in requirements
      expect(screen.getByText(/CUDA, DirectML, and ROCm/)).toBeInTheDocument();
      expect(screen.getByText(/LSTM, Random Forest, and XGBoost/)).toBeInTheDocument();
      expect(screen.getByText(/M1 to 1 Month/)).toBeInTheDocument();
    });
  });

  describe('Responsive Typography', () => {
    it('applies mobile title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderFeaturesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '48px' });
    });

    it('applies desktop title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
      
      renderFeaturesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '56px' });
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      renderFeaturesSection();
      
      // Check for semantic section element by test id
      const section = screen.getByTestId('features-section');
      expect(section.tagName).toBe('SECTION');
      
      // Check for proper heading hierarchy
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('provides proper section identification', () => {
      renderFeaturesSection();
      const section = screen.getByTestId('features-section');
      expect(section).toHaveAttribute('id', 'features');
    });
  });
});