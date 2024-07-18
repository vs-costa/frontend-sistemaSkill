import React, { useEffect, useState } from 'react';
import { Typography, List, Pagination, Input, Button } from 'antd';
import { useAuth } from '../../api/AuthContext';
import { api } from '../../api/AuthContext';
import { Skill, UserSkill } from '../../types/Types';
import { addSkill, updateSkillLevel, deleteSkill } from '../../utils/SkillActions';
import { AdicionarSkillModal } from '../../components/AdicionarSkillModal';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { ReusableButton } from '../../components/ReusableButton';
import LogoutButton from '../../components/LogoutButton';
import { SkillList } from '../../components/SkillList';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Home: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<UserSkill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string>('INICIANTE');
  const [editMode, setEditMode] = useState<number | null>(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(3);
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<'level' | 'skillNome'>('level');

  const { userId } = useAuth();

  // Listar todas as skills disponíveis
  useEffect(() => {
    api.get('/skill/listar')
      .then((response) => {
        if (Array.isArray(response.data.conteudo)) {
          setSkills(response.data.conteudo);
        } else {
          console.error("Erro: conteudo não é um array.");
        }
      }).catch(() => {
        console.log("Erro ao buscar skills");
      });
  }, []);

  // Listar skills do usuário atual
  useEffect(() => {
    if (userId) {
      api.get(`/usuarioSkill/listar/${userId}`)
        .then((response) => {
          setUserSkills(response.data.conteudo);
          setTotalItems(response.data.totalElementos);
        }).catch((e) => {
          console.log("Erro ao buscar Usuario Skill", e);
        });
    }
  }, [userId]);

  const addedSkillsIds = userSkills.map(userSkill => userSkill.skillId);

  // Função para adicionar uma nova skill ao usuário
  const handleSaveSkill = () => {
    addSkill(
      selectedSkill,
      selectedLevel,
      userId,
      setUserSkills,
      setSelectedSkill,
      setIsModalVisible,
      setTotalItems,
      setCurrentPage,
      currentPage,
      totalItems
    );
  };

  // Função para atualizar o nível de uma skill do usuário
  const handleUpdateSkillLevel = (userSkill: UserSkill, newLevel: string) => {
    updateSkillLevel(userSkill, newLevel, userSkills, setUserSkills);
  };

  // Função para abrir o modal de confirmação para deletar uma skill
  const handleDeleteSkillModal = (userSkill: UserSkill) => {
    setSkillToDelete(userSkill);
    setModalDelete(true);
  };

  // Função para deletar uma skill do usuário
  const handleDeleteSkill = () => {
    if (skillToDelete) {
      deleteSkill(
        skillToDelete,
        setUserSkills,
        setModalDelete,
        setSkillToDelete,
        currentPage,
        pageSize,
        setTotalItems,
        setCurrentPage,
        totalItems,
      );
    }
  };

  const locale = {
    emptyText: 'Nenhuma skill cadastrada.',
  };

  // Função para alternar a ordenação
  const handleRequestSort = (property: 'level' | 'skillNome') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Função para ordenar e filtrar as skills do usuário
  const sortedUserSkills = userSkills.slice()
    .sort((a, b) => {
      if (orderBy === 'level') {
        const levelA = parseFloat(a.level);
        const levelB = parseFloat(b.level);
        return (order === 'asc' ? levelA - levelB : levelB - levelA);
      } else {
        return (order === 'asc' ? a.skillNome.localeCompare(b.skillNome) : b.skillNome.localeCompare(a.skillNome));
      }
    })
    .filter(userSkill =>
      skillFilter === '' || userSkill.skillNome.toLowerCase().includes(skillFilter.toLowerCase())
    );

  // Paginação local dos dados
  const paginatedSkills = sortedUserSkills.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: '1', padding: '20px', marginBottom: '50px', marginTop: '50px' }}>
        <Title level={1} style={{ color: '#003eb3', marginBottom: '10px' }}>Skills</Title>

        <Input
          type="text"
          placeholder="Filtrar por nome da skill"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
        />

        <Button
          style={{ marginBottom: '10px' }}
          onClick={() => handleRequestSort('skillNome')}>
          Ordenar por Nome da Skill {orderBy === 'skillNome' && (
            order === 'asc' ? <UpOutlined /> : <DownOutlined />
          )}
        </Button>

        <List
          itemLayout="horizontal"
          dataSource={paginatedSkills}
          locale={locale}
          renderItem={(userSkill) => (
            <SkillList
              key={userSkill.id}
              userSkill={userSkill}
              editMode={editMode}
              setEditMode={setEditMode}
              updateSkillLevel={handleUpdateSkillLevel}
              handleDeleteSkillModal={handleDeleteSkillModal}
            />
          )}
        />

        <Pagination
          current={currentPage}
          total={sortedUserSkills.length}
          pageSize={pageSize}
          onChange={setCurrentPage}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />

        <ReusableButton
          text="Adicionar Skill"
          onClick={() => setIsModalVisible(true)}
          type="primary"
          style={{ marginTop: '20px' }}
        />

        <LogoutButton style={{ float: 'right', marginTop: '20px' }} />

        <AdicionarSkillModal
          visible={isModalVisible}
          skills={skills}
          selectedSkill={selectedSkill}
          selectedLevel={selectedLevel}
          addedSkillsIds={addedSkillsIds}
          onSkillChange={(value) => {
            const selectedSkill = skills.find(skill => skill.id === value);
            setSelectedSkill(selectedSkill);
          }}
          onLevelChange={(value: string) => setSelectedLevel(value)}
          onSave={handleSaveSkill}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedSkill(undefined);
            setSelectedLevel('INICIANTE');
          }}
        />

        <ConfirmDeleteModal
          visible={modalDelete}
          onConfirm={handleDeleteSkill}
          onCancel={() => setModalDelete(false)}
          message={`Tem certeza que deseja excluir a skill ${skillToDelete?.skillNome}?`}
        />
      </div>
    </div>
  );
};

export default Home;