CREATE TABLE IF NOT EXISTS radios (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT NULL,
	cidade TEXT NULL,
	estado TEXT NULL,
	regiao TEXT NULL,
	pais TEXT NULL,
	url TEXT NULL,
	segmentos TEXT NULL,
	status INTEGER NULL,
	UNIQUE (url)
);

CREATE TABLE IF NOT EXISTS logs (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	horario DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	tipo TEXT NULL,
	mensagem TEXT NULL
);

CREATE TABLE IF NOT EXISTS status (
	id INTEGER NOT NULL,
	descricao TEXT NULL,
	UNIQUE (id)
);

INSERT OR IGNORE INTO status (id, descricao) VALUES (1, 'Ativa');
INSERT OR IGNORE INTO status (id, descricao) VALUES (2, 'Arquivada');
INSERT OR IGNORE INTO status (id, descricao) VALUES (3, 'Pré-Cadastrada');
INSERT OR IGNORE INTO status (id, descricao) VALUES (4, 'Desativada');