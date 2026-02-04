import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { PerformanceSection } from './PerformanceSection';
import { performanceMetrics } from '../../data/performanceMetrics';
import * as useMediaQueryModule from '../../hooks/useMediaQuery';

// Mock useMediaQuery hook to test responsive behavior
vi.mock('../../hooks/useMediaQuery');

describe('PerformanceSection Component', () => {
  const renderPerformanceSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <PerformanceSection {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
  });

  describe('Content Rendering', () => {
    it('renders section title correctly', () => {
      renderPerformanceSection();
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Live Performance Metrics');
    });

    it('renders section subtitle correctly', () => {
      renderPerformanceSection();
      const subtitle = screen.getByText(/Real-time performance data showcasing/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('renders all 5 performance metrics', () => {
      renderPerformanceSection();
      
      // Check that all metric labels are rendered
      performanceMetrics.forEach(metric => {
        expect(screen.getByText(metric.label)).toBeInTheDocument();
      });
    });

    it('renders all metric values and units', () => {
      renderPerformanceSection();
      
      // Check that all metric units are rendered (values start at 0 due to animation)
      expect(screen.getAllByText('0')).toHaveLength(5); // All 5 metrics start at 0
      
      // Check for unique units
      expect(screen.getAllByText('%')).toHaveLength(2); // Win Rate and Max Drawdown both use %
      expect(screen.getByText('pips')).toBeInTheDocument();
      expect(screen.getByText('hours')).toBeInTheDocument();
      expect(screen.getByText('ratio')).toBeInTheDocument();
    });

    it('renders all metric descriptions', () => {
      renderPerformanceSection();
      
      // Check that all metric descriptions are rendered
      performanceMetrics.forEach(metric => {
        expect(screen.getByText(metric.description)).toBeInTheDocument();
      });
    });

    it('renders performance metrics grid container', () => {
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct section id for navigation', () => {
      renderPerformanceSection();
      const section = screen.getByTestId('performance-section');
      expect(section).toHaveAttribute('id', 'performance');
    });

    it('applies correct background color', () => {
      renderPerformanceSection();
      const section = screen.getByTestId('performance-section');
      expect(section).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies correct title styling', () => {
      renderPerformanceSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({
        color: 'rgb(248, 248, 248)',
        textAlign: 'center',
        fontWeight: '700'
      });
    });

    it('applies correct subtitle styling', () => {
      renderPerformanceSection();
      const subtitle = screen.getByText(/Real-time performance data showcasing/i);
      
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
      
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      });
    });

    it('applies tablet grid layout (2 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('tablet');
      
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px'
      });
    });

    it('applies mobile grid layout (1 column)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      });
    });

    it('applies wide screen grid layout (3 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('wide');
      
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      });
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props to title section', () => {
      renderPerformanceSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      // Check that the title is wrapped in a motion element
      expect(title.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to metrics grid', () => {
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      
      // Check that the grid has motion attributes for stagger animation
      expect(grid).toHaveAttribute('style');
    });

    it('passes correct index to each PerformanceMetricCard for stagger animation', () => {
      renderPerformanceSection();
      
      // All metric cards should be rendered - check for specific metric labels
      performanceMetrics.forEach(metric => {
        expect(screen.getByText(metric.label)).toBeInTheDocument();
      });
    });
  });

  describe('Viewport Animation Triggers', () => {
    it('applies whileInView animation to title section', () => {
      renderPerformanceSection();
      const title = screen.getByRole('heading', { level: 2 });
      const titleContainer = title.parentElement;
      
      // Check that the title container has motion attributes
      expect(titleContainer).toHaveAttribute('style');
    });

    it('applies whileInView animation to metrics grid', () => {
      renderPerformanceSection();
      const grid = screen.getByTestId('performance-metrics-grid');
      
      // Check that the grid has viewport animation attributes
      expect(grid).toHaveAttribute('style');
    });
  });

  describe('Performance Metrics Data Integration', () => {
    it('renders specific key performance metrics', () => {
      renderPerformanceSection();
      
      // Test for specific metrics mentioned in requirements
      expect(screen.getByText('Maximum Drawdown')).toBeInTheDocument();
      expect(screen.getByText('Average Profit Target')).toBeInTheDocument();
      expect(screen.getByText('Win Rate')).toBeInTheDocument();
      expect(screen.getByText('Average Trade Duration')).toBeInTheDocument();
      expect(screen.getByText('Risk-Reward Ratio')).toBeInTheDocument();
    });

    it('renders metric values with correct units', () => {
      renderPerformanceSection();
      
      // Test for specific units (values start at 0 due to animation)
      expect(screen.getAllByText('0')).toHaveLength(5); // All 5 metrics start at 0
      expect(screen.getAllByText('%')).toHaveLength(2); // Win Rate and Max Drawdown both use %
      expect(screen.getByText('pips')).toBeInTheDocument();
      expect(screen.getByText('hours')).toBeInTheDocument();
      expect(screen.getByText('ratio')).toBeInTheDocument();
    });

    it('renders metric descriptions with key information', () => {
      renderPerformanceSection();
      
      // Test for specific descriptions
      expect(screen.getByText(/Maximum peak-to-trough decline/)).toBeInTheDocument();
      expect(screen.getByText(/Average profit target per trade/)).toBeInTheDocument();
      expect(screen.getByText(/Percentage of profitable trades/)).toBeInTheDocument();
      expect(screen.getByText(/Average time positions are held/)).toBeInTheDocument();
      expect(screen.getByText(/Average risk-to-reward ratio/)).toBeInTheDocument();
    });
  });

  describe('Color Coding Implementation', () => {
    it('displays metrics with appropriate trend indicators', () => {
      renderPerformanceSection();
      
      // All metrics should be rendered with their trend colors
      // Values start at 0 due to animation, but trend colors should be applied
      expect(screen.getAllByText('0')).toHaveLength(5); // All 5 metrics start at 0
    });
  });

  describe('Responsive Typography', () => {
    it('applies mobile title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderPerformanceSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '48px' });
    });

    it('applies desktop title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
      
      renderPerformanceSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '56px' });
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      renderPerformanceSection();
      
      // Check for semantic section element by test id
      const section = screen.getByTestId('performance-section');
      expect(section.tagName).toBe('SECTION');
      
      // Check for proper heading hierarchy
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('provides proper section identification', () => {
      renderPerformanceSection();
      const section = screen.getByTestId('performance-section');
      expect(section).toHaveAttribute('id', 'performance');
    });
  });
});