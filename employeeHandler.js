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

// Selection to add a new department.
const addDepartment = async () => {
    try {
        console.log('Department Add');
        let answer = await inquirer.prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the new department:'
            }
        ]);
        let result = await connection.query("INSERT INTO department SET ?", {
            department_name: answer.departmentName
        });
        console.log(`${answer.departmentName} added successfully to departments.\n`)
        userChoice();
    } catch (err) {
        console.log(err);
        userChoice();
    };
}

// Selection to add a new employee.
const addEmployee = async () => {
    try {
        console.log('Employee Add');
        let roles = await connection.query("SELECT * FROM role");
        let managers = await connection.query("SELECT * FROM employee");
        let answer = await inquirer.prompt([
            {
                name: 'nameFirst',
                type: 'input',
                message: 'Enter employees first name:'
            },
            {
                name: 'nameLast',
                type: 'input',
                message: 'Enter employees last name:'
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "Enter employee role id:"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "Enter employee manager id:"
            }
        ])
        let result = await connection.query("INSERT INTO employee SET ?", {
            first_name: answer.nameFirst,
            last_name: answer.nameLast,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });
        console.log(`${answer.nameFirst} ${answer.nameLast} added successfully.\n`);
        userChoice();
    } catch (err) {
        console.log(err);
        userChoice();
    };
}

// Selection to add a new role.
const addRole = async () => {
    try {
        console.log('Role Add');
        let departments = await connection.query("SELECT * FROM department")
        let answer = await inquirer.prompt([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'Enter the name of the new role:'
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'Enter the role salary:'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'Enter the department id of the new role:',
            }
        ]);
        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO role SET ?", {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentId
        })
        console.log(`${answer.roleTitle} role added successfully.\n`)
        userChoice();
    } catch (err) {
        console.log(err);
        userChoice();
    };
}