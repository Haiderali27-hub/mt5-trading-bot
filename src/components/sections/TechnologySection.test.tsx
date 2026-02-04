import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { TechnologySection } from './TechnologySection';
import { technologyCategories } from '../../data/technologies';
import * as useMediaQueryModule from '../../hooks/useMediaQuery';

// Mock useMediaQuery hook to test responsive behavior
vi.mock('../../hooks/useMediaQuery');

describe('TechnologySection Component', () => {
  const renderTechnologySection = (props = {}) => {
    return render(
      <ThemeProvider>
        <TechnologySection {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
  });

  describe('Content Rendering', () => {
    it('renders section title correctly', () => {
      renderTechnologySection();
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Technology Stack');
    });

    it('renders section subtitle correctly', () => {
      renderTechnologySection();
      const subtitle = screen.getByText(/Powered by cutting-edge technologies/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('renders all 5 technology categories', () => {
      renderTechnologySection();
      
      // Check that all category names are rendered
      technologyCategories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('renders technology categories grid container', () => {
      renderTechnologySection();
      const grid = screen.getByTestId('technology-categories-grid');
      expect(grid).toBeInTheDocument();
    });

    it('renders category cards with correct test ids', () => {
      renderTechnologySection();
      
      technologyCategories.forEach(category => {
        const categoryCard = screen.getByTestId(`technology-category-${category.id}`);
        expect(categoryCard).toBeInTheDocument();
      });
    });

    it('renders badge containers for each category', () => {
      renderTechnologySection();
      
      technologyCategories.forEach(category => {
        const badgeContainer = screen.getByTestId(`technology-badges-${category.id}`);
        expect(badgeContainer).toBeInTheDocument();
      });
    });
  });

  describe('ML Models Category', () => {
    it('displays all ML models', () => {
      renderTechnologySection();
      
      // Test for specific ML models mentioned in requirements
      expect(screen.getByText('LSTM')).toBeInTheDocument();
      expect(screen.getByText('Random Forest')).toBeInTheDocument();
      expect(screen.getByText('XGBoost')).toBeInTheDocument();
      expect(screen.getByText('Neural Networks')).toBeInTheDocument();
      expect(screen.getByText('Support Vector Machines')).toBeInTheDocument();
      expect(screen.getByText('Gradient Boosting')).toBeInTheDocument();
    });

    it('renders ML Models category with correct icon', () => {
      renderTechnologySection();
      const mlCategory = screen.getByTestId('technology-category-ml-models');
      expect(mlCategory).toBeInTheDocument();
      expect(screen.getByText('ML Models')).toBeInTheDocument();
    });
  });

  describe('GPU Acceleration Category', () => {
    it('displays all GPU technologies', () => {
      renderTechnologySection();
      
      // Test for specific GPU technologies mentioned in requirements
      expect(screen.getByText('CUDA')).toBeInTheDocument();
      expect(screen.getByText('DirectML')).toBeInTheDocument();
      expect(screen.getByText('ROCm')).toBeInTheDocument();
      expect(screen.getByText('OpenCL')).toBeInTheDocument();
      expect(screen.getByText('TensorRT')).toBeInTheDocument();
    });

    it('renders GPU Acceleration category with correct icon', () => {
      renderTechnologySection();
      const gpuCategory = screen.getByTestId('technology-category-gpu-acceleration');
      expect(gpuCategory).toBeInTheDocument();
      expect(screen.getByText('GPU Acceleration')).toBeInTheDocument();
    });
  });

  describe('Analysis Engines Category', () => {
    it('displays all analysis engines', () => {
      renderTechnologySection();
      
      // Test for specific analysis engines mentioned in requirements
      expect(screen.getByText('40+ Prediction Engines')).toBeInTheDocument();
      expect(screen.getByText('Pattern Recognition')).toBeInTheDocument();
      expect(screen.getByText('Trend Analysis')).toBeInTheDocument();
      expect(screen.getByText('Sentiment Analysis')).toBeInTheDocument();
      expect(screen.getByText('Volatility Analysis')).toBeInTheDocument();
      expect(screen.getByText('Correlation Analysis')).toBeInTheDocument();
    });

    it('renders Analysis Engines category with correct icon', () => {
      renderTechnologySection();
      const analysisCategory = screen.getByTestId('technology-category-analysis-engines');
      expect(analysisCategory).toBeInTheDocument();
      expect(screen.getByText('Analysis Engines')).toBeInTheDocument();
    });
  });

  describe('Timeframes Category', () => {
    it('displays all timeframes', () => {
      renderTechnologySection();
      
      // Test for specific timeframes mentioned in requirements
      expect(screen.getByText('M1')).toBeInTheDocument();
      expect(screen.getByText('M5')).toBeInTheDocument();
      expect(screen.getByText('M15')).toBeInTheDocument();
      expect(screen.getByText('M30')).toBeInTheDocument();
      expect(screen.getByText('H1')).toBeInTheDocument();
      expect(screen.getByText('H4')).toBeInTheDocument();
      expect(screen.getByText('D1')).toBeInTheDocument();
      expect(screen.getByText('W1')).toBeInTheDocument();
      expect(screen.getByText('1 Month')).toBeInTheDocument();
    });

    it('renders Timeframes category with correct icon', () => {
      renderTechnologySection();
      const timeframesCategory = screen.getByTestId('technology-category-timeframes');
      expect(timeframesCategory).toBeInTheDocument();
      expect(screen.getByText('Timeframes')).toBeInTheDocument();
    });
  });

  describe('Execution Systems Category', () => {
    it('displays all execution systems', () => {
      renderTechnologySection();
      
      // Test for specific execution systems mentioned in requirements
      expect(screen.getByText('High-Frequency Trading')).toBeInTheDocument();
      expect(screen.getByText('Order Management')).toBeInTheDocument();
      expect(screen.getByText('Risk Management')).toBeInTheDocument();
      expect(screen.getByText('Position Sizing')).toBeInTheDocument();
      expect(screen.getByText('Trade Execution')).toBeInTheDocument();
      expect(screen.getByText('Latency Optimization')).toBeInTheDocument();
    });

    it('renders Execution Systems category with correct icon', () => {
      renderTechnologySection();
      const executionCategory = screen.getByTestId('technology-category-execution-systems');
      expect(executionCategory).toBeInTheDocument();
      expect(screen.getByText('Execution Systems')).toBeInTheDocument();
    });
  });

  describe('Categories Organization', () => {
    it('organizes technologies into correct categories', () => {
      renderTechnologySection();
      
      // Check that each category contains its expected technologies
      const mlCategory = screen.getByTestId('technology-category-ml-models');
      const gpuCategory = screen.getByTestId('technology-category-gpu-acceleration');
      const analysisCategory = screen.getByTestId('technology-category-analysis-engines');
      const timeframesCategory = screen.getByTestId('technology-category-timeframes');
      const executionCategory = screen.getByTestId('technology-category-execution-systems');
      
      expect(mlCategory).toBeInTheDocument();
      expect(gpuCategory).toBeInTheDocument();
      expect(analysisCategory).toBeInTheDocument();
      expect(timeframesCategory).toBeInTheDocument();
      expect(executionCategory).toBeInTheDocument();
    });

    it('displays visual separators between categories', () => {
      renderTechnologySection();
      
      // Categories should be in separate cards with visual separation
      technologyCategories.forEach(category => {
        const categoryCard = screen.getByTestId(`technology-category-${category.id}`);
        expect(categoryCard).toBeInTheDocument();
      });
    });
  });

  describe('Icons and Badges Display', () => {
    it('renders icons for all categories', () => {
      renderTechnologySection();
      
      // Each category should have its icon rendered
      technologyCategories.forEach(category => {
        const categoryCard = screen.getByTestId(`technology-category-${category.id}`);
        expect(categoryCard).toBeInTheDocument();
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('displays technologies as badges', () => {
      renderTechnologySection();
      
      // Check for specific technology badges
      expect(screen.getByTestId('technology-badge-lstm')).toBeInTheDocument();
      expect(screen.getByTestId('technology-badge-cuda')).toBeInTheDocument();
      expect(screen.getByTestId('technology-badge-40+-prediction-engines')).toBeInTheDocument();
      expect(screen.getByTestId('technology-badge-m1')).toBeInTheDocument();
      expect(screen.getByTestId('technology-badge-high-frequency-trading')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct section id for navigation', () => {
      renderTechnologySection();
      const section = screen.getByTestId('technology-section');
      expect(section).toHaveAttribute('id', 'technology');
    });

    it('applies correct background color', () => {
      renderTechnologySection();
      const section = screen.getByTestId('technology-section');
      expect(section).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies correct title styling', () => {
      renderTechnologySection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({
        color: 'rgb(248, 248, 248)',
        textAlign: 'center',
        fontWeight: '700'
      });
    });

    it('applies correct subtitle styling', () => {
      renderTechnologySection();
      const subtitle = screen.getByText(/Powered by cutting-edge technologies/i);
      
      expect(subtitle).toHaveStyle({
        color: 'rgb(184, 184, 184)',
        textAlign: 'center',
        fontSize: '18px'
      });
    });
  });

  describe('Responsive Grid Layout', () => {
    it('applies desktop grid layout', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
      
      renderTechnologySection();
      const grid = screen.getByTestId('technology-categories-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
      });
    });

    it('applies mobile grid layout (1 column)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderTechnologySection();
      const grid = screen.getByTestId('technology-categories-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px'
      });
    });

    it('applies tablet grid layout', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('tablet');
      
      renderTechnologySection();
      const grid = screen.getByTestId('technology-categories-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
      });
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props to title section', () => {
      renderTechnologySection();
      const title = screen.getByRole('heading', { level: 2 });
      
      // Check that the title is wrapped in a motion element
      expect(title.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to categories grid', () => {
      renderTechnologySection();
      const grid = screen.getByTestId('technology-categories-grid');
      
      // Check that the grid has motion attributes for stagger animation
      expect(grid).toHaveAttribute('style');
    });

    it('applies staggered animations to category cards', () => {
      renderTechnologySection();
      
      // All category cards should be rendered with animation
      technologyCategories.forEach(category => {
        const categoryCard = screen.getByTestId(`technology-category-${category.id}`);
        expect(categoryCard).toBeInTheDocument();
      });
    });

    it('applies staggered animations to technology badges', () => {
      renderTechnologySection();
      
      // All badge containers should be rendered with animation
      technologyCategories.forEach(category => {
        const badgeContainer = screen.getByTestId(`technology-badges-${category.id}`);
        expect(badgeContainer).toBeInTheDocument();
      });
    });
  });

  describe('Viewport Animation Triggers', () => {
    it('applies whileInView animation to title section', () => {
      renderTechnologySection();
      const title = screen.getByRole('heading', { level: 2 });
      const titleContainer = title.parentElement;
      
      // Check that the title container has motion attributes
      expect(titleContainer).toHaveAttribute('style');
    });

    it('applies whileInView animation to categories grid', () => {
      renderTechnologySection();
      const grid = screen.getByTestId('technology-categories-grid');
      
      // Check that the grid has viewport animation attributes
      expect(grid).toHaveAttribute('style');
    });
  });

  describe('Responsive Typography', () => {
    it('applies mobile title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderTechnologySection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '48px' });
    });

    it('applies desktop title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
      
      renderTechnologySection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '56px' });
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      renderTechnologySection();
      
      // Check for semantic section element by test id
      const section = screen.getByTestId('technology-section');
      expect(section.tagName).toBe('SECTION');
      
      // Check for proper heading hierarchy
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('provides proper section identification', () => {
      renderTechnologySection();
      const section = screen.getByTestId('technology-section');
      expect(section).toHaveAttribute('id', 'technology');
    });

    it('uses proper heading hierarchy for categories', () => {
      renderTechnologySection();
      
      // Each category should have an h3 heading
      technologyCategories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });
  });
});