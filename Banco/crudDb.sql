# Criação do Banco
CREATE DATABASE crudDb;

# Inicialização do Banco
USE crudDB;

# Tabela de Usuário
CREATE TABLE users_tbl (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    user_password VARCHAR(45) NOT NULL
);