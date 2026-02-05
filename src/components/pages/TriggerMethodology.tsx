import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';

export const TriggerMethodologyPage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="triggers">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Trigger Methodology
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <p>Manual trigger validation system with 95%+ engine consensus requirement.</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default TriggerMethodologyPage;