import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>LOGO</span>
      <Button type="primary" size="large">
        <Link to="/login">Login</Link>
      </Button>
    </Header>
  );
};

export default AppHeader;
