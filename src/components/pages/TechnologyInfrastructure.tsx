import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';
import { technologyInfrastructure } from '../../data/institutionalData';

export const TechnologyInfrastructurePage: React.FC = () => {
  const pageStyles: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '300',
    color: '#1A1A1A',
    marginBottom: '16px',
    letterSpacing: '-0.5px'
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '24px',
    borderBottom: '2px solid #F0F0F0',
    paddingBottom: '8px'
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px'
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666666',
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  };

  const valueStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#1A1A1A',
    marginBottom: '16px',
    lineHeight: '1.5'
  };

  return (
    <InstitutionalLayout currentPage="technology">
      <div style={pageStyles}>
        <h1 style={titleStyles}>Technology & Infrastructure</h1>
        
        {/* Core Technology Stack */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Core Technology Stack</h2>
          <div style={cardStyles}>
            <div style={labelStyles}>Trading Platform</div>
            <div style={valueStyles}>{technologyInfrastructure.platform}</div>
            
            <div style={labelStyles}>AI Engine Architecture</div>
            <div style={valueStyles}>{technologyInfrastructure.aiEngineOverview}</div>
            
            <div style={labelStyles}>Signal Generation Methodology</div>
            <div style={valueStyles}>{technologyInfrastructure.multiEngineSignalExplanation}</div>
            
            <div style={labelStyles}>Execution Infrastructure</div>
            <div style={valueStyles}>{technologyInfrastructure.executionInfrastructure}</div>
          </div>
        </section>

        {/* Infrastructure Requirements */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Infrastructure Requirements</h2>
          <div style={cardStyles}>
            <div style={labelStyles}>VPS Hosting Requirements</div>
            <div style={valueStyles}>{technologyInfrastructure.vpsHostingRequirements}</div>
            
            <div style={labelStyles}>Latency Sensitivity</div>
            <div style={valueStyles}>{technologyInfrastructure.latencySensitivity}</div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Technical Specifications</h2>
          <div style={cardStyles}>
            <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
              40+ Prediction Engines
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px'}}>
              <div style={{padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '6px'}}>
                <div style={{fontWeight: '600', marginBottom: '8px'}}>Quantum Engines (7+)</div>
                <div style={{fontSize: '14px', color: '#4A4A4A'}}>
                  QuantumGoldPricing, MarketMicrostructure, AdvancedQuantum, RoughVolatility
                </div>
              </div>
              <div style={{padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '6px'}}>
                <div style={{fontWeight: '600', marginBottom: '8px'}}>ML Engines (10+)</div>
                <div style={{fontSize: '14px', color: '#4A4A4A'}}>
                  LSTM, Random Forest, XGBoost, Neural Networks, Q-Learning
                </div>
              </div>
              <div style={{padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '6px'}}>
                <div style={{fontWeight: '600', marginBottom: '8px'}}>Technical Analysis (8+)</div>
                <div style={{fontSize: '14px', color: '#4A4A4A'}}>
                  TradingView, Multi-Timeframe, Pattern Recognition, Price Action
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>System Performance</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
            <div style={{...cardStyles, textAlign: 'center'}}>
              <div style={{fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px'}}>
                200,000+
              </div>
              <div style={{fontSize: '13px', color: '#666666'}}>
                Market Analysis Cycles/Second
              </div>
            </div>
            <div style={{...cardStyles, textAlign: 'center'}}>
              <div style={{fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px'}}>
                &lt;1ms
              </div>
              <div style={{fontSize: '13px', color: '#666666'}}>
                Execution Latency Target
              </div>
            </div>
            <div style={{...cardStyles, textAlign: 'center'}}>
              <div style={{fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px'}}>
                95%+
              </div>
              <div style={{fontSize: '13px', color: '#666666'}}>
                Engine Consensus Required
              </div>
            </div>
            <div style={{...cardStyles, textAlign: 'center'}}>
              <div style={{fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px'}}>
                99.9%
              </div>
              <div style={{fontSize: '13px', color: '#666666'}}>
                System Uptime SLA
              </div>
            </div>
          </div>
        </section>
      </div>
    </InstitutionalLayout>
  );
};
export default TechnologyInfrastructurePage;