import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { theme } from '../../theme/theme';
import { ANIMATION_TIMING, ANIMATION_EASING } from '../../utils/animations';

interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

const sections: NavigationSection[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'trading-modes', label: 'Trading Modes', href: '#trading-modes' },
  { id: 'performance', label: 'Performance', href: '#performance' },
  { id: 'technology', label: 'Technology', href: '#technology' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
];

interface NavigationProps {
  activeSection?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection = 'hero',
}) => {
  const breakpoint = useMediaQuery();
  const { scrollToSection } = useSmoothScroll({ offset: 80 }); // Account for fixed nav height
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = breakpoint === 'mobile';

  // Close mobile menu when breakpoint changes to non-mobile
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: `${theme.colors.background.primary}CC`, // 80% opacity
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    borderBottom: `1px solid ${theme.colors.border.default}`,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  };

  const desktopNavStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xl,
  };

  const mobileNavStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyles = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? theme.colors.accent.primary : theme.colors.text.primary,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.base,
    fontWeight: isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: '4px',
    transition: `color ${ANIMATION_TIMING.fast}s ${ANIMATION_EASING.easeInOut}`,
    cursor: 'pointer',
  });

  const hamburgerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '24px',
    height: '24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  const hamburgerLineStyles = (isOpen: boolean, lineIndex: number): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: '100%',
      height: '2px',
      backgroundColor: theme.colors.text.primary,
      transition: `all ${ANIMATION_TIMING.fast}s ${ANIMATION_EASING.easeInOut}`,
      transformOrigin: 'center',
    };

    if (!isOpen) return baseStyles;

    // Animate hamburger to X
    if (lineIndex === 0) {
      return { ...baseStyles, transform: 'rotate(45deg) translate(5px, 5px)' };
    }
    if (lineIndex === 1) {
      return { ...baseStyles, opacity: 0 };
    }
    if (lineIndex === 2) {
      return { ...baseStyles, transform: 'rotate(-45deg) translate(7px, -6px)' };
    }

    return baseStyles;
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: ANIMATION_TIMING.medium,
        ease: ANIMATION_EASING.easeInOut,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_TIMING.medium,
        ease: ANIMATION_EASING.easeInOut,
      },
    },
  };

  const mobileMenuStyles: React.CSSProperties = {
    position: 'fixed',
    top: '73px', // Height of navigation bar
    right: 0,
    width: '100%',
    maxWidth: '300px',
    height: 'calc(100vh - 73px)',
    backgroundColor: theme.colors.background.secondary,
    borderLeft: `1px solid ${theme.colors.border.default}`,
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  if (isMobile) {
    return (
      <>
        <nav style={navigationStyles} role="navigation" aria-label="Main navigation">
          <div style={mobileNavStyles}>
            <div style={{ 
              fontSize: theme.typography.fontSize.lg, 
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.accent.primary 
            }}>
              MT5 Gold Bot
            </div>
            <button
              style={hamburgerStyles}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div style={hamburgerLineStyles(isMobileMenuOpen, 0)} />
              <div style={hamburgerLineStyles(isMobileMenuOpen, 1)} />
              <div style={hamburgerLineStyles(isMobileMenuOpen, 2)} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              style={mobileMenuStyles}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="menu"
              aria-label="Navigation menu"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  style={linkStyles(activeSection === section.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(section.id);
                  }}
                  role="menuitem"
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <nav style={navigationStyles} role="navigation" aria-label="Main navigation">
      <div style={desktopNavStyles}>
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.href}
            style={linkStyles(activeSection === section.id)}
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick(section.id);
            }}
            onMouseEnter={(e) => {
              if (activeSection !== section.id) {
                (e.target as HTMLElement).style.color = theme.colors.accent.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== section.id) {
                (e.target as HTMLElement).style.color = theme.colors.text.primary;
              }
            }}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
};