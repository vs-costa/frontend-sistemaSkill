import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
      © {new Date().getFullYear()} Victor Soares - Todos os direitos reservados
    </Footer>
  );
};

export default AppFooter;
