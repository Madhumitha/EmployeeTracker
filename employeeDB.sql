DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INTEGER,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INTEGER,
    title VARCHAR(30),
    salary DECIMAL(18,4),
    dept_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(dept_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER, 
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);