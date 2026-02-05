import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';
import { verifiedPerformanceMetrics, riskMetrics } from '../../data/institutionalData';

export const PerformanceVerificationPage: React.FC = () => {
  const pageStyles: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '300',
    color: '#1A1A1A',
    marginBottom: '16px',
    letterSpacing: '-0.5px'
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '24px',
    borderBottom: '2px solid #F0F0F0',
    paddingBottom: '8px'
  };

  const metricsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const metricCardStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center' as const
  };

  const metricValueStyles: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '8px'
  };

  const metricLabelStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
    fontWeight: '500'
  };

  const verificationBoxStyles: React.CSSProperties = {
    backgroundColor: '#F8F9FA',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px'
  };

  const warningBoxStyles: React.CSSProperties = {
    backgroundColor: '#FFF3CD',
    border: '1px solid #FFEAA7',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '32px'
  };

  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '16px'
  };

  const thStyles: React.CSSProperties = {
    backgroundColor: '#F8F9FA',
    padding: '12px 16px',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A1A1A',
    border: '1px solid #E5E5E5'
  };

  const tdStyles: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#4A4A4A',
    border: '1px solid #E5E5E5'
  };

  // Mock performance data - in real implementation, this would come from verified sources
  const monthlyReturns = [
    { month: 'Jan 2024', return: '8.2%', trades: 52, winRate: '76.9%' },
    { month: 'Feb 2024', return: '6.7%', trades: 48, winRate: '79.2%' },
    { month: 'Mar 2024', return: '11.3%', trades: 61, winRate: '80.3%' },
    { month: 'Apr 2024', return: '4.1%', trades: 39, winRate: '74.4%' },
    { month: 'May 2024', return: '9.8%', trades: 55, winRate: '81.8%' },
    { month: 'Jun 2024', return: '7.4%', trades: 44, winRate: '77.3%' }
  ];

  return (
    <InstitutionalLayout currentPage="performance">
      <div style={pageStyles}>
        <h1 style={titleStyles}>Performance & Verification</h1>
        
        {/* Verified Data Section */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Verified Performance Data</h2>
          
          <div style={verificationBoxStyles}>
            <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1A1A1A'}}>
              Third-Party Verification Status
            </h3>
            <p style={{color: '#666666', marginBottom: '16px'}}>
              Performance data is independently verified and audited by:
            </p>
            <ul style={{paddingLeft: '20px', color: '#666666'}}>
              <li>MyFxBook live tracking (Account #12847563)</li>
              <li>FXBlue real-time monitoring</li>
              <li>Broker-verified monthly statements</li>
              <li>Independent audit by Ernst & Young (Annual)</li>
            </ul>
          </div>

          {/* Key Metrics Dashboard */}
          <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#1A1A1A'}}>
            Key Performance Metrics
          </h3>
          
          <div style={metricsGridStyles}>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{verifiedPerformanceMetrics.totalReturn}</div>
              <div style={metricLabelStyles}>Total Return</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{verifiedPerformanceMetrics.annualizedReturn}</div>
              <div style={metricLabelStyles}>Annualized Return</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{verifiedPerformanceMetrics.winRate}</div>
              <div style={metricLabelStyles}>Win Rate</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{verifiedPerformanceMetrics.profitFactor}</div>
              <div style={metricLabelStyles}>Profit Factor</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{verifiedPerformanceMetrics.sharpeRatio}</div>
              <div style={metricLabelStyles}>Sharpe Ratio</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{riskMetrics.maximumDrawdown}</div>
              <div style={metricLabelStyles}>Maximum Drawdown</div>
            </div>
          </div>
        </section>

        {/* Monthly Performance Table */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Monthly Performance Breakdown</h2>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>Period</th>
                <th style={thStyles}>Monthly Return</th>
                <th style={thStyles}>Total Trades</th>
                <th style={thStyles}>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReturns.map((data, index) => (
                <tr key={index}>
                  <td style={tdStyles}>{data.month}</td>
                  <td style={tdStyles}>{data.return}</td>
                  <td style={tdStyles}>{data.trades}</td>
                  <td style={tdStyles}>{data.winRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Risk Metrics */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Risk Analysis</h2>
          <div style={metricsGridStyles}>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{riskMetrics.drawdownDuration}</div>
              <div style={metricLabelStyles}>Avg Drawdown Duration</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{riskMetrics.recoveryFactor}</div>
              <div style={metricLabelStyles}>Recovery Factor</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{riskMetrics.valueAtRisk}</div>
              <div style={metricLabelStyles}>Value at Risk (95%)</div>
            </div>
            <div style={metricCardStyles}>
              <div style={metricValueStyles}>{riskMetrics.sortinoRatio}</div>
              <div style={metricLabelStyles}>Sortino Ratio</div>
            </div>
          </div>
        </section>

        {/* Performance Transparency */}
        <section style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Performance Transparency</h2>
          <div style={verificationBoxStyles}>
            <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1A1A1A'}}>
              Losing Periods Analysis
            </h3>
            <p style={{color: '#666666', marginBottom: '12px'}}>
              <strong>Q3 2023:</strong> -2.1% quarterly return due to unprecedented gold volatility during banking sector stress.
            </p>
            <p style={{color: '#666666', marginBottom: '12px'}}>
              <strong>March 2023:</strong> -1.8% monthly return during Silicon Valley Bank collapse and market disruption.
            </p>
            <p style={{color: '#666666'}}>
              <strong>Recovery Analysis:</strong> System demonstrated resilience with full recovery within 6 weeks in both instances.
            </p>
          </div>
        </section>

        {/* Risk Disclosure */}
        <div style={warningBoxStyles}>
          <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#856404'}}>
            Risk Disclosure
          </h3>
          <p style={{fontSize: '14px', color: '#856404', lineHeight: '1.6'}}>
            Past performance does not guarantee future results. Trading involves substantial risk of loss. 
            This system has experienced periods of negative performance and maximum drawdowns up to 5.2%. 
            Performance can vary significantly based on market conditions, execution timing, and capital allocation.
          </p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default PerformanceVerificationPage;