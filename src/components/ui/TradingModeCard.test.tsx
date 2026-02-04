import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { TradingModeCard } from './TradingModeCard';

describe('TradingModeCard Component', () => {
  const mockIcon = (
    <svg data-testid="mock-icon" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );

  const mockProps = {
    icon: mockIcon,
    name: 'Test Trading Mode',
    description: 'This is a test trading mode description for testing purposes.',
    features: [
      'Feature one',
      'Feature two',
      'Feature three'
    ],
    index: 0,
  };

  const renderTradingModeCard = (props = {}) => {
    return render(
      <ThemeProvider>
        <TradingModeCard {...mockProps} {...props} />
      </ThemeProvider>
    );
  };

  describe('Content Rendering', () => {
    it('renders the trading mode name', () => {
      renderTradingModeCard();
      expect(screen.getByText('Test Trading Mode')).toBeInTheDocument();
    });

    it('renders the trading mode description', () => {
      renderTradingModeCard();
      expect(screen.getByText('This is a test trading mode description for testing purposes.')).toBeInTheDocument();
    });

    it('renders the icon', () => {
      renderTradingModeCard();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders all features in the features list', () => {
      renderTradingModeCard();
      
      expect(screen.getByText('Feature one')).toBeInTheDocument();
      expect(screen.getByText('Feature two')).toBeInTheDocument();
      expect(screen.getByText('Feature three')).toBeInTheDocument();
    });

    it('renders features as a list', () => {
      renderTradingModeCard();
      
      const featuresList = screen.getByRole('list');
      expect(featuresList).toBeInTheDocument();
      
      const featureItems = screen.getAllByRole('listitem');
      expect(featureItems).toHaveLength(3);
    });
  });

  describe('Styling', () => {
    it('applies correct name styling', () => {
      renderTradingModeCard();
      const name = screen.getByText('Test Trading Mode');
      
      expect(name).toHaveStyle({
        fontSize: '32px',
        fontWeight: '700',
        color: 'rgb(248, 248, 248)',
      });
    });

    it('applies correct description styling', () => {
      renderTradingModeCard();
      const description = screen.getByText('This is a test trading mode description for testing purposes.');
      
      expect(description).toHaveStyle({
        fontSize: '16px',
        color: 'rgb(184, 184, 184)',
        lineHeight: '1.6',
      });
    });

    it('applies correct icon container styling', () => {
      renderTradingModeCard();
      const icon = screen.getByTestId('mock-icon');
      const iconContainer = icon.parentElement;
      
      expect(iconContainer).toHaveStyle({
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        backgroundColor: 'rgb(93, 214, 44)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      });
    });
  });

  describe('Features List Styling', () => {
    it('applies correct feature item styling', () => {
      renderTradingModeCard();
      const featureItem = screen.getByText('Feature one');
      
      expect(featureItem).toHaveStyle({
        fontSize: '14px',
        color: 'rgb(184, 184, 184)',
        position: 'relative',
      });
    });

    it('renders feature list without default list styling', () => {
      renderTradingModeCard();
      const featuresList = screen.getByRole('list');
      
      expect(featuresList).toHaveStyle({
        listStyle: 'none',
        padding: '0',
        margin: '0',
      });
    });
  });

  describe('Animation Props', () => {
    it('applies Framer Motion animation variants', () => {
      renderTradingModeCard({ index: 2 });
      
      // The component should be wrapped in a motion.div
      const card = screen.getByText('Test Trading Mode').closest('div[style*="transform"]');
      expect(card).toBeTruthy();
    });

    it('handles different index values for stagger animation', () => {
      renderTradingModeCard({ index: 5 });
      
      // Component should still render correctly with different index
      expect(screen.getByText('Test Trading Mode')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('handles empty features array', () => {
      renderTradingModeCard({ features: [] });
      
      expect(screen.getByText('Test Trading Mode')).toBeInTheDocument();
      expect(screen.getByText('This is a test trading mode description for testing purposes.')).toBeInTheDocument();
      
      // Should still render the list element, just empty
      const featuresList = screen.getByRole('list');
      expect(featuresList).toBeInTheDocument();
      
      const featureItems = screen.queryAllByRole('listitem');
      expect(featureItems).toHaveLength(0);
    });

    it('handles single feature', () => {
      renderTradingModeCard({ features: ['Single feature'] });
      
      expect(screen.getByText('Single feature')).toBeInTheDocument();
      
      const featureItems = screen.getAllByRole('listitem');
      expect(featureItems).toHaveLength(1);
    });

    it('handles many features', () => {
      const manyFeatures = [
        'Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'
      ];
      renderTradingModeCard({ features: manyFeatures });
      
      manyFeatures.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
      
      const featureItems = screen.getAllByRole('listitem');
      expect(featureItems).toHaveLength(5);
    });
  });

  describe('Accessibility', () => {
    it('uses proper heading hierarchy', () => {
      renderTradingModeCard();
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Test Trading Mode');
    });

    it('provides semantic list structure for features', () => {
      renderTradingModeCard();
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });
});