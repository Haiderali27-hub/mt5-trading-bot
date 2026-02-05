import React from 'react';
import { institutionalNavigation } from '../../data/institutionalData';

interface InstitutionalLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export const InstitutionalLayout: React.FC<InstitutionalLayoutProps> = ({ 
  children, 
  currentPage = 'home' 
}) => {
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.6'
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E5E5',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  const navContainerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const brandStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #F0F0F0'
  };

  const logoStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1A1A1A',
    textDecoration: 'none',
    letterSpacing: '-0.5px'
  };

  const taglineStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
    marginLeft: '16px',
    fontWeight: '400'
  };

  const navStyles: React.CSSProperties = {
    display: 'flex',
    overflowX: 'auto',
    padding: '12px 0',
    gap: '32px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  };

  const navItemStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    padding: '8px 0',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  };

  const activeNavItemStyles: React.CSSProperties = {
    ...navItemStyles,
    color: '#1A1A1A',
    borderBottomColor: '#1A1A1A'
  };

  const mainStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px'
  };

  const footerStyles: React.CSSProperties = {
    backgroundColor: '#F8F9FA',
    borderTop: '1px solid #E5E5E5',
    padding: '32px 0',
    marginTop: '64px'
  };

  const footerContentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center' as const
  };

  const footerTextStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '8px'
  };

  const disclaimerStyles: React.CSSProperties = {
    fontSize: '12px',
    color: '#999999',
    lineHeight: '1.5'
  };

  return (
    <div style={containerStyles}>
      <header style={headerStyles}>
        <div style={navContainerStyles}>
          <div style={brandStyles}>
            <a href="/" style={logoStyles}>
              MT5 Gold Trading System
            </a>
            <span style={taglineStyles}>
              Institutional Quantitative Trading Platform
            </span>
          </div>
          
          <nav style={navStyles}>
            {institutionalNavigation.map((item) => (
              <a
                key={item.id}
                href={item.path}
                style={currentPage === item.id ? activeNavItemStyles : navItemStyles}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main style={mainStyles}>
        {children}
      </main>

      <footer style={footerStyles}>
        <div style={footerContentStyles}>
          <p style={footerTextStyles}>
            © 2024 EXO-Δ Research. All rights reserved.
          </p>
          <p style={disclaimerStyles}>
            This system is offered exclusively to qualified institutional investors. 
            Past performance does not guarantee future results. 
            Trading involves substantial risk of loss.
          </p>
        </div>
      </footer>
    </div>
  );
};