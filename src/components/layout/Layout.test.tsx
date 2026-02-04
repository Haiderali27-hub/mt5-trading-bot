import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { ThemeProvider } from '../../theme';

// Mock the hooks
vi.mock('../../hooks/useMediaQuery', () => ({
  useMediaQuery: () => 'desktop'
}));

vi.mock('../../hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => ({
    scrollToSection: vi.fn()
  })
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Layout Component', () => {
  it('renders navigation, main content, and footer', () => {
    renderWithTheme(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    // Check that main content is rendered
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    
    // Check that footer is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('applies correct layout structure', () => {
    renderWithTheme(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    const layout = screen.getByTestId('test-content').closest('div');
    expect(layout).toBeInTheDocument();
  });

  it('renders children content correctly', () => {
    const testContent = 'This is test content';
    
    renderWithTheme(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});