import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { Card } from './Card';

describe('Card Component', () => {
  const renderCard = (props = {}) => {
    return render(
      <ThemeProvider>
        <Card {...props}>
          <div>Card Content</div>
        </Card>
      </ThemeProvider>
    );
  };

  it('renders children correctly', () => {
    renderCard();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies dark theme styling', () => {
    const { container } = renderCard();
    const card = container.firstChild as HTMLElement;
    
    const styles = window.getComputedStyle(card);
    expect(styles.backgroundColor).toBe('rgb(32, 32, 32)'); // #202020
    expect(styles.borderRadius).toBe('12px');
  });

  it('renders as non-hoverable when hoverable is false', () => {
    const { container } = renderCard({ hoverable: false });
    const card = container.firstChild as HTMLElement;
    
    // Non-hoverable cards should be regular divs, not motion.div
    expect(card.tagName).toBe('DIV');
  });

  it('renders as hoverable by default', () => {
    const { container } = renderCard();
    const card = container.firstChild as HTMLElement;
    
    expect(card).toBeInTheDocument();
  });
});
