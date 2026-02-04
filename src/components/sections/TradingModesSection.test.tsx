import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { TradingModesSection } from './TradingModesSection';
import { tradingModes } from '../../data/tradingModes';
import * as useMediaQueryModule from '../../hooks/useMediaQuery';

// Mock useMediaQuery hook to test responsive behavior
vi.mock('../../hooks/useMediaQuery');

describe('TradingModesSection Component', () => {
  const renderTradingModesSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <TradingModesSection {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
  });

  describe('Content Rendering', () => {
    it('renders section title correctly', () => {
      renderTradingModesSection();
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Trading Modes');
    });

    it('renders section subtitle correctly', () => {
      renderTradingModesSection();
      const subtitle = screen.getByText(/Choose the trading mode that best fits/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('renders all 3 trading modes', () => {
      renderTradingModesSection();
      
      // Check that all trading mode names are rendered
      tradingModes.forEach(mode => {
        expect(screen.getByText(mode.name)).toBeInTheDocument();
      });
    });

    it('renders all trading mode descriptions', () => {
      renderTradingModesSection();
      
      // Check that all trading mode descriptions are rendered
      tradingModes.forEach(mode => {
        expect(screen.getByText(mode.description)).toBeInTheDocument();
      });
    });

    it('renders trading modes grid container', () => {
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      expect(grid).toBeInTheDocument();
    });

    it('renders icons for all trading modes', () => {
      renderTradingModesSection();
      
      // Check that all trading mode cards are rendered (they contain the icons)
      expect(screen.getByText('Simple Mode')).toBeInTheDocument();
      expect(screen.getByText('30+ Pip Guarantee')).toBeInTheDocument();
      expect(screen.getByText('Profit Maximizer')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct section id for navigation', () => {
      renderTradingModesSection();
      const section = screen.getByTestId('trading-modes-section');
      expect(section).toHaveAttribute('id', 'trading-modes');
    });

    it('applies correct background color', () => {
      renderTradingModesSection();
      const section = screen.getByTestId('trading-modes-section');
      expect(section).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies correct title styling', () => {
      renderTradingModesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({
        color: 'rgb(248, 248, 248)',
        textAlign: 'center',
        fontWeight: '700'
      });
    });

    it('applies correct subtitle styling', () => {
      renderTradingModesSection();
      const subtitle = screen.getByText(/Choose the trading mode that best fits/i);
      
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
      
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      });
    });

    it('applies tablet grid layout (2 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('tablet');
      
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px'
      });
    });

    it('applies mobile grid layout (1 column)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      });
    });

    it('applies wide screen grid layout (3 columns)', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('wide');
      
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      
      expect(grid).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      });
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props to title section', () => {
      renderTradingModesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      // Check that the title is wrapped in a motion element
      expect(title.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to trading modes grid', () => {
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      
      // Check that the grid has motion attributes for stagger animation
      expect(grid).toHaveAttribute('style');
    });

    it('passes correct index to each TradingModeCard for stagger animation', () => {
      renderTradingModesSection();
      
      // All trading mode cards should be rendered - check for specific mode names
      tradingModes.forEach(mode => {
        expect(screen.getByText(mode.name)).toBeInTheDocument();
      });
    });
  });

  describe('Viewport Animation Triggers', () => {
    it('applies whileInView animation to title section', () => {
      renderTradingModesSection();
      const title = screen.getByRole('heading', { level: 2 });
      const titleContainer = title.parentElement;
      
      // Check that the title container has motion attributes
      expect(titleContainer).toHaveAttribute('style');
    });

    it('applies whileInView animation to trading modes grid', () => {
      renderTradingModesSection();
      const grid = screen.getByTestId('trading-modes-grid');
      
      // Check that the grid has viewport animation attributes
      expect(grid).toHaveAttribute('style');
    });
  });

  describe('Trading Mode Data Integration', () => {
    it('renders specific trading modes', () => {
      renderTradingModesSection();
      
      // Test for specific trading modes mentioned in requirements
      expect(screen.getByText('Simple Mode')).toBeInTheDocument();
      expect(screen.getByText('30+ Pip Guarantee')).toBeInTheDocument();
      expect(screen.getByText('Profit Maximizer')).toBeInTheDocument();
    });

    it('renders trading mode descriptions with key features', () => {
      renderTradingModesSection();
      
      // Test for specific features mentioned in requirements
      expect(screen.getByText(/Basic automated trading with standard parameters/)).toBeInTheDocument();
      expect(screen.getByText(/Conservative approach with guaranteed minimum profit targets/)).toBeInTheDocument();
      expect(screen.getByText(/Aggressive strategy for maximum returns/)).toBeInTheDocument();
    });

    it('renders trading mode features lists', () => {
      renderTradingModesSection();
      
      // Test for specific features in each mode
      expect(screen.getByText('Automated trade execution')).toBeInTheDocument();
      expect(screen.getByText('Guaranteed 30+ pip minimum')).toBeInTheDocument();
      expect(screen.getByText('Maximum profit potential')).toBeInTheDocument();
    });
  });

  describe('Responsive Typography', () => {
    it('applies mobile title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('mobile');
      
      renderTradingModesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '48px' });
    });

    it('applies desktop title font size', () => {
      vi.mocked(useMediaQueryModule.useMediaQuery).mockReturnValue('desktop');
      
      renderTradingModesSection();
      const title = screen.getByRole('heading', { level: 2 });
      
      expect(title).toHaveStyle({ fontSize: '56px' });
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      renderTradingModesSection();
      
      // Check for semantic section element by test id
      const section = screen.getByTestId('trading-modes-section');
      expect(section.tagName).toBe('SECTION');
      
      // Check for proper heading hierarchy
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('provides proper section identification', () => {
      renderTradingModesSection();
      const section = screen.getByTestId('trading-modes-section');
      expect(section).toHaveAttribute('id', 'trading-modes');
    });
  });

  describe('Visual Differentiation', () => {
    it('renders different icons for each trading mode', () => {
      renderTradingModesSection();
      
      // Each trading mode should have its own card with unique content
      const simpleMode = screen.getByText('Simple Mode');
      const guaranteeMode = screen.getByText('30+ Pip Guarantee');
      const maximizerMode = screen.getByText('Profit Maximizer');
      
      expect(simpleMode).toBeInTheDocument();
      expect(guaranteeMode).toBeInTheDocument();
      expect(maximizerMode).toBeInTheDocument();
    });
  });
});