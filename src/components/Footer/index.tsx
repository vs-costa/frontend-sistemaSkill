import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#001d66', color: '#fff', lineHeight: '1px', height: '1px' }}>
      <span style={{ verticalAlign: 'middle' }}>© {new Date().getFullYear()} Victor Soares - Todos os direitos reservados</span>
    </Footer>
  );
};

export default AppFooter;
