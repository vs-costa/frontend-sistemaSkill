import { useState } from 'react';
import { List, Select, Avatar } from 'antd';
import { ReusableButton } from '../ReusableButton';
import SkillLevelFormatter from '../../utils/SkillLevelFormatter';
import { UserSkill } from '../../types/Types';


const { Option } = Select;

interface UserSkillItemProps {
    userSkill: UserSkill;
    editMode: number | null;
    setEditMode: (id: number | null) => void;
    updateSkillLevel: (userSkill: UserSkill, level: string) => void;
    handleDeleteSkillModal: (userSkill: UserSkill) => void;
}

export function SkillList({
    userSkill,
    editMode,
    setEditMode,
    updateSkillLevel,
    handleDeleteSkillModal
}: UserSkillItemProps) {
    const [selectedLevel, setSelectedLevel] = useState(userSkill.level);

    return (
        <List.Item
            key={userSkill.usuarioId}
            actions={[
                editMode === userSkill.id ? (
                    <>
                        <Select
                            style={{ marginRight: '10px', marginTop: '10px' }}
                            defaultValue={userSkill.level}
                            onChange={(value) => setSelectedLevel(value)}
                        >
                            <Option value={"INICIANTE"}>Iniciante</Option>
                            <Option value={"INTERMEDIARIO"}>Intermediário</Option>
                            <Option value={"AVANCADO"}>Avançado</Option>
                        </Select>
                        <ReusableButton
                            onClick={() => {
                                updateSkillLevel(userSkill, selectedLevel);
                                setEditMode(null);
                            }}
                            text='Salvar'
                        />
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px', marginTop: '10px' }}>
                            <div><strong>Level: </strong><SkillLevelFormatter level={userSkill.level} /></div>
                            <ReusableButton
                                onClick={() => setEditMode(userSkill.id)}
                                text='Editar'
                                style={{ marginLeft: '8px' }}
                                type='default'
                            />
                        </div>
                    </>
                ),
                <ReusableButton
                    onClick={() => handleDeleteSkillModal(userSkill)}
                    text='Excluir'
                    type='default'
                    danger
                />,
            ]}
            style={{ marginBottom: '16px' }}
        >
            <List.Item.Meta
                avatar={<Avatar src={userSkill.skillImagem} size={64} />}
                title={userSkill.skillNome}
                description={userSkill.skillDescricao}
            />
        </List.Item>
    );
};



