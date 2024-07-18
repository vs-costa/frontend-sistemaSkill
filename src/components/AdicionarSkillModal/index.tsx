import { Modal, Select } from "antd";
import { Skill } from "../../types/Types";

const { Option } = Select;

interface AdicionarSkillModalProps {
    visible: boolean;
    skills: Skill[];
    selectedSkill: Skill | undefined;
    selectedLevel: string;
    addedSkillsIds: number[]; // Supondo que esta propriedade contenha os IDs das skills já adicionadas
    onSkillChange: (value: number) => void;
    onLevelChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function AdicionarSkillModal({
    visible,
    skills,
    selectedSkill,
    selectedLevel,
    addedSkillsIds,
    onSkillChange,
    onLevelChange,
    onSave,
    onCancel,
}: AdicionarSkillModalProps) {
    return (
        <Modal
            title="Adicionar Skill"
            open={visible}
            onOk={onSave}
            onCancel={onCancel}
            okText="Salvar"
            cancelText="Cancelar"
        >
            <Select
                placeholder="Selecione a Skill"
                value={selectedSkill ? selectedSkill.id : undefined}
                onChange={onSkillChange}
                style={{ width: '100%', marginTop: '10px' }}
            >
                {/* Filtrando as skills que ainda não foram adicionadas */}
                {skills.filter(skill => !addedSkillsIds.includes(skill.id)).map(filteredSkill => (
                    <Option key={filteredSkill.id} value={filteredSkill.id}>{filteredSkill.nome}</Option>
                ))}
            </Select>
            <Select
                defaultValue="INICIANTE"
                style={{ width: '100%', marginTop: '10px' }}
                onChange={onLevelChange}
                value={selectedLevel}
            >
                <Option value="INICIANTE">Iniciante</Option>
                <Option value="INTERMEDIARIO">Intermediário</Option>
                <Option value="AVANCADO">Avançado</Option>
            </Select>
        </Modal>
    );
}
