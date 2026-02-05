import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';

export const LegalDisclosurePage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="legal">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Legal & Disclosure
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2>Risk Disclosure</h2>
          <p>Trading involves substantial risk and may not be suitable for all investors.</p>
          <p>Past performance does not guarantee future results.</p>
          
          <h3 style={{marginTop: '24px'}}>Legal Notice</h3>
          <p>© 2024 EXO-Δ. All rights reserved.</p>
          <p>This system is provided under exclusive licensing agreements.</p>
          
          <h3 style={{marginTop: '24px'}}>Compliance</h3>
          <p>System operates under applicable financial regulations and compliance frameworks.</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default LegalDisclosurePage;