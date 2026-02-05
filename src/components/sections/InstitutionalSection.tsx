import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AnimatedSection } from '../animations/AnimatedSection';

interface InstitutionalSectionProps {
  className?: string;
}

/**
 * Institutional Section Component
 * Displays comprehensive institutional information including strategy classification,
 * edge explanation, operational structure, and risk management details
 */
export const InstitutionalSection: React.FC<InstitutionalSectionProps> = ({ className }) => {
  const theme = useTheme();
  const breakpoint = useMediaQuery();
  const isMobile = breakpoint === 'mobile';

  const containerStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    padding: isMobile 
      ? `${theme.spacing.xxxl} ${theme.spacing.md}` 
      : `${theme.spacing.xxxl} ${theme.spacing.lg}`,
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: isMobile ? theme.typography.fontSize.xxxl : '56px',
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: '1.2',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    maxWidth: '700px',
    margin: `0 auto ${theme.spacing.xxl} auto`,
    lineHeight: '1.6',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(93, 214, 44, 0.2)',
    borderRadius: '16px',
    padding: theme.spacing.xl,
    backdropFilter: 'blur(10px)',
  };

  const cardTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.lg,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.accent.primary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const valueStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: '1.6',
  };

  const listStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: '1.6',
  };

  const bulletStyles: React.CSSProperties = {
    width: '6px',
    height: '6px',
    backgroundColor: theme.colors.accent.primary,
    borderRadius: '50%',
    marginRight: theme.spacing.sm,
    marginTop: '8px',
    flexShrink: 0,
  };

  return (
    <section style={containerStyles} className={className} id="institutional" data-testid="institutional-section">
      <AnimatedSection>
        <div style={contentStyles}>
          <motion.h2
            style={titleStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Institutional Overview
          </motion.h2>
          
          <motion.p
            style={subtitleStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            Professional-grade quantitative trading system with institutional-level performance and risk management
          </motion.p>

          <div style={gridStyles}>
            {/* Strategy Classification */}
            <motion.div
              style={cardStyles}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 style={cardTitleStyles}>Strategy Classification</h3>
              
              <div style={labelStyles}>Market Traded</div>
              <div style={valueStyles}>XAUUSD (Gold/USD)</div>
              
              <div style={labelStyles}>Strategy Type</div>
              <div style={valueStyles}>Quantitative Multi-Engine Algorithmic Trading</div>
              
              <div style={labelStyles}>Automation Level</div>
              <div style={valueStyles}>Semi-Automated with Manual Trigger Validation</div>
              
              <div style={labelStyles}>Trading Timeframe</div>
              <div style={valueStyles}>Multi-Timeframe (M1-H4 Primary, D1-W1 Confirmation)</div>
              
              <div style={labelStyles}>Deployment Model</div>
              <div style={valueStyles}>Single-Client Exclusive License</div>
            </motion.div>

            {/* Edge Explanation */}
            <motion.div
              style={cardStyles}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 style={cardTitleStyles}>Competitive Edge</h3>
              
              <div style={labelStyles}>Market Inefficiency Exploited</div>
              <div style={valueStyles}>Micro-structural price inefficiencies in gold futures during high-frequency market transitions and volatility clustering periods</div>
              
              <div style={labelStyles}>Why Opportunity Exists</div>
              <div style={valueStyles}>Gold market exhibits predictable behavioral patterns during specific volatility regimes due to institutional flow timing and retail sentiment divergence</div>
              
              <div style={labelStyles}>Data-Driven Justification</div>
              <div style={valueStyles}>Statistical analysis of 5+ years historical data shows persistent alpha generation during identified market conditions with 78.5% win rate</div>
            </motion.div>
          </div>

          {/* Operational Structure */}
          <motion.div
            style={cardStyles}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 style={cardTitleStyles}>Operational Structure & Risk Control</h3>
            
            <div style={labelStyles}>Signal Generation Summary</div>
            <div style={valueStyles}>
              40+ parallel prediction engines analyze market microstructure, volatility patterns, and multi-timeframe confluence to generate high-probability trade signals
            </div>
            
            <div style={labelStyles}>Execution Methodology</div>
            <div style={valueStyles}>
              GPU-accelerated signal processing with sub-millisecond execution latency, dynamic position sizing based on volatility-adjusted risk parameters
            </div>
            
            <div style={labelStyles}>Manual Trigger Explanation</div>
            <div style={valueStyles}>
              Human oversight validates AI-generated signals during specific market conditions to ensure optimal entry timing and risk management
            </div>
            
            <div style={labelStyles}>Risk Control Layers</div>
            <ul style={listStyles}>
              <li style={listItemStyles}>
                <div style={bulletStyles}></div>
                Pre-trade risk validation (200+ checks)
              </li>
              <li style={listItemStyles}>
                <div style={bulletStyles}></div>
                Dynamic position sizing (0.5-2% risk per trade)
              </li>
              <li style={listItemStyles}>
                <div style={bulletStyles}></div>
                Real-time drawdown monitoring (5% maximum)
              </li>
              <li style={listItemStyles}>
                <div style={bulletStyles}></div>
                Volatility-adjusted stop losses
              </li>
              <li style={listItemStyles}>
                <div style={bulletStyles}></div>
                Emergency circuit breakers
              </li>
              <li style={listItemStyles}>
                <div style={bulletStyles}></div>
                Correlation-based exposure limits
              </li>
            </ul>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
};