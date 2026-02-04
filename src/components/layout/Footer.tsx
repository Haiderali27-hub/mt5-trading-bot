import React from 'react';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface FooterProps {
  className?: string;
}

/**
 * Footer Component
 * Multi-column layout with Navigation, Social, and Contact sections
 * Uses dark theme colors with organized content groups
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';

  const containerStyles: React.CSSProperties = {
    backgroundColor: theme.colors.background.primary,
    borderTop: `1px solid ${theme.colors.border.default}`,
    padding: isMobile 
      ? `${theme.spacing.xxl} ${theme.spacing.md}` 
      : `${theme.spacing.xxl} ${theme.spacing.lg}`,
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? theme.spacing.xxl : theme.spacing.xl,
  };

  const sectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  const headingStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  };

  const linkStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const linkHoverStyles: React.CSSProperties = {
    color: theme.colors.accent.primary,
  };

  const copyrightStyles: React.CSSProperties = {
    borderTop: `1px solid ${theme.colors.border.default}`,
    marginTop: theme.spacing.xxl,
    paddingTop: theme.spacing.lg,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
  };

  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer style={containerStyles} className={className} data-testid="footer" role="contentinfo">
      <div style={contentStyles}>
        {/* Navigation Section */}
        <nav style={sectionStyles} data-testid="footer-navigation" aria-label="Footer navigation">
          <h3 style={headingStyles}>Navigation</h3>
          <a
            style={linkStyles}
            onClick={() => handleSmoothScroll('hero')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSmoothScroll('hero');
              }
            }}
          >
            Home
          </a>
          <a
            style={linkStyles}
            onClick={() => handleSmoothScroll('features')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSmoothScroll('features');
              }
            }}
          >
            Features
          </a>
          <a
            style={linkStyles}
            onClick={() => handleSmoothScroll('trading-modes')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSmoothScroll('trading-modes');
              }
            }}
          >
            Trading Modes
          </a>
          <a
            style={linkStyles}
            onClick={() => handleSmoothScroll('performance')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSmoothScroll('performance');
              }
            }}
          >
            Performance
          </a>
          <a
            style={linkStyles}
            onClick={() => handleSmoothScroll('technology')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSmoothScroll('technology');
              }
            }}
          >
            Technology
          </a>
          <a
            style={linkStyles}
            onClick={() => handleSmoothScroll('pricing')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSmoothScroll('pricing');
              }
            }}
          >
            Pricing
          </a>
        </nav>

        {/* Social Media Section */}
        <div style={sectionStyles} data-testid="footer-social" role="complementary" aria-label="Social media links">
          <h3 style={headingStyles}>Follow Us</h3>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('https://twitter.com/mt5goldbot')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://twitter.com/mt5goldbot');
              }
            }}
            aria-label="Follow us on Twitter (opens in new tab)"
          >
            Twitter
          </a>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('https://linkedin.com/company/mt5goldbot')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://linkedin.com/company/mt5goldbot');
              }
            }}
            aria-label="Follow us on LinkedIn (opens in new tab)"
          >
            LinkedIn
          </a>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('https://youtube.com/mt5goldbot')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://youtube.com/mt5goldbot');
              }
            }}
            aria-label="Subscribe to our YouTube channel (opens in new tab)"
          >
            YouTube
          </a>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('https://telegram.me/mt5goldbot')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://telegram.me/mt5goldbot');
              }
            }}
            aria-label="Join our Telegram channel (opens in new tab)"
          >
            Telegram
          </a>
        </div>

        {/* Contact Section */}
        <div style={sectionStyles} data-testid="footer-contact" role="complementary" aria-label="Contact information">
          <h3 style={headingStyles}>Contact</h3>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('mailto:support@mt5goldbot.com')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('mailto:support@mt5goldbot.com');
              }
            }}
            aria-label="Send email to support"
          >
            support@mt5goldbot.com
          </a>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('tel:+1-555-0123')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('tel:+1-555-0123');
              }
            }}
            aria-label="Call support phone number"
          >
            +1 (555) 012-3456
          </a>
          <span style={linkStyles} role="text">
            24/7 Customer Support
          </span>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('https://help.mt5goldbot.com')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://help.mt5goldbot.com');
              }
            }}
            aria-label="Visit help center (opens in new tab)"
          >
            Help Center
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={copyrightStyles} data-testid="footer-copyright">
        <p>
          © 2024 MT5 Gold Trading Bot. All rights reserved. | 
          <a
            style={{ ...linkStyles, marginLeft: theme.spacing.sm }}
            onClick={() => handleExternalLink('https://mt5goldbot.com/privacy')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://mt5goldbot.com/privacy');
              }
            }}
            aria-label="View privacy policy (opens in new tab)"
          >
            Privacy Policy
          </a>
          <span style={{ margin: `0 ${theme.spacing.sm}` }}>|</span>
          <a
            style={linkStyles}
            onClick={() => handleExternalLink('https://mt5goldbot.com/terms')}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyles)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleExternalLink('https://mt5goldbot.com/terms');
              }
            }}
            aria-label="View terms of service (opens in new tab)"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};