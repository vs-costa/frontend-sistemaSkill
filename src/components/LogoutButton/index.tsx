import React from 'react';
import { Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/AuthContext';

interface LogoutButtonProps {
  style?: object;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ style }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    notification.success({
      message: 'Logout realizado com sucesso!',
      description: 'Você foi desconectado da aplicação.',
    });
    navigate('/');
  };

  return (
    <Button
      type="link"
      onClick={handleLogout}
      style={style}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
