export interface Skill {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
  }
  
  export interface UserSkill {
    id: number;
    level: string;
    usuarioId: number;
    skillId: number;
    skillNome: string;
    skillDescricao: string;
    skillImagem: string;
  }
  
  export interface PageResponse<T> {
    conteudo: T[];
    pagina: number;
    tamanhoPagina: number;
    totalElementos: number;
    totalPaginas: number;
    ultima: boolean;
    primeira: boolean;
  }