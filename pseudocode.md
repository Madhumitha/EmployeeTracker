# Plan

### Requirements 

1. Create three tables 

department : 

a) id - INT PRIMARY KEY
b) name - VARCHAR(30) to hold department name

role :

a) id -INT PRIMARY KEY 
b) title - VARCHAR(30) to hold role title
c) salary - DECIMAL to hold role salary 
d) department_id - INT to hold reference to department role belongs to

employee: 

a) id - INT PRIMARY KEY
b) first_name - VARCHAR(30) to hold employee first name
c) last_name - VARCHAR(30) to hold employee last name
d) role_id - INT to hold reference to role employee has 
e) manager_id -INT to hold reference to another employee thay manager of the current employee. This field may be null if the employee has no manager.

### End Results 

1. Allows the user to 
a) Add departments, roles, employees
b) View departments, roles, employees
c) Update employee roles

2. Update employee managers
3. View employees by manager
4. Delete departments, roles, and employees.
5. View the total utilized budget of a department - i.e. the combined salaries of all employees in that department. 

### Strategies - 

1. Create an application that create a database for Employees 
2. Use inquirer to add departments, roles and employees from command prompt



