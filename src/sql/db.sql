CREATE SCHEMA IF NOT EXISTS radiosnet AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS radiosnet.radios (
	id serial4 NOT NULL,
	nome text NULL,
	cidade text NULL,
	estado text NULL,
	regiao text NULL,
	pais text NULL,
	url text NULL,
	segmentos _text NULL,
	status int4 NULL,
	CONSTRAINT radios_pk PRIMARY KEY (id),
	CONSTRAINT radios_un UNIQUE (url)
);

CREATE TABLE IF NOT EXISTS radiosnet.logs (
	id bigserial NOT NULL,
	mensagem text NULL,
	tipo text NULL,
	horario timestamp without time zone NULL DEFAULT now(),    
	CONSTRAINT logs_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS radiosnet.status (
	id int NOT NULL,
	descricao text NULL,
	CONSTRAINT status_un UNIQUE (id)
);

INSERT INTO radiosnet.status (id, descricao) VALUES (1, 'Ativa') ON CONFLICT(id) DO NOTHING;
INSERT INTO radiosnet.status (id, descricao) VALUES (2, 'Arquivada') ON CONFLICT(id) DO NOTHING;
INSERT INTO radiosnet.status (id, descricao) VALUES (3, 'Pré-Cadastrada') ON CONFLICT(id) DO NOTHING;
INSERT INTO radiosnet.status (id, descricao) VALUES (4, 'Desativada') ON CONFLICT(id) DO NOTHING;