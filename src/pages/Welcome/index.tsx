import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Welcome: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Title level={2}>Bem-vindo ao Nosso App!</Title>
      <p>Faça login para acessar o conteúdo.</p>
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
    </div>
  );
};

export default Welcome;
