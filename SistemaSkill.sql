SELECT id, "name"
FROM public.tb_roles;
SELECT id_skill, ativa_skill, descricao_skill, imagem_skill, nome_skill
FROM public.tb_skill;
SELECT id_system_user, email, senha
FROM public.tb_system_user;
SELECT id_usuario, ativo_usuario, email_usuario, senha_usuario, system_user_id
FROM public.tb_usuario;
SELECT id_usuario_skill, "level", skill_id, usuario_id
FROM public.tb_usuario_skill;
SELECT usuario_id, role_id
FROM public.usuario_role;

INSERT INTO public.tb_roles
(id, "name")
VALUES(nextval('tb_roles_id_seq'::regclass), '');
INSERT INTO public.tb_skill
(id_skill, ativa_skill, descricao_skill, imagem_skill, nome_skill)
VALUES(nextval('tb_skill_id_skill_seq'::regclass), false, '', '', '');
INSERT INTO public.tb_system_user
(id_system_user, email, senha)
VALUES(nextval('tb_system_user_id_system_user_seq'::regclass), '', '');
INSERT INTO public.tb_usuario
(id_usuario, ativo_usuario, email_usuario, senha_usuario, system_user_id)
VALUES(nextval('tb_usuario_id_usuario_seq'::regclass), false, '', '', 0);
INSERT INTO public.tb_usuario_skill
(id_usuario_skill, "level", skill_id, usuario_id)
VALUES(0, 0, 0, 0);
INSERT INTO public.usuario_role
(usuario_id, role_id)
VALUES(0, 0);

UPDATE public.tb_roles
SET "name"=''
WHERE id=nextval('tb_roles_id_seq'::regclass);
UPDATE public.tb_skill
SET ativa_skill=false, descricao_skill='', imagem_skill='', nome_skill=''
WHERE id_skill=nextval('tb_skill_id_skill_seq'::regclass);
UPDATE public.tb_system_user
SET email='', senha=''
WHERE id_system_user=nextval('tb_system_user_id_system_user_seq'::regclass);
UPDATE public.tb_usuario
SET id_usuario=nextval('tb_usuario_id_usuario_seq'::regclass), ativo_usuario=false, senha_usuario='', system_user_id=0
WHERE email_usuario='';
UPDATE public.tb_usuario_skill
SET "level"=0, skill_id=0, usuario_id=0
WHERE id_usuario_skill=0;
UPDATE public.usuario_role
SET 
WHERE usuario_id=0 AND role_id=0;

DELETE FROM public.tb_roles
WHERE id=nextval('tb_roles_id_seq'::regclass);
DELETE FROM public.tb_skill
WHERE id_skill=nextval('tb_skill_id_skill_seq'::regclass);
DELETE FROM public.tb_system_user
WHERE id_system_user=nextval('tb_system_user_id_system_user_seq'::regclass);
DELETE FROM public.tb_usuario
WHERE email_usuario='';
DELETE FROM public.tb_usuario_skill
WHERE id_usuario_skill=0;
DELETE FROM public.usuario_role
WHERE usuario_id=0 AND role_id=0;

MERGE INTO public.tb_roles AS tgt
USING SOURCE_TABLE AS src
ON (tgt.id=src.id)
WHEN MATCHED
THEN UPDATE SET
tgt."name"=src."name"
WHEN NOT MATCHED
THEN INSERT ("name")
VALUES (src."name");
MERGE INTO public.tb_skill AS tgt
USING SOURCE_TABLE AS src
ON (tgt.id_skill=src.id_skill)
WHEN MATCHED
THEN UPDATE SET
tgt.ativa_skill=src.ativa_skill, tgt.descricao_skill=src.descricao_skill, tgt.imagem_skill=src.imagem_skill, tgt.nome_skill=src.nome_skill
WHEN NOT MATCHED
THEN INSERT (ativa_skill, descricao_skill, imagem_skill, nome_skill)
VALUES (src.ativa_skill, src.descricao_skill, src.imagem_skill, src.nome_skill);
MERGE INTO public.tb_system_user AS tgt
USING SOURCE_TABLE AS src
ON (tgt.id_system_user=src.id_system_user)
WHEN MATCHED
THEN UPDATE SET
tgt.email=src.email, tgt.senha=src.senha
WHEN NOT MATCHED
THEN INSERT (email, senha)
VALUES (src.email, src.senha);
MERGE INTO public.tb_usuario AS tgt
USING SOURCE_TABLE AS src
ON (tgt.email_usuario=src.email_usuario)
WHEN MATCHED
THEN UPDATE SET
tgt.ativo_usuario=src.ativo_usuario, tgt.senha_usuario=src.senha_usuario, tgt.system_user_id=src.system_user_id
WHEN NOT MATCHED
THEN INSERT (ativo_usuario, email_usuario, senha_usuario, system_user_id)
VALUES (src.ativo_usuario, src.email_usuario, src.senha_usuario, src.system_user_id);
MERGE INTO public.tb_usuario_skill AS tgt
USING SOURCE_TABLE AS src
ON (tgt.id_usuario_skill=src.id_usuario_skill)
WHEN MATCHED
THEN UPDATE SET
tgt."level"=src."level", tgt.skill_id=src.skill_id, tgt.usuario_id=src.usuario_id
WHEN NOT MATCHED
THEN INSERT (id_usuario_skill, "level", skill_id, usuario_id)
VALUES (src.id_usuario_skill, src."level", src.skill_id, src.usuario_id);
MERGE INTO public.usuario_role AS tgt
USING SOURCE_TABLE AS src
ON (tgt.usuario_id=src.usuario_id AND tgt.role_id=src.role_id)
WHEN MATCHED
THEN UPDATE SET

WHEN NOT MATCHED
THEN INSERT (usuario_id, role_id)
VALUES (src.usuario_id, src.role_id);

SELECT tb_roles.*, tb_skill.*, tb_system_user.*, tb_usuario.*, tb_usuario_skill.*, usuario_role.*
FROM public.tb_roles tb_roles, public.tb_skill tb_skill, public.tb_system_user tb_system_user, public.tb_usuario tb_usuario, public.tb_usuario_skill tb_usuario_skill, public.usuario_role usuario_role
WHERE 
-- Can't determine condition to join table tb_skill
-- Can't determine condition to join table tb_system_user
	tb_usuario.system_user_id = tb_system_user.id_system_user
	AND tb_usuario_skill.skill_id = tb_skill.id_skill
	AND usuario_role.role_id = tb_roles.id
	
INSERT INTO public.tb_roles
("name")
SELECT src."name"
FROM SOURCE_TABLE AS src
ON CONFLICT (id)
/* or you may use [DO NOTHING;] */
DO UPDATE 
SET "name"=EXCLUDED."name";
INSERT INTO public.tb_skill
(ativa_skill, descricao_skill, imagem_skill, nome_skill)
SELECT src.ativa_skill, src.descricao_skill, src.imagem_skill, src.nome_skill
FROM SOURCE_TABLE AS src
ON CONFLICT (id_skill)
/* or you may use [DO NOTHING;] */
DO UPDATE 
SET ativa_skill=EXCLUDED.ativa_skill, descricao_skill=EXCLUDED.descricao_skill, imagem_skill=EXCLUDED.imagem_skill, nome_skill=EXCLUDED.nome_skill;
INSERT INTO public.tb_system_user
(email, senha)
SELECT src.email, src.senha
FROM SOURCE_TABLE AS src
ON CONFLICT (id_system_user)
/* or you may use [DO NOTHING;] */
DO UPDATE 
SET email=EXCLUDED.email, senha=EXCLUDED.senha;
INSERT INTO public.tb_usuario
(ativo_usuario, email_usuario, senha_usuario, system_user_id)
SELECT src.ativo_usuario, src.email_usuario, src.senha_usuario, src.system_user_id
FROM SOURCE_TABLE AS src
ON CONFLICT (email_usuario)
/* or you may use [DO NOTHING;] */
DO UPDATE 
SET id_usuario=EXCLUDED.id_usuario, ativo_usuario=EXCLUDED.ativo_usuario, senha_usuario=EXCLUDED.senha_usuario, system_user_id=EXCLUDED.system_user_id;
INSERT INTO public.tb_usuario_skill
(id_usuario_skill, "level", skill_id, usuario_id)
SELECT src.id_usuario_skill, src."level", src.skill_id, src.usuario_id
FROM SOURCE_TABLE AS src
ON CONFLICT (id_usuario_skill)
/* or you may use [DO NOTHING;] */
DO UPDATE 
SET "level"=EXCLUDED."level", skill_id=EXCLUDED.skill_id, usuario_id=EXCLUDED.usuario_id;
INSERT INTO public.usuario_role
(usuario_id, role_id)
SELECT src.usuario_id, src.role_id
FROM SOURCE_TABLE AS src
ON CONFLICT (usuario_id, role_id)
/* or you may use [DO NOTHING;] */
DO UPDATE 
SET ;

UPDATE public.tb_roles AS tgt
SET "name"=src."name"
FROM SOURCE_TABLE AS src
WHERE tgt.id=src.id;
UPDATE public.tb_skill AS tgt
SET ativa_skill=src.ativa_skill, descricao_skill=src.descricao_skill, imagem_skill=src.imagem_skill, nome_skill=src.nome_skill
FROM SOURCE_TABLE AS src
WHERE tgt.id_skill=src.id_skill;
UPDATE public.tb_system_user AS tgt
SET email=src.email, senha=src.senha
FROM SOURCE_TABLE AS src
WHERE tgt.id_system_user=src.id_system_user;
UPDATE public.tb_usuario AS tgt
SET id_usuario=src.id_usuario, ativo_usuario=src.ativo_usuario, senha_usuario=src.senha_usuario, system_user_id=src.system_user_id
FROM SOURCE_TABLE AS src
WHERE tgt.email_usuario=src.email_usuario;
UPDATE public.tb_usuario_skill AS tgt
SET "level"=src."level", skill_id=src.skill_id, usuario_id=src.usuario_id
FROM SOURCE_TABLE AS src
WHERE tgt.id_usuario_skill=src.id_usuario_skill;
UPDATE public.usuario_role AS tgt
SET 
FROM SOURCE_TABLE AS src
WHERE tgt.usuario_id=src.usuario_id AND tgt.role_id=src.role_id;

DELETE FROM public.tb_roles AS tgt
USING SOURCE_TABLE AS src
WHERE tgt.id=src.id;
DELETE FROM public.tb_skill AS tgt
USING SOURCE_TABLE AS src
WHERE tgt.id_skill=src.id_skill;
DELETE FROM public.tb_system_user AS tgt
USING SOURCE_TABLE AS src
WHERE tgt.id_system_user=src.id_system_user;
DELETE FROM public.tb_usuario AS tgt
USING SOURCE_TABLE AS src
WHERE tgt.email_usuario=src.email_usuario;
DELETE FROM public.tb_usuario_skill AS tgt
USING SOURCE_TABLE AS src
WHERE tgt.id_usuario_skill=src.id_usuario_skill;
DELETE FROM public.usuario_role AS tgt
USING SOURCE_TABLE AS src
WHERE tgt.usuario_id=src.usuario_id AND tgt.role_id=src.role_id;

-- public.tb_roles definition

-- Drop table

-- DROP TABLE public.tb_roles;

CREATE TABLE public.tb_roles (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT tb_roles_pkey PRIMARY KEY (id)
);


-- public.tb_skill definition

-- Drop table

-- DROP TABLE public.tb_skill;

CREATE TABLE public.tb_skill (
	id_skill bigserial NOT NULL,
	ativa_skill bool NULL,
	descricao_skill varchar(255) NOT NULL,
	imagem_skill varchar(255) NOT NULL,
	nome_skill varchar(255) NOT NULL,
	CONSTRAINT tb_skill_pkey PRIMARY KEY (id_skill)
);


-- public.tb_system_user definition

-- Drop table

-- DROP TABLE public.tb_system_user;

CREATE TABLE public.tb_system_user (
	id_system_user bigserial NOT NULL,
	email varchar(255) NOT NULL,
	senha varchar(255) NULL,
	CONSTRAINT tb_system_user_pkey PRIMARY KEY (id_system_user)
);


-- public.tb_usuario definition

-- Drop table

-- DROP TABLE public.tb_usuario;

CREATE TABLE public.tb_usuario (
	id_usuario bigserial NOT NULL,
	ativo_usuario bool NOT NULL,
	email_usuario varchar(255) NOT NULL,
	senha_usuario varchar(255) NOT NULL,
	system_user_id int8 NULL,
	CONSTRAINT tb_usuario_pkey PRIMARY KEY (id_usuario),
	CONSTRAINT uk_fudv57wn1m68hm816yebp0sai UNIQUE (email_usuario),
	CONSTRAINT fkslhgt6bbyffbl4ppe6wuujnp8 FOREIGN KEY (system_user_id) REFERENCES public.tb_system_user(id_system_user)
);


-- public.tb_usuario_skill definition

-- Drop table

-- DROP TABLE public.tb_usuario_skill;

CREATE TABLE public.tb_usuario_skill (
	id_usuario_skill int8 NOT NULL,
	"level" int4 NOT NULL,
	skill_id int8 NULL,
	usuario_id int8 NULL,
	CONSTRAINT tb_usuario_skill_pkey PRIMARY KEY (id_usuario_skill),
	CONSTRAINT fk8ccjwdmabwdim81c9ocd58mtf FOREIGN KEY (skill_id) REFERENCES public.tb_skill(id_skill),
	CONSTRAINT fkshh7arkbo9st3q85o5dunhd0y FOREIGN KEY (usuario_id) REFERENCES public.tb_usuario(id_usuario)
);


-- public.usuario_role definition

-- Drop table

-- DROP TABLE public.usuario_role;

CREATE TABLE public.usuario_role (
	usuario_id int8 NOT NULL,
	role_id int8 NOT NULL,
	CONSTRAINT usuario_role_pkey PRIMARY KEY (usuario_id, role_id),
	CONSTRAINT fkdtltqlxfti9bhlp8lpmfmshpx FOREIGN KEY (role_id) REFERENCES public.tb_roles(id),
	CONSTRAINT fke5sh1ttqyms288h7a419uhbhd FOREIGN KEY (usuario_id) REFERENCES public.tb_system_user(id_system_user)
);