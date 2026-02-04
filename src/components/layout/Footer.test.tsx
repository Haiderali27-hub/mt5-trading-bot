import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { Footer } from './Footer';

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

describe('Footer Component', () => {
  const renderFooter = (props = {}) => {
    return render(
      <ThemeProvider>
        <Footer {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockWindowOpen.mockClear();
    vi.clearAllMocks();
  });

  describe('Content Structure', () => {
    it('renders footer with correct test id', () => {
      renderFooter();
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
    });

    it('renders navigation section', () => {
      renderFooter();
      const navigationSection = screen.getByTestId('footer-navigation');
      expect(navigationSection).toBeInTheDocument();
      
      const navigationHeading = screen.getByText('Navigation');
      expect(navigationHeading).toBeInTheDocument();
    });

    it('renders social media section', () => {
      renderFooter();
      const socialSection = screen.getByTestId('footer-social');
      expect(socialSection).toBeInTheDocument();
      
      const socialHeading = screen.getByText('Follow Us');
      expect(socialHeading).toBeInTheDocument();
    });

    it('renders contact section', () => {
      renderFooter();
      const contactSection = screen.getByTestId('footer-contact');
      expect(contactSection).toBeInTheDocument();
      
      const contactHeading = screen.getByText('Contact');
      expect(contactHeading).toBeInTheDocument();
    });

    it('renders copyright section', () => {
      renderFooter();
      const copyrightSection = screen.getByTestId('footer-copyright');
      expect(copyrightSection).toBeInTheDocument();
      
      const copyrightText = screen.getByText(/© 2024 MT5 Gold Trading Bot/i);
      expect(copyrightText).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders all navigation links', () => {
      renderFooter();
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Trading Modes')).toBeInTheDocument();
      expect(screen.getByText('Performance')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
    });

    it('handles navigation link clicks with smooth scroll', async () => {
      const user = userEvent.setup();
      
      // Create mock sections
      const heroSection = document.createElement('div');
      heroSection.id = 'hero';
      document.body.appendChild(heroSection);
      
      const scrollIntoViewSpy = vi.spyOn(heroSection, 'scrollIntoView');
      
      renderFooter();
      const homeLink = screen.getByText('Home');
      
      await user.click(homeLink);
      
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      // Cleanup
      document.body.removeChild(heroSection);
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links', () => {
      renderFooter();
      
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('YouTube')).toBeInTheDocument();
      expect(screen.getByText('Telegram')).toBeInTheDocument();
    });

    it('handles social media link clicks', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const twitterLink = screen.getByText('Twitter');
      
      await user.click(twitterLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://twitter.com/mt5goldbot',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles LinkedIn link click', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const linkedinLink = screen.getByText('LinkedIn');
      
      await user.click(linkedinLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://linkedin.com/company/mt5goldbot',
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Contact Information', () => {
    it('renders all contact information', () => {
      renderFooter();
      
      expect(screen.getByText('support@mt5goldbot.com')).toBeInTheDocument();
      expect(screen.getByText('+1 (555) 012-3456')).toBeInTheDocument();
      expect(screen.getByText('24/7 Customer Support')).toBeInTheDocument();
      expect(screen.getByText('Help Center')).toBeInTheDocument();
    });

    it('handles email link click', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const emailLink = screen.getByText('support@mt5goldbot.com');
      
      await user.click(emailLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'mailto:support@mt5goldbot.com',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles phone link click', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const phoneLink = screen.getByText('+1 (555) 012-3456');
      
      await user.click(phoneLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'tel:+1-555-0123',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles help center link click', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const helpCenterLink = screen.getByText('Help Center');
      
      await user.click(helpCenterLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://help.mt5goldbot.com',
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Legal Links', () => {
    it('renders privacy policy and terms of service links', () => {
      renderFooter();
      
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });

    it('handles privacy policy link click', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const privacyLink = screen.getByText('Privacy Policy');
      
      await user.click(privacyLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://mt5goldbot.com/privacy',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles terms of service link click', async () => {
      const user = userEvent.setup();
      
      renderFooter();
      const termsLink = screen.getByText('Terms of Service');
      
      await user.click(termsLink);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://mt5goldbot.com/terms',
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct background color', () => {
      renderFooter();
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveStyle({ backgroundColor: 'rgb(15, 15, 15)' });
    });

    it('applies border top', () => {
      renderFooter();
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveStyle({ borderTop: '1px solid rgb(117, 117, 117)' });
    });

    it('applies grid layout to content', () => {
      renderFooter();
      const footer = screen.getByTestId('footer');
      const contentDiv = footer.firstChild as HTMLElement;
      
      expect(contentDiv).toHaveStyle({ 
        display: 'grid',
        maxWidth: '1200px',
        margin: '0 auto'
      });
    });

    it('applies correct text colors to headings', () => {
      renderFooter();
      
      const navigationHeading = screen.getByText('Navigation');
      const socialHeading = screen.getByText('Follow Us');
      const contactHeading = screen.getByText('Contact');
      
      expect(navigationHeading).toHaveStyle({ color: 'rgb(248, 248, 248)' });
      expect(socialHeading).toHaveStyle({ color: 'rgb(248, 248, 248)' });
      expect(contactHeading).toHaveStyle({ color: 'rgb(248, 248, 248)' });
    });

    it('applies correct text colors to links', () => {
      renderFooter();
      
      const homeLink = screen.getByText('Home');
      const twitterLink = screen.getByText('Twitter');
      const emailLink = screen.getByText('support@mt5goldbot.com');
      
      expect(homeLink).toHaveStyle({ color: 'rgb(184, 184, 184)' });
      expect(twitterLink).toHaveStyle({ color: 'rgb(184, 184, 184)' });
      expect(emailLink).toHaveStyle({ color: 'rgb(184, 184, 184)' });
    });
  });

  describe('Responsive Layout', () => {
    it('applies flex column layout to sections', () => {
      renderFooter();
      
      const navigationSection = screen.getByTestId('footer-navigation');
      const socialSection = screen.getByTestId('footer-social');
      const contactSection = screen.getByTestId('footer-contact');
      
      expect(navigationSection).toHaveStyle({ 
        display: 'flex',
        flexDirection: 'column'
      });
      expect(socialSection).toHaveStyle({ 
        display: 'flex',
        flexDirection: 'column'
      });
      expect(contactSection).toHaveStyle({ 
        display: 'flex',
        flexDirection: 'column'
      });
    });

    it('centers copyright text', () => {
      renderFooter();
      const copyrightSection = screen.getByTestId('footer-copyright');
      
      expect(copyrightSection).toHaveStyle({ 
        textAlign: 'center',
        borderTop: '1px solid rgb(117, 117, 117)'
      });
    });
  });
});