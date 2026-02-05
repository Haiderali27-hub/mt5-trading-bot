import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';

export const LicensingOfferingPage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="licensing">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Licensing & Offering
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2>Exclusive Licensing Available</h2>
          <p>Single-client exclusive license model for institutional deployment.</p>
          <p>Contact: exodellta@gmail.com for licensing inquiries.</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default LicensingOfferingPage;