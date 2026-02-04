import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { PricingSection } from './PricingSection';

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

describe('PricingSection Component', () => {
  const renderPricingSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <PricingSection {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  describe('Content Rendering', () => {
    it('renders headline correctly', () => {
      renderPricingSection();
      const headline = screen.getByRole('heading', { level: 2 });
      expect(headline).toBeInTheDocument();
      expect(headline).toHaveTextContent('Ready to Transform Your Trading?');
    });

    it('renders description text', () => {
      renderPricingSection();
      const description = screen.getByText(/Join thousands of traders who have revolutionized/i);
      expect(description).toBeInTheDocument();
    });

    it('renders price highlight text', () => {
      renderPricingSection();
      const priceHighlight = screen.getByText('Get Started Today');
      expect(priceHighlight).toBeInTheDocument();
    });

    it('renders primary CTA button', () => {
      renderPricingSection();
      const primaryCTA = screen.getByTestId('pricing-cta-button');
      expect(primaryCTA).toBeInTheDocument();
      expect(primaryCTA).toHaveTextContent('Download Now');
    });

    it('renders secondary CTA button', () => {
      renderPricingSection();
      const secondaryCTA = screen.getByRole('button', { name: /learn more/i });
      expect(secondaryCTA).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct background color', () => {
      renderPricingSection();
      const section = screen.getByTestId('pricing-section');
      expect(section).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies section id for navigation', () => {
      renderPricingSection();
      const section = screen.getByTestId('pricing-section');
      expect(section).toHaveAttribute('id', 'pricing');
    });

    it('applies centered text alignment', () => {
      renderPricingSection();
      const section = screen.getByTestId('pricing-section');
      expect(section).toHaveStyle({ textAlign: 'center' });
    });

    it('applies correct text colors', () => {
      renderPricingSection();
      const headline = screen.getByRole('heading', { level: 2 });
      const description = screen.getByText(/Join thousands of traders who have revolutionized/i);
      const priceHighlight = screen.getByText('Get Started Today');
      
      expect(headline).toHaveStyle({ color: 'rgb(248, 248, 248)' });
      expect(description).toHaveStyle({ color: 'rgb(184, 184, 184)' });
      expect(priceHighlight).toHaveStyle({ color: 'rgb(93, 214, 44)' });
    });
  });

  describe('CTA Button Interactions', () => {
    it('handles primary CTA click - opens download link', async () => {
      const user = userEvent.setup();
      
      renderPricingSection();
      const primaryCTA = screen.getByTestId('pricing-cta-button');
      
      await user.click(primaryCTA);
      
      expect(mockWindowOpen).toHaveBeenCalledWith('https://example.com/download', '_blank');
    });

    it('handles secondary CTA click - opens learn more link', async () => {
      const user = userEvent.setup();
      
      renderPricingSection();
      const secondaryCTA = screen.getByRole('button', { name: /learn more/i });
      
      await user.click(secondaryCTA);
      
      expect(mockWindowOpen).toHaveBeenCalledWith('https://example.com/contact', '_blank');
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props to headline', () => {
      renderPricingSection();
      const headline = screen.getByRole('heading', { level: 2 });
      
      // Check that the element has motion attributes (Framer Motion adds these)
      expect(headline.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to description', () => {
      renderPricingSection();
      const description = screen.getByText(/Join thousands of traders who have revolutionized/i);
      
      // Check that the element has motion attributes
      expect(description.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to CTA container', () => {
      renderPricingSection();
      const primaryCTA = screen.getByTestId('pricing-cta-button');
      const ctaContainer = primaryCTA.parentElement;
      
      // Check that the CTA container has motion attributes
      expect(ctaContainer).toHaveAttribute('style');
    });
  });

  describe('Responsive Layout', () => {
    it('applies flex layout to CTA container', () => {
      renderPricingSection();
      const primaryCTA = screen.getByTestId('pricing-cta-button');
      const ctaContainer = primaryCTA.parentElement;
      
      expect(ctaContainer).toHaveStyle({ 
        display: 'flex',
        justifyContent: 'center',
        gap: '24px'
      });
    });

    it('centers content within section', () => {
      renderPricingSection();
      const section = screen.getByTestId('pricing-section');
      
      expect(section).toHaveStyle({
        textAlign: 'center'
      });
    });
  });

  describe('Typography Scaling', () => {
    it('applies correct font family and weight to headline', () => {
      renderPricingSection();
      const headline = screen.getByRole('heading', { level: 2 });
      
      expect(headline).toHaveStyle({ 
        fontFamily: '"Inter", sans-serif',
        fontWeight: '700'
      });
    });

    it('applies correct font styling to price highlight', () => {
      renderPricingSection();
      const priceHighlight = screen.getByText('Get Started Today');
      
      expect(priceHighlight).toHaveStyle({ 
        fontFamily: '"Inter", sans-serif',
        fontWeight: '600',
        color: 'rgb(93, 214, 44)'
      });
    });
  });
});