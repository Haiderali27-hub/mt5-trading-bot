import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { Button } from './Button';

describe('Button Component', () => {
  const renderButton = (props = {}) => {
    return render(
      <ThemeProvider>
        <Button {...props}>Click me</Button>
      </ThemeProvider>
    );
  };

  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      renderButton({ variant: 'primary' });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ backgroundColor: '#5DD62C' });
    });

    it('renders secondary variant correctly', () => {
      renderButton({ variant: 'secondary' });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ backgroundColor: '#5AB526' });
    });

    it('renders outline variant correctly', () => {
      renderButton({ variant: 'outline' });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      // Check that outline variant has transparent background and border
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
      expect(styles.borderWidth).toBe('2px');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      renderButton({ size: 'small' });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ 
        padding: '16px 24px',
        fontSize: '14px'
      });
    });

    it('renders medium size correctly', () => {
      renderButton({ size: 'medium' });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ 
        padding: '16px 24px',
        fontSize: '16px'
      });
    });

    it('renders large size correctly', () => {
      renderButton({ size: 'large' });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ 
        padding: '24px 32px',
        fontSize: '18px'
      });
    });
  });

  describe('Click handlers', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick });
      
      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick, disabled: true });
      
      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Disabled state', () => {
    it('renders disabled state correctly', () => {
      renderButton({ disabled: true });
      const button = screen.getByRole('button', { name: /click me/i });
      
      expect(button).toBeDisabled();
      expect(button).toHaveStyle({ 
        opacity: '0.5',
        cursor: 'not-allowed'
      });
    });

    it('renders enabled state by default', () => {
      renderButton();
      const button = screen.getByRole('button', { name: /click me/i });
      
      expect(button).not.toBeDisabled();
      expect(button).toHaveStyle({ 
        opacity: '1',
        cursor: 'pointer'
      });
    });
  });
});
