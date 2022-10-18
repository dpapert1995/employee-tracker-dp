// Requires
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

// Create the connection to MySQL WorkBench
let connection = mysql.createConnection({
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

// Begin the application after establishing the connection.
connection.connect(function (err) {
    if (err) throw err;
    userChoice();
})

// Header of Command line prompts on startup
console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)

// Begin inquirer prompts
const userChoice = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'Select an option?',
            choices: [
                'Add Departments',
                'Add Employees',
                'Add Roles',
                'View Departments',
                'View Employees',
                'View Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            // Add departments
            case 'Add Departments':
                addDepartment();
                break;
            // Add employees
            case 'Add Employees':
                addEmployee();
                break;
            // Add roles
            case 'Add Roles':
                addRole();
                break;
            //View employees
            case 'View Employees':
                viewEmployee();
                break;
            // View departments
            case 'View Departments':
                viewDepartment();
                break;
            // View roles
            case 'View Roles':
                viewRole();
                break;
            // Update Employee Role
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            // Exit
            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        userChoice();
    };
}

