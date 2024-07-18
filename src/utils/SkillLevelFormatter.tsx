import React from 'react';

interface SkillLevelFormatterProps {
  level: string;
}

const SkillLevelFormatter: React.FC<SkillLevelFormatterProps> = ({ level }) => {
  switch (level) {
    case "INICIANTE":
      return <span>Iniciante</span>;
    case "INTERMEDIARIO":
      return <span>Intermediário</span>;
    case "AVANCADO":
      return <span>Avançado</span>;
    default:
      return <span>{level}</span>;
  }
};

export default SkillLevelFormatter;