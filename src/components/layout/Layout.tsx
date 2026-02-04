import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from '../../theme';
import { AnimatedBackground } from '../animations/AnimatedBackground';
import { ScrollGrid } from '../animations/ScrollGrid';
import { NeuralNetwork } from '../animations/NeuralNetwork';
import { ScrollEffects } from '../animations/ScrollEffects';
import { FloatingTech } from '../animations/FloatingTech';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout Component
 * Provides the main layout structure with Navigation and Footer
 * Handles active section detection for navigation highlighting
 */
export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Section IDs that match navigation hrefs
  const sectionIds = ['hero', 'features', 'trading-modes', 'performance', 'technology', 'pricing'];

  // Set up intersection observers for each section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionElements: { [key: string]: Element } = {};

    // Find all section elements
    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        sectionElements[sectionId] = element;
      }
    });

    // Create intersection observer for active section detection
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionId = entry.target.id;
          if (sectionIds.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // 50% of section must be visible
      rootMargin: '-80px 0px -80px 0px', // Account for fixed navigation height
    });

    // Observe all sections
    Object.values(sectionElements).forEach(element => {
      observer.observe(element);
    });

    observers.push(observer);

    // Cleanup
    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  const layoutStyles: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.background.primary, // Set dark background for the entire layout
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    paddingTop: '73px', // Account for fixed navigation height
    position: 'relative',
    zIndex: 10, // Ensure content is above animated backgrounds
    backgroundColor: 'transparent', // Allow animations to show through
  };

  return (
    <div style={layoutStyles} className={className}>
      {/* Animated Background Layers - Fixed positioned behind all content */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        <AnimatedBackground />
        <ScrollGrid />
        <NeuralNetwork />
        <ScrollEffects />
        <FloatingTech />
      </div>
      
      <Navigation activeSection={activeSection} />
      <main style={mainStyles}>
        {children}
      </main>
      <Footer />
    </div>
  );
};