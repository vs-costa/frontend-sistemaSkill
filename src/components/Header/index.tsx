import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header style={{ background: 'transparent', padding: '0 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://vsoares.com/wp-content/uploads/2024/04/logo.png" alt="Logo" style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2f5aa6' }}>SISTEMA SKILL</span>
      </div>
    </Header>
  );
};

export default AppHeader;
