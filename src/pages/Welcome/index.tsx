import React, { useState } from 'react';
import Login from '../../components/Login'; 
import Cadastro from '../../components/Cadastro';

const WelcomePage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: '50px', borderRadius: '10px' }}>
          <h1 style={{ color: '#003eb3' }}>Bem-vindo ao Sistema Skill!</h1>
          <p style={{ marginBottom: '30px' }}>Faça login para acessar o app.</p>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isLogin ? <Login onSwitchToRegister={switchToRegister} /> : <Cadastro onSwitchToLogin={switchToLogin} />}
      </div>
    </div>
  );
};

export default WelcomePage;
