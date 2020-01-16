const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Queries 

let queryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, " ", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id';
let deptQueryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, "", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id ORDER BY dept_id';
let manQueryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, "", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id WHERE employee.manager_id IS NOT NULL';


const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
});

db.connect(function(err){
    if(err)
        throw err;
    
    promptUser();
})

// Prompt an user for information 

function promptUser() {
     inquirer.prompt(
        {
            type: 'list',
            name: 'test',
            message: 'What would you like to do?',
            choices : ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'End']
        })
        .then(function(answers)
        {
           if(answers.test === 'View All Employees') {
               viewAllEmp();
           }
           else if(answers.test === 'View All Employees by Department') {
               viewAllEmpByDep();
           }
           else if(answers.test === 'View All Employees by Manager') {
               viewAllEmpByMan();
           }
           else if(answers.test === 'Add Employee') {
               addEmployee();
           }
           else if(answers.test === 'Remove Employee') {
               removeEmployee();
           }
           else if(answers.test === 'Update Employee Role') {
               updateEmployeeRole();
           }
           else if(answers.test === 'Update Employee Manager') {
               updateEmployeeManager();
           }
           else if(answers.test === 'End') {
               db.end();
           }
        })
}

function viewAllEmp() {
    db.query(
        queryString, function(err, rows, fields) {
            if(err) throw err;

                console.clear();
                console.table(rows);

            console.log('Woah!! After all I can view all employees data');
            console.log("\n");
            // re-prompt the user
            promptUser();
        }
    );
}

function viewAllEmpByDep() {
    db.query(
        deptQueryString, function(err, rows, fields) {
            if(err) throw err;

                console.clear();
                cTable(rows);

            console.log('Woah!! After all I can view all employees data by department');
            console.log("\n");
            // re-prompt the user
            promptUser();
        }
    );
}

function viewAllEmpByMan() {
    db.query(
        manQueryString, function(err, rows, fields) {
            if(err) throw err;

                console.clear();
                cTable(rows);

            console.log('Woah!! After all I can view all employees data by manager');
            console.log("\n");
            // re-prompt the user
            promptUser();
        }
    );
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee last name'   
        },
        {
            type: 'list',
            name: 'title',
            message: 'What is the employee designation',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Legal Team Lead', 'Lawyer']
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary ?',
            validate: function(value) {
                if(isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is the employee department',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'What is the managers id',
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', '5. Malia Brown', '6. Sarah Lourd', 'Tom Allen']
        }
    ])
    .then(function(answer) {

       // Need to add insert query
       let addQuery = 'INSERT INTO employee';


        db.query(
            addQuery, function(err, result) {
                if(err) throw err;

                console.clear();
                cTable(result);

            console.log('Woah!! I added a new employee to the database');
            console.log("\n");
            // re-prompt the user
            promptUser();
            }
        )
    })
}




