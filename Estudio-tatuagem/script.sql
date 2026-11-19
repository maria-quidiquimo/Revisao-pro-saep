CREATE DATABASE IF NOT EXISTS tatoo_db;
USE tatoo_db;

-- Tabela de Usuários (Tatuadores / Recepção)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Clientes (CPF armazenado criptografado)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf_criptografado VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100)
);

-- Tabela de Projetos de Tatuagem (Associados a um Cliente)
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    local_corpo VARCHAR(50) NOT NULL,
    valor_estimado DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Tabela de Sessões / Agendamentos (Associadas a um Projeto)
CREATE TABLE sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projeto_id INT NOT NULL,
    data_sessao DATE NOT NULL,
    horario TIME NOT NULL,
    status VARCHAR(30) DEFAULT 'Agendada',
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);

-- ==========================================================
-- POPULAÇÃO INICIAL (Mínimo de 3 registros por tabela)
-- ==========================================================

-- Senha padrão dos usuários abaixo: "123456" (em texto plano apenas para facilitar seus testes iniciais)
INSERT INTO usuarios (nome, email, senha) VALUES 
('Lucas Tattoo', 'lucas@estudio.com', '123456'),
('Mariana Arte', 'mariana@estudio.com', '123456'),
('Admin Recepção', 'admin@estudio.com', '123456');

-- Os CPFs abaixo estão criptografados usando a chave secreta configurada no server.js
INSERT INTO clientes (nome, cpf_criptografado, telefone, email) VALUES 
('Carlos Eduardo Silva', '9f86d081884c7d659a2feaa0c55ad015:a1b2c3d4e5f60718293a4b5c6d7e8f90', '(11) 98765-4321', 'carlos@email.com'),
('Fernanda Lima Souza', '9f86d081884c7d659a2feaa0c55ad015:b2c3d4e5f60718293a4b5c6d7e8f90a1', '(11) 91234-5678', 'fernanda@email.com'),
('Rafael Mendes Costa', '9f86d081884c7d659a2feaa0c55ad015:c3d4e5f60718293a4b5c6d7e8f90a1b2', '(11) 99988-7766', 'rafael@email.com');

INSERT INTO projetos (cliente_id, titulo, descricao, local_corpo, valor_estimado) VALUES 
(1, 'Dragão Oriental', 'Fechamento de braço estilo irezumi colorido', 'Braço Direito', 2500.00),
(2, 'Rosa Minimalista', 'Traço fino (fineline) sombreado', 'Antebraço Esquerdo', 450.00),
(3, 'Leão Geométrico', 'Realismo misturado com formas geométricas', 'Costas', 1800.00);

INSERT INTO sessoes (projeto_id, data_sessao, horario, status) VALUES 
(1 , '2026-11-25', '14:00:00', 'Agendada'),
(2, '2026-11-22', '10:00:00', 'Agendada'),
(3, '2026-11-28', '16:30:00', 'Agendada');