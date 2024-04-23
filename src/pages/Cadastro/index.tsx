import React, { useState } from 'react';
import { Form, Input, Button, Typography, Modal, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/AuthContext';

const { Title } = Typography;

const Cadastro: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const cadastrar = async (values: { email: string; senha: string }) => {
    try {
      await api.post('/systemUser/registro?email=' + values.email, {
        email: values.email,
        senha: values.senha,
      });

      setModalVisible(true);
      form.resetFields();

      setTimeout(() => {
        setModalVisible(false);
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
      message.error('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}>
      <div style={{ width: 300, borderRadius: 10, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.3)', padding: 20 }}>
      <Title level={2} style={{ color: '#003eb3', marginBottom: '20px', textAlign: 'center'}}>Cadastro</Title>
        <Form
          form={form}
          name="cadastro"
          initialValues={{ remember: true }}
          onFinish={cadastrar}
        >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Cadastrar
            </Button>
          </Form.Item>
        </Form>

        <Modal
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          title={null}
          footer={null}
          centered
        >
          <div style={{ textAlign: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: 'green' }} />
            <p style={{ fontWeight: 'bold', marginTop: 16 }}>Cadastro realizado com sucesso!</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Cadastro;
