CREATE SCHEMA IF NOT EXISTS pandora_radio AUTHORIZATION pandora;

CREATE TABLE IF NOT EXISTS pandora_radio.radios (
	id serial4 NOT NULL,
	nome text NULL,
	cidade text NULL,
	estado text NULL,
	regiao text NULL,
	pais text NULL,
	url text NULL,
	segmentos _text NULL,
	CONSTRAINT radios_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pandora_radio.logs (
	id bigserial NOT NULL,
	mensagem text NULL,
	tipo text NULL,
	horario timestamp without time zone NULL DEFAULT now(),    
	CONSTRAINT logs_pk PRIMARY KEY (id)
);

CREATE TABLE pandora_radio.status (
	id int NOT NULL,
	descricao text NULL
);

INSERT INTO pandora_radio.status (id, descricao) VALUES (1, 'Ativa');
INSERT INTO pandora_radio.status (id, descricao) VALUES (2, 'Arquivada');
INSERT INTO pandora_radio.status (id, descricao) VALUES (3, 'Pré-Cadastrada');
INSERT INTO pandora_radio.status (id, descricao) VALUES (4, 'Desativada');