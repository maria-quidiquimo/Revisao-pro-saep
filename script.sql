CREATE DATABASE IF NOT EXISTS oficina_db;
USE oficina_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    cliente_id INT NOT NULL,
    CONSTRAINT fk_veiculo_cliente 
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_agendamento DATETIME NOT NULL,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'Pendente',
    veiculo_id INT NOT NULL,
    CONSTRAINT fk_agendamento_veiculo 
        FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO clientes (nome, cpf, telefone, email) VALUES
('Carlos Eduardo Silva', '12345678901', '(11) 98765-4321', 'carlos.silva@email.com'),
('Mariana Souza Lima', '98765432100', '(11) 91234-5678', 'mariana.lima@email.com'),
('Roberto Alves Rocha', '45678912304', '(11) 95555-4444', 'roberto.rocha@email.com');

INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) VALUES
('ABC-1234', 'Civic', 'Honda', 2020, 1),
('XYZ-5678', 'Corolla', 'Toyota', 2021, 2),
('JKL-9012', 'Onix', 'Chevrolet', 2019, 3);

INSERT INTO agendamentos (data_agendamento, descricao, status, veiculo_id) VALUES
('2026-03-10 09:00:00', 'Troca de oleo e filtro de combustivel', 'Pendente', 1),
('2026-03-11 14:30:00', 'Revisao dos freios e alinhamento', 'Pendente', 2),
('2026-03-12 10:15:00', 'Troca de pastilhas e amortecedores', 'Pendente', 3);