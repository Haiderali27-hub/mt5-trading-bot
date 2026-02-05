import React from 'react';
import { InstitutionalLayout } from '../layout/InstitutionalLayout';

export const RestrictedDataRoomPage: React.FC = () => {
  return (
    <InstitutionalLayout currentPage="dataroom">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{fontSize: '32px', fontWeight: '300', color: '#1A1A1A', marginBottom: '24px'}}>
          Restricted Data Room
        </h1>
        <div style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px'}}>
          <h2>Access Restricted</h2>
          <p>This section contains confidential performance data and detailed system specifications.</p>
          <p>Access is restricted to qualified institutional investors and licensed partners.</p>
          <p>Please contact exodellta@gmail.com for access credentials.</p>
        </div>
      </div>
    </InstitutionalLayout>
  );
};
export default RestrictedDataRoomPage;