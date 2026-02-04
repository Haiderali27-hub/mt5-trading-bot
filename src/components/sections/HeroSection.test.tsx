import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { HeroSection } from './HeroSection';

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('HeroSection Component', () => {
  const renderHeroSection = (props = {}) => {
    return render(
      <ThemeProvider>
        <HeroSection {...props} />
      </ThemeProvider>
    );
  };

  describe('Content Rendering', () => {
    it('renders headline correctly', () => {
      renderHeroSection();
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline).toBeInTheDocument();
      expect(headline).toHaveTextContent('Advanced MT5 Gold Trading Bot');
    });

    it('renders subheadline correctly', () => {
      renderHeroSection();
      const subheadline = screen.getByText(/Harness the power of 40\+ prediction engines/i);
      expect(subheadline).toBeInTheDocument();
    });

    it('renders primary CTA button', () => {
      renderHeroSection();
      const primaryCTA = screen.getByRole('button', { name: /get started now/i });
      expect(primaryCTA).toBeInTheDocument();
    });

    it('renders secondary CTA button', () => {
      renderHeroSection();
      const secondaryCTA = screen.getByRole('button', { name: /learn more/i });
      expect(secondaryCTA).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct background color', () => {
      renderHeroSection();
      const section = screen.getByTestId('hero-section');
      expect(section).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies correct text colors', () => {
      renderHeroSection();
      const headline = screen.getByRole('heading', { level: 1 });
      const subheadline = screen.getByText(/Harness the power of 40\+ prediction engines/i);
      
      expect(headline).toHaveStyle({ color: 'rgb(248, 248, 248)' });
      expect(subheadline).toHaveStyle({ color: 'rgb(184, 184, 184)' });
    });

    it('applies section id for navigation', () => {
      renderHeroSection();
      const section = screen.getByTestId('hero-section');
      expect(section).toHaveAttribute('id', 'hero');
    });
  });

  describe('Responsive Typography', () => {
    it('renders headline with appropriate font size', () => {
      renderHeroSection();
      const headline = screen.getByRole('heading', { level: 1 });
      
      // Check that font size is set (actual value depends on breakpoint)
      const styles = window.getComputedStyle(headline);
      expect(parseInt(styles.fontSize)).toBeGreaterThan(30); // Should be at least 32px
    });

    it('applies correct font family and weight', () => {
      renderHeroSection();
      const headline = screen.getByRole('heading', { level: 1 });
      
      expect(headline).toHaveStyle({ 
        fontFamily: '"Inter", sans-serif',
        fontWeight: '700'
      });
    });
  });

  describe('Animation Implementation', () => {
    it('applies Framer Motion animation props to headline', () => {
      renderHeroSection();
      const headline = screen.getByRole('heading', { level: 1 });
      
      // Check that the element has motion attributes (Framer Motion adds these)
      expect(headline.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to subheadline', () => {
      renderHeroSection();
      const subheadline = screen.getByText(/Harness the power of 40\+ prediction engines/i);
      
      // Check that the element has motion attributes
      expect(subheadline.closest('[style*="transform"]')).toBeTruthy();
    });

    it('applies Framer Motion animation props to CTA container', () => {
      renderHeroSection();
      const primaryCTA = screen.getByRole('button', { name: /get started now/i });
      const ctaContainer = primaryCTA.parentElement;
      
      // Check that the CTA container has motion attributes
      expect(ctaContainer).toHaveAttribute('style');
    });
  });

  describe('CTA Button Interactions', () => {
    it('handles primary CTA click - scrolls to pricing section', async () => {
      const user = userEvent.setup();
      
      // Create a mock pricing section
      const pricingSection = document.createElement('div');
      pricingSection.id = 'pricing';
      document.body.appendChild(pricingSection);
      
      const scrollIntoViewSpy = vi.spyOn(pricingSection, 'scrollIntoView');
      
      renderHeroSection();
      const primaryCTA = screen.getByRole('button', { name: /get started now/i });
      
      await user.click(primaryCTA);
      
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      // Cleanup
      document.body.removeChild(pricingSection);
    });

    it('handles secondary CTA click - scrolls to features section', async () => {
      const user = userEvent.setup();
      
      // Create a mock features section
      const featuresSection = document.createElement('div');
      featuresSection.id = 'features';
      document.body.appendChild(featuresSection);
      
      const scrollIntoViewSpy = vi.spyOn(featuresSection, 'scrollIntoView');
      
      renderHeroSection();
      const secondaryCTA = screen.getByRole('button', { name: /learn more/i });
      
      await user.click(secondaryCTA);
      
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      // Cleanup
      document.body.removeChild(featuresSection);
    });

    it('handles missing target sections gracefully', async () => {
      const user = userEvent.setup();
      
      renderHeroSection();
      const primaryCTA = screen.getByRole('button', { name: /get started now/i });
      
      // Should not throw error when target section doesn't exist
      await expect(user.click(primaryCTA)).resolves.not.toThrow();
    });
  });

  describe('Responsive Layout', () => {
    it('applies flex layout to CTA container', () => {
      renderHeroSection();
      const primaryCTA = screen.getByRole('button', { name: /get started now/i });
      const ctaContainer = primaryCTA.parentElement;
      
      expect(ctaContainer).toHaveStyle({ 
        display: 'flex',
        justifyContent: 'center',
        gap: '24px'
      });
    });

    it('centers content within section', () => {
      renderHeroSection();
      const section = screen.getByTestId('hero-section');
      
      expect(section).toHaveStyle({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
    });
  });
});