import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Typography, Checkbox, message } from 'antd';
import { useAuth } from '../../api/AuthContext';
import { ReusableButton } from '../../components/ReusableButton';

const { Title } = Typography;

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [rememberCredentials, setRememberCredentials] = useState(() => {
    const remember = localStorage.getItem('rememberCredentials');
    return remember ? JSON.parse(remember) : false;
  });

  useEffect(() => {
    localStorage.setItem('rememberCredentials', JSON.stringify(rememberCredentials));
  }, [rememberCredentials]);

  const [form] = Form.useForm();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      setLoading(false);
      message.success('Login bem-sucedido.');

      if (rememberCredentials) {
        localStorage.setItem('email', values.email);
        localStorage.setItem('password', values.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      navigate('/home');
    } catch (error) {
      setLoading(false);
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div style={{ width: '300px', borderRadius: '10px', boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.3)', padding: '20px' }}>
      <Title level={2} style={{ color: '#003eb3', marginBottom: '20px', textAlign: 'center' }}>Login</Title>
      <Form form={form} name="login" initialValues={{ remember: true }} onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
          initialValue={localStorage.getItem('email')}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          initialValue={localStorage.getItem('password')}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={rememberCredentials}
            onChange={(e) => setRememberCredentials(e.target.checked)}
          >
            Lembrar login e senha
          </Checkbox>
        </Form.Item>

        <ReusableButton text="Entrar" onClick={() => form.submit()} type="primary" style={{ width: '100%' }} />
        <ReusableButton text="Ainda não tem cadastro? Clique aqui!" onClick={onSwitchToRegister} type="link" style={{ width: '100%', marginTop: '10px' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
    </div>
  );
};

export default Login;
