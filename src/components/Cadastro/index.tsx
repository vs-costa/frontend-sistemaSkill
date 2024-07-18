import React from 'react';
import { Form, Input, Typography, message, notification } from 'antd';
import { api } from '../../api/AuthContext';
import { ReusableButton } from '../../components/ReusableButton';

const { Title } = Typography;

interface CadastroProps {
  onSwitchToLogin: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onSwitchToLogin }) => {
  const [form] = Form.useForm();

  const cadastrar = async (values: { email: string; senha: string }) => {
    try {
      await api.post('/systemUser/registro?email=' + values.email, {
        email: values.email,
        senha: values.senha,
      });

      notification.success({
        message: 'Cadastro realizado com sucesso!',
        description: 'Você será redirecionado para a página de login.',
      });
      form.resetFields();
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);

    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
      message.error('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div style={{ width: 300, borderRadius: 10, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.3)', padding: 20 }}>
      <Title level={2} style={{ color: '#003eb3', marginBottom: '20px', textAlign: 'center' }}>Cadastro</Title>
      <Form form={form} name="cadastro" initialValues={{ remember: true }} onFinish={cadastrar}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira seu email!' },
            { type: 'email', message: 'Por favor, insira um email válido!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="senha"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['senha']}
          rules={[
            { required: true, message: 'Por favor, confirme sua senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('senha') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('As senhas não correspondem');
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar Senha" />
        </Form.Item>

        <ReusableButton type="primary" text="Cadastrar" onClick={form.submit} style={{ width: '100%' }} />
      </Form>

      <ReusableButton text="Já possui cadastro? Faça login clicando aqui." onClick={onSwitchToLogin} type="link" style={{ width: '100%', marginTop: '10px' }} />
    </div>
  );
};

export default Cadastro;
