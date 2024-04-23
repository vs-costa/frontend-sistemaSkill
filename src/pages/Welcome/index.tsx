import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}>
      <div style={{ textAlign: 'center', padding: '50px', borderRadius: '10px' }}>
        <h1 style={{ color: '#003eb3' }}>Bem-vindo ao Sistema Skill!</h1>
        <p style={{ marginBottom: '30px' }}>Faça login para acessar o app.</p>
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
