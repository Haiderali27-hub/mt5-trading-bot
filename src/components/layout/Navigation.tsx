import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface NavigationProps {
  className?: string;
  activeSection?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className, activeSection }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    window.open('mailto:exodellta@gmail.com?subject=MT5 Gold Trading Bot - Contact&body=I am interested in learning more about the MT5 Gold Trading Bot.', '_blank');
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'institutional', label: 'Strategy' },
    { id: 'features', label: 'Features' },
    { id: 'performance', label: 'Performance' },
    { id: 'technology', label: 'Technology' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const navStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    borderBottom: isScrolled ? '1px solid rgba(93, 214, 44, 0.2)' : 'none',
    transition: 'all 0.3s ease',
    padding: isMobile ? '12px 16px' : '16px 32px',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: isMobile ? '18px' : '24px',
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const handleLogoClick = () => {
    // Navigate to main EXO Delta website
    window.open('https://haiderali27-hub.github.io/EXO_Delta/', '_blank');
  };

  const navListStyles: React.CSSProperties = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '32px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const navItemStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    padding: '8px 0',
  };

  const contactButtonStyles: React.CSSProperties = {
    backgroundColor: theme.colors.accent.primary,
    color: theme.colors.background.primary,
    border: 'none',
    borderRadius: '6px',
    padding: isMobile ? '8px 16px' : '10px 20px',
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <motion.nav
      style={navStyles}
      className={className}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div style={containerStyles}>
        <motion.div
          style={logoStyles}
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EXO-Δ
        </motion.div>

        <ul style={navListStyles}>
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.a
                style={{
                  ...navItemStyles,
                  color: activeSection === item.id ? theme.colors.accent.primary : theme.colors.text.secondary,
                }}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ 
                  color: theme.colors.accent.primary,
                  scale: 1.05 
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.button
          style={contactButtonStyles}
          onClick={handleContactClick}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: theme.colors.accent.secondary 
          }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </motion.button>
      </div>
    </motion.nav>
  );
};