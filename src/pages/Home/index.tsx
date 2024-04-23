import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Typography, List, Avatar, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { api, useAuth } from '../../api/AuthContext';

const { Title } = Typography;
const { Option } = Select;

interface Skill {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

interface UserSkill {
  id: number;
  level: string;
  usuarioId: number;
  skillId: number;
  skillNome: string;
  skillDescricao: string;
  skillImagem: string;
}


const Home: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string>('INICIANTE');
  const [editMode, setEditMode] = useState<number | null>(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const { userId } = useAuth();


  //listarSkills
  useEffect(() => {
    api.get('/skill/listar')
      .then((response) => {
        setSkills(response.data);
        console.log(response.data);
      }).catch(() => {
        console.log("Erro ao buscar skills");
      })
  }, [])

  //Listar Usuario Skill
  useEffect(() => {
    // Verifica se o usuário está autenticado antes de fazer a requisição
    if (userId) {
      console.log(userId)
      api.get(`/usuarioSkill/listar/${userId}`)
        .then((response) => {
          setUserSkills(response.data);
          console.log(response.data);
        }).catch((e) => {
          console.log("Erro ao buscar Usuario Skill", e);
        });
    }
  }, [userId]);



  // Função para abrir modal
  const handleAddSkill = () => {
    setIsModalVisible(true);
  };


  // Função para fazer logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveSkill = () => {

    if (!selectedSkill) {
      console.error('Nenhuma skill selecionada');
      return;
    }
  
    // Cria o novo objeto de habilidade de usuário com as informações selecionadas
    const newUserSkill = {
      level: selectedLevel,
      skillId: skills.find(skill => skill.nome === selectedSkill)?.id || 0,
      usuarioId: userId || 0,
    };
  
    // Faz a chamada à API para salvar a nova habilidade de usuário
    api.post('/usuarioSkill/salvar', newUserSkill)
      .then(response => {
        console.log('Habilidade de usuário salva com sucesso:', response.data);
        // Atualiza a lista de habilidades de usuário após adicionar uma nova
        setUserSkills([...userSkills, response.data]);
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('Erro ao salvar habilidade de usuário:', error);
      });
  };


  // Função para atualizar o nível de skill
  const updateSkillLevel = (userSkill: UserSkill, newLevel: string) => {
    // Verifica se o novo nível é uma string válida
    if (!newLevel || !['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'].includes(newLevel)) {
      console.error('Nível de habilidade não é válido');
      return;
    }

    // Faz a chamada da API com os valores corretos
    api.put(`/usuarioSkill/atualizar/${userSkill.id}`, { level: newLevel })
      .then((response) => {
        console.log('Nível de habilidade atualizado com sucesso:', response.data);
        // Atualiza a lista de habilidades do usuário após a edição
        setUserSkills(userSkills.map(skill => skill.id === userSkill.id ? { ...skill, level: newLevel } : skill));
      })
      .catch((error) => {
        console.error('Erro ao atualizar o nível de habilidade:', error);
      });
  };

  const handleDeleteSkill = (userSkill: UserSkill) => {
    api.delete(`/usuarioSkill/excluir/${userSkill.id}`)
      .then(() => {
        console.log('Habilidade de usuário excluída com sucesso');
        // Atualiza a lista de habilidades do usuário após a exclusão
        setUserSkills(userSkills.filter(skill => skill.id !== userSkill.id));
      })
      .catch((error) => {
        console.error('Erro ao excluir habilidade de usuário:', error);
      });
  };


  function formatSkillLevel(level: string) {
    switch (level) {
      case "INICIANTE":
        return "Iniciante";
      case "INTERMEDIARIO":
        return "Intermediário";
      case "AVANCADO":
        return "Avançado";
      default:
        return level;
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Skills</Title>

      {skills.length === 0 ? (
        <p>Nenhuma skill cadastrada.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={userSkills}
          renderItem={(userSkill) => (
            <List.Item
              actions={[
                editMode === userSkill.id ? (
                  <>
                    <Select
                      style={{ marginRight: '10px' }}
                      defaultValue={userSkill.level}
                      onChange={(value) => setSelectedLevel(value)}
                    >
                      <Option value={"INICIANTE"}>Iniciante</Option>
                      <Option value={"INTERMEDIARIO"}>Intermediário</Option>
                      <Option value={"AVANCADO"}>Avançado</Option>
                    </Select>
                    <Button
                      onClick={() => {
                        // Chama a função de atualização de habilidade com os parâmetros necessários
                        updateSkillLevel(userSkill, selectedLevel); // Passa apenas o ID
                        setEditMode(null);
                      }}
                    >
                      Salvar
                    </Button>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div><strong>Level: </strong>{formatSkillLevel(userSkill.level)}</div>
                      <Button onClick={() => setEditMode(userSkill.id)} style={{ marginLeft: '8px' }}>Editar</Button>
                    </div>
                  </>
                ),
                <Button danger onClick={() => handleDeleteSkill(userSkill)}>Excluir</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={userSkill.skillImagem} size={64} />}
                title={userSkill.skillNome}
                description={userSkill.skillDescricao}
              />
            </List.Item>
          )}
        />
      )}

      <Button type="primary" onClick={handleAddSkill} style={{ marginTop: '20px' }}>
        Adicionar Skill
      </Button>

      <Button type="link" style={{ float: 'right', marginTop: '20px' }} onClick={handleLogout}>
        Logout
      </Button>

      <Modal
        title="Adicionar Skill"
        open={isModalVisible}
        onOk={handleSaveSkill}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedSkill(undefined);
          setSelectedLevel('INICIANTE');
        }}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Select
          placeholder="Selecione uma skill"
          style={{ width: '100%' }}
          onChange={(value: string) => setSelectedSkill(value)}
          value={selectedSkill} // Adiciona o valor selecionado ao campo
        >
          {skills.map(skill => (
            <Option key={skill.id} value={skill.nome}>
              {skill.nome}
            </Option>
          ))}
        </Select>
        <Select
          defaultValue="INICIANTE"
          style={{ width: '100%', marginTop: '10px' }}
          onChange={(value: string) => setSelectedLevel(value)}
          value={selectedLevel} // Adiciona o valor selecionado ao campo
        >
          <Option value="INICIANTE">Iniciante</Option>
          <Option value="INTERMEDIARIO">Intermediário</Option>
          <Option value="AVANCADO">Avançado</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Home;
