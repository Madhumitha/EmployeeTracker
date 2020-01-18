DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(18,4),
    dept_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,  
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY(manager_id) REFERENCES roles(id) ON DELETE CASCADE
);

INSERT INTO department(name) 
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles(title, salary, dept_id)
VALUES ('Sales Lead', '100000', 1),
       ('Salesperson', '80000', 1),
       ('Lead Engineer', '150000', 2),
       ('Software Engineer', '120000', 2),
       ('Accountant', '125000', 3),
       ('Legal Team Lead', '250000', 4),
       ('Lawyer', '190000', 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, 3), 
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 3, NULL),
       ('Kevin', 'Tupik', 4, 3),
        ('Malia', 'Brown', 5, NULL),
        ('Sarah', 'Lourd', 6, NULL),
        ('Tom', 'Allen',7, 6);


    

