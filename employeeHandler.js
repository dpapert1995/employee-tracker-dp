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

