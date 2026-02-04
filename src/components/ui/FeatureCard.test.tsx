import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { FeatureCard } from './FeatureCard';

describe('FeatureCard Component', () => {
  const mockIcon = <svg data-testid="test-icon">Icon</svg>;

  const renderFeatureCard = (props = {}) => {
    return render(
      <ThemeProvider>
        <FeatureCard
          icon={mockIcon}
          title="Test Feature"
          description="This is a test feature description"
          {...props}
        />
      </ThemeProvider>
    );
  };

  it('renders icon, title, and description', () => {
    renderFeatureCard();
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument();
  });

  it('applies correct styling to title', () => {
    renderFeatureCard();
    const title = screen.getByText('Test Feature');
    
    const styles = window.getComputedStyle(title);
    expect(styles.fontSize).toBe('24px');
    expect(styles.color).toBe('rgb(248, 248, 248)'); // #F8F8F8
  });

  it('applies correct styling to description', () => {
    renderFeatureCard();
    const description = screen.getByText('This is a test feature description');
    
    const styles = window.getComputedStyle(description);
    expect(styles.fontSize).toBe('16px');
    expect(styles.color).toBe('rgb(184, 184, 184)'); // #B8B8B8
  });

  it('renders with custom index for stagger animation', () => {
    renderFeatureCard({ index: 5 });
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
  });
});
