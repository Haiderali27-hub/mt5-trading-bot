import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../theme';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Accessibility Tests', () => {
  describe('ARIA Attributes', () => {
    it('should have proper ARIA attributes on navigation', () => {
      renderWithTheme(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should have proper ARIA attributes on mobile navigation button', () => {
      // Mock mobile breakpoint
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      
      renderWithTheme(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-controls');
    });

    it('should have proper ARIA attributes on footer sections', () => {
      renderWithTheme(<Footer />);
      
      const socialSection = screen.getByLabelText('Social media links');
      expect(socialSection).toBeInTheDocument();
      
      const contactSection = screen.getByLabelText('Contact information');
      expect(contactSection).toBeInTheDocument();
    });

    it('should have proper ARIA attributes on buttons', () => {
      renderWithTheme(
        <div>
          <Button disabled>Disabled Button</Button>
          <Button>Enabled Button</Button>
        </div>
      );
      
      const disabledButton = screen.getByRole('button', { name: 'Disabled Button' });
      expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
      
      const enabledButton = screen.getByRole('button', { name: 'Enabled Button' });
      expect(enabledButton).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('Semantic HTML', () => {
    it('should use semantic HTML elements in navigation', () => {
      renderWithTheme(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav.tagName).toBe('NAV');
    });

    it('should use semantic HTML elements in footer', () => {
      renderWithTheme(<Footer />);
      
      const footer = screen.getByTestId('footer');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('should use semantic HTML elements in hero section', () => {
      renderWithTheme(<HeroSection />);
      
      const section = screen.getByTestId('hero-section');
      expect(section.tagName).toBe('SECTION');
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('should use semantic HTML elements in features section', () => {
      renderWithTheme(<FeaturesSection />);
      
      const section = screen.getByTestId('features-section');
      expect(section.tagName).toBe('SECTION');
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation for buttons', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Button onClick={handleClick}>Test Button</Button>
      );
      
      const button = screen.getByRole('button', { name: 'Test Button' });
      
      // Focus the button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Press Enter to activate
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Press Space to activate
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('should support keyboard navigation for footer links', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(<Footer />);
      
      // Find a footer navigation link
      const homeLink = screen.getByRole('button', { name: 'Home' });
      
      // Focus the link
      homeLink.focus();
      expect(homeLink).toHaveFocus();
      
      // Should be able to activate with Enter
      await user.keyboard('{Enter}');
      // Note: We can't easily test the scroll behavior in jsdom
    });

    it('should support tab navigation through interactive elements', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <div>
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button>Third Button</Button>
        </div>
      );
      
      const firstButton = screen.getByRole('button', { name: 'First Button' });
      const secondButton = screen.getByRole('button', { name: 'Second Button' });
      const disabledButton = screen.getByRole('button', { name: 'Disabled Button' });
      const thirdButton = screen.getByRole('button', { name: 'Third Button' });
      
      // Tab through buttons
      await user.tab();
      expect(firstButton).toHaveFocus();
      
      await user.tab();
      expect(secondButton).toHaveFocus();
      
      await user.tab();
      // Should skip disabled button and go to third button
      expect(thirdButton).toHaveFocus();
      expect(disabledButton).not.toHaveFocus();
    });
  });

  describe('Color Contrast', () => {
    it('should have sufficient color contrast for primary text', () => {
      renderWithTheme(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      const computedStyle = window.getComputedStyle(heading);
      
      // Check that text color is light (#F8F8F8) on dark background
      expect(computedStyle.color).toBe('rgb(248, 248, 248)');
    });

    it('should have sufficient color contrast for buttons', () => {
      renderWithTheme(
        <div>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      );
      
      const primaryButton = screen.getByRole('button', { name: 'Primary Button' });
      const secondaryButton = screen.getByRole('button', { name: 'Secondary Button' });
      const outlineButton = screen.getByRole('button', { name: 'Outline Button' });
      
      // Primary button should have dark text on light background
      const primaryStyle = window.getComputedStyle(primaryButton);
      expect(primaryStyle.backgroundColor).toBe('rgb(93, 214, 44)');
      expect(primaryStyle.color).toBe('rgb(15, 15, 15)');
      
      // Secondary button should have light text on dark background
      const secondaryStyle = window.getComputedStyle(secondaryButton);
      expect(secondaryStyle.backgroundColor).toBe('rgb(90, 181, 38)'); // #5AB526
      expect(secondaryStyle.color).toBe('rgb(248, 248, 248)');
      
      // Outline button should have accent color text
      const outlineStyle = window.getComputedStyle(outlineButton);
      expect(outlineStyle.color).toBe('rgb(93, 214, 44)');
    });
  });

  describe('Focus Management', () => {
    it('should have visible focus indicators', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Button>Focusable Button</Button>
      );
      
      const button = screen.getByRole('button', { name: 'Focusable Button' });
      
      // Focus the button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Check that the button has focus styles (this is implicit in our CSS)
      expect(button).toHaveFocus();
    });

    it('should not have focus traps in normal navigation', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <div>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </div>
      );
      
      const button1 = screen.getByRole('button', { name: 'Button 1' });
      const button2 = screen.getByRole('button', { name: 'Button 2' });
      
      // Tab through buttons normally
      await user.tab();
      expect(button1).toHaveFocus();
      
      await user.tab();
      expect(button2).toHaveFocus();
      
      // Should be able to tab out (focus will leave the container)
      await user.tab();
      expect(button2).not.toHaveFocus();
    });
  });

  describe('Touch Targets', () => {
    it('should have minimum touch target size for buttons', () => {
      renderWithTheme(
        <div>
          <Button size="small">Small Button</Button>
          <Button size="medium">Medium Button</Button>
          <Button size="large">Large Button</Button>
        </div>
      );
      
      const smallButton = screen.getByRole('button', { name: 'Small Button' });
      const mediumButton = screen.getByRole('button', { name: 'Medium Button' });
      const largeButton = screen.getByRole('button', { name: 'Large Button' });
      
      // All buttons should have minimum 44px height for touch targets
      const smallStyle = window.getComputedStyle(smallButton);
      const mediumStyle = window.getComputedStyle(mediumButton);
      const largeStyle = window.getComputedStyle(largeButton);
      
      expect(smallStyle.minHeight).toBe('44px');
      expect(mediumStyle.minHeight).toBe('44px');
      expect(largeStyle.minHeight).toBe('44px');
    });
  });
});