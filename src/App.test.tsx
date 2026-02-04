import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the hooks
vi.mock('./hooks/useMediaQuery', () => ({
  useMediaQuery: () => 'desktop'
}));

vi.mock('./hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => ({
    scrollToSection: vi.fn()
  })
}));

describe('App Component', () => {
  it('renders all main sections', () => {
    render(<App />);

    // Check that all main sections are rendered
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
    expect(screen.getByTestId('trading-modes-section')).toBeInTheDocument();
    expect(screen.getByTestId('performance-section')).toBeInTheDocument();
    expect(screen.getByTestId('technology-section')).toBeInTheDocument();
    expect(screen.getByTestId('pricing-section')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders sections in correct order', () => {
    render(<App />);
    
    const sections = [
      screen.getByTestId('hero-section'),
      screen.getByTestId('features-section'),
      screen.getByTestId('trading-modes-section'),
      screen.getByTestId('performance-section'),
      screen.getByTestId('technology-section'),
      screen.getByTestId('pricing-section'),
    ];

    // Verify sections appear in DOM order
    for (let i = 0; i < sections.length - 1; i++) {
      expect(sections[i].compareDocumentPosition(sections[i + 1])).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    }
  });

  it('wraps content with theme provider', () => {
    render(<App />);
    
    // Check that theme-dependent content is rendered (indicates ThemeProvider is working)
    expect(screen.getByText('Advanced MT5 Gold Trading Bot')).toBeInTheDocument();
  });
});