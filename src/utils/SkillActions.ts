import { message } from 'antd';
import { api } from '../api/AuthContext';
import { Skill, UserSkill } from '../types/Types';

export const addSkill = (
  selectedSkill: Skill | undefined,
  selectedLevel: string,
  userId: number | null,
  setUserSkills: React.Dispatch<React.SetStateAction<UserSkill[]>>,
  setSelectedSkill: React.Dispatch<React.SetStateAction<Skill | undefined>>,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number,
  totalItems: number,
) => {
  if (!selectedSkill) {
    console.error('Nenhuma skill selecionada');
    message.error('Nenhuma skill selecionada. Por favor, escolha pelo menos uma skill.');
    return;
  }

  const userSkillData = {
    usuarioId: userId,
    skillId: selectedSkill.id,
    level: selectedLevel
  };

  api.post('/usuarioSkill/salvar', userSkillData)
   .then(response => {
      console.log('Nova habilidade de usuário salva com sucesso:', response.data);
      message.success('Nova skill adicionada com sucesso!');

      const newTotalItems = totalItems + 1;

      setUserSkills(prevUserSkills => [...prevUserSkills, response.data]);
      setTotalItems(newTotalItems);
      setCurrentPage(currentPage);
      setSelectedSkill(undefined);
      setIsModalVisible(false);
    })
   .catch(error => {
      console.error('Erro ao salvar nova habilidade de usuário:', error);
      message.error('Erro ao adicionar nova skill. Tente novamente.');
    });
};



export const updateSkillLevel = (
  userSkill: UserSkill,
  newLevel: string,
  userSkills: UserSkill[],
  setUserSkills: React.Dispatch<React.SetStateAction<UserSkill[]>>
) => {
  if (!newLevel || !['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'].includes(newLevel)) {
    console.error('Nível de habilidade não é válido');
    message.error('O level da skill selecionado não é válido.');
    return;
  }

  api.put(`/usuarioSkill/atualizar/${userSkill.id}`, { level: newLevel })
    .then((response) => {
      console.log('Nível de habilidade atualizado com sucesso:', response.data);
      message.success('Level da skill atualizado com sucesso');
      setUserSkills(userSkills.map(skill => skill.id === userSkill.id ? { ...skill, level: newLevel } : skill));
    })
    .catch((error) => {
      console.error('Erro ao atualizar o nível de habilidade:', error);
      message.error('Erro ao atualizar o level da Skill. Tente novamente.');
    });
};

export const deleteSkill = (
  skillToDelete: UserSkill | null,
  setUserSkills: React.Dispatch<React.SetStateAction<UserSkill[]>>,
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setSkillToDelete: React.Dispatch<React.SetStateAction<UserSkill | null>>,
  currentPage: number,
  pageSize: number,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  totalItems: number, // Adicione este argumento
) => {
  if (!skillToDelete) return;

  api.delete(`/usuarioSkill/excluir/${skillToDelete.id}`)
    .then(response => {
      console.log('Habilidade de usuário deletada com sucesso:', response.data);
      message.success('Skill deletada com sucesso!');
      
      // Atualiza o total de itens
      const newTotalItems = totalItems - 1;
      setTotalItems(newTotalItems);

      // Atualiza a lista de skills removendo a skill deletada
      setUserSkills(prevUserSkills => {
        const updatedSkills = prevUserSkills.filter(skill => skill.id !== skillToDelete.id);
        
        // Calcula o novo número total de páginas
        const newTotalPages = Math.ceil(newTotalItems / pageSize);

        // Se a página atual for maior que o número total de páginas, ajusta para a última página disponível
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }

        return updatedSkills;
      });

      // Fecha o modal de confirmação e limpa a skillToDelete
      setModalDelete(false);
      setSkillToDelete(null);
    })
    .catch(error => {
      console.error('Erro ao deletar habilidade de usuário:', error);
      message.error('Erro ao deletar skill. Tente novamente.');
    });
};