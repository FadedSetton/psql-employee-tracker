const inquirer = require('inquirer').default;
const db = require('./db/queries');

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(({ action }) => {
    switch (action) {
      case 'View all departments':
        return db.viewDepartments().then(mainMenu);
      case 'View all roles':
        return db.viewRoles().then(mainMenu);
      case 'View all employees':
        return db.viewEmployees().then(mainMenu);
      case 'Add a department':
        return db.addDepartment().then(mainMenu);
      case 'Add a role':
        return db.addRole().then(mainMenu);
      case 'Add an employee':
        return db.addEmployee().then(mainMenu);
      case 'Update an employee role':
        return db.updateEmployeeRole().then(mainMenu);
      default:
        console.log('Goodbye!');
        process.exit();
    }
  });
}

mainMenu();
