import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Checkbox, message } from 'antd';
import { useAuth } from '../../api/AuthContext';

const { Title } = Typography;

const Login: React.FC = () => {
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
      message.success('Login bem-sucedido');

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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}>
      <div style={{ width: 300, borderRadius: 10, boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.3)', padding: 20 }}>
      <Title level={2} style={{ color: '#003eb3', marginBottom: '20px', textAlign: 'center'}}>Login</Title>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Entrar
            </Button>
            <Link to="/cadastro">
              <Button type="link" style={{ width: '100%', marginTop: '10px' }}>
                Ainda não tem cadastro? Clique aqui!
              </Button>
            </Link>
          </Form.Item>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
      </div>
    </div>
  );
};

export default Login;
