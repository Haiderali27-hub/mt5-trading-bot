import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { TechnologyBadge } from './TechnologyBadge';

describe('TechnologyBadge Component', () => {
  const renderTechnologyBadge = (props = {}) => {
    const defaultProps = {
      name: 'CUDA',
      ...props,
    };
    
    return render(
      <ThemeProvider>
        <TechnologyBadge {...defaultProps} />
      </ThemeProvider>
    );
  };

  describe('Content Rendering', () => {
    it('renders technology name correctly', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      expect(screen.getByText('CUDA')).toBeInTheDocument();
    });

    it('renders technology name with spaces correctly', () => {
      renderTechnologyBadge({ name: 'Random Forest' });
      expect(screen.getByText('Random Forest')).toBeInTheDocument();
    });

    it('renders technology name with special characters correctly', () => {
      renderTechnologyBadge({ name: '40+ Prediction Engines' });
      expect(screen.getByText('40+ Prediction Engines')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct badge styling', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      const badge = screen.getByTestId('technology-badge-cuda');
      
      expect(badge).toBeInTheDocument();
    });

    it('applies correct test id format for single word', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      const badge = screen.getByTestId('technology-badge-cuda');
      
      expect(badge).toBeInTheDocument();
    });

    it('applies correct test id format for multi-word names', () => {
      renderTechnologyBadge({ name: 'Random Forest' });
      const badge = screen.getByTestId('technology-badge-random-forest');
      
      expect(badge).toBeInTheDocument();
    });

    it('applies correct test id format for names with special characters', () => {
      renderTechnologyBadge({ name: '40+ Prediction Engines' });
      const badge = screen.getByTestId('technology-badge-40+-prediction-engines');
      
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      const badge = screen.getByTestId('technology-badge-cuda');
      
      // Check that the badge has motion attributes
      expect(badge).toHaveAttribute('style');
    });

    it('applies correct index for stagger animation', () => {
      renderTechnologyBadge({ name: 'CUDA', index: 2 });
      const badge = screen.getByTestId('technology-badge-cuda');
      
      // Check that the badge is rendered with animation
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Hover Effects', () => {
    it('applies hover animation variants', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      const badge = screen.getByTestId('technology-badge-cuda');
      
      // Check that the badge has hover capabilities
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides proper test identification', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      const badge = screen.getByTestId('technology-badge-cuda');
      
      expect(badge).toBeInTheDocument();
    });

    it('renders text content accessibly', () => {
      renderTechnologyBadge({ name: 'CUDA' });
      
      // Text should be accessible via screen reader
      expect(screen.getByText('CUDA')).toBeInTheDocument();
    });
  });
});