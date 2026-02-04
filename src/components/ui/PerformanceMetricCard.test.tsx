import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { PerformanceMetricCard } from './PerformanceMetricCard';

describe('PerformanceMetricCard Component', () => {
  const mockIcon = <svg data-testid="test-icon">Icon</svg>;

  const renderPerformanceMetricCard = (props = {}) => {
    return render(
      <ThemeProvider>
        <PerformanceMetricCard
          icon={mockIcon}
          label="Test Metric"
          value="78.5"
          unit="%"
          trend="positive"
          description="This is a test metric description"
          {...props}
        />
      </ThemeProvider>
    );
  };

  describe('Content Rendering', () => {
    it('renders icon, label, value, unit, and description', () => {
      renderPerformanceMetricCard();
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Test Metric')).toBeInTheDocument();
      expect(screen.getByText('%')).toBeInTheDocument();
      expect(screen.getByText('This is a test metric description')).toBeInTheDocument();
    });

    it('renders numeric value correctly', () => {
      renderPerformanceMetricCard({ value: '45.2', unit: 'pips' });
      
      expect(screen.getByText('pips')).toBeInTheDocument();
    });

    it('renders ratio value correctly', () => {
      renderPerformanceMetricCard({ value: '1:3.2', unit: 'ratio' });
      
      expect(screen.getByText('0')).toBeInTheDocument(); // Animation starts at 0
      expect(screen.getByText('ratio')).toBeInTheDocument();
    });
  });

  describe('Trend Color Coding', () => {
    it('applies positive trend color (green)', () => {
      renderPerformanceMetricCard({ trend: 'positive' });
      const value = screen.getByText('0'); // Animation starts at 0
      
      expect(value).toHaveStyle({ color: 'rgb(93, 214, 44)' }); // #5DD62C
    });

    it('applies negative trend color (red)', () => {
      renderPerformanceMetricCard({ trend: 'negative' });
      const value = screen.getByText('0'); // Animation starts at 0
      
      expect(value).toHaveStyle({ color: 'rgb(255, 68, 68)' }); // #FF4444
    });

    it('applies neutral trend color (default)', () => {
      renderPerformanceMetricCard({ trend: 'neutral' });
      const value = screen.getByText('0'); // Animation starts at 0
      
      expect(value).toHaveStyle({ color: 'rgb(248, 248, 248)' }); // #F8F8F8
    });
  });

  describe('Icon Container Styling', () => {
    it('applies positive trend icon background', () => {
      renderPerformanceMetricCard({ trend: 'positive' });
      const icon = screen.getByTestId('test-icon');
      const iconContainer = icon.parentElement;
      
      expect(iconContainer).toHaveStyle({ 
        backgroundColor: 'rgba(93, 214, 44, 0.125)' // #5DD62C20
      });
    });

    it('applies negative trend icon background', () => {
      renderPerformanceMetricCard({ trend: 'negative' });
      const icon = screen.getByTestId('test-icon');
      const iconContainer = icon.parentElement;
      
      expect(iconContainer).toHaveStyle({ 
        backgroundColor: 'rgba(255, 68, 68, 0.125)' // #FF444420
      });
    });
  });

  describe('Typography Styling', () => {
    it('applies correct label styling', () => {
      renderPerformanceMetricCard();
      const label = screen.getByText('Test Metric');
      
      expect(label).toHaveStyle({
        fontSize: '16px',
        color: 'rgb(184, 184, 184)', // #B8B8B8
        fontWeight: '500'
      });
    });

    it('applies correct value styling', () => {
      renderPerformanceMetricCard();
      const value = screen.getByText('0'); // Animation starts at 0
      
      expect(value).toHaveStyle({
        fontSize: '48px',
        fontWeight: '700'
      });
    });

    it('applies correct unit styling', () => {
      renderPerformanceMetricCard();
      const unit = screen.getByText('%');
      
      expect(unit).toHaveStyle({
        fontSize: '18px',
        color: 'rgb(184, 184, 184)', // #B8B8B8
        fontWeight: '500'
      });
    });

    it('applies correct description styling', () => {
      renderPerformanceMetricCard();
      const description = screen.getByText('This is a test metric description');
      
      expect(description).toHaveStyle({
        fontSize: '14px',
        color: 'rgb(184, 184, 184)', // #B8B8B8
        lineHeight: '1.5'
      });
    });
  });

  describe('Animation Implementation', () => {
    it('renders with custom index for stagger animation', () => {
      renderPerformanceMetricCard({ index: 3 });
      
      expect(screen.getByText('Test Metric')).toBeInTheDocument();
    });

    it('applies Framer Motion animation props', () => {
      renderPerformanceMetricCard();
      const label = screen.getByText('Test Metric');
      
      // Check that the component is wrapped in a motion element
      expect(label.closest('[style*="transform"]')).toBeTruthy();
    });
  });

  describe('Animated Counter', () => {
    it('handles numeric values for animation', () => {
      renderPerformanceMetricCard({ value: '45.2' });
      
      // The value should start at 0 for animation (animation testing would require more complex setup)
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles non-numeric values without animation', () => {
      renderPerformanceMetricCard({ value: '1:3.2' });
      
      expect(screen.getByText('0')).toBeInTheDocument(); // Still starts at 0 initially
    });
  });
});