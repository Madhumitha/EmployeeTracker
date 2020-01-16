const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

let queryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, "", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id';

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
        //console.log('connected as id' + db.threadId);
        
       /* db.query(queryString, function(err, res){
            if(err)
                throw err;
            console.log(res);
        })
       */
      
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
            for(let i in rows) {
                console.table(rows[i]);
            }
            console.log('Woah!! After all I can view all employees data');
            // re-prompt the user
            promptUser();
        }
    );
}
   




