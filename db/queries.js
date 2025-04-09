const inquirer = require('inquirer').default;
const pool = require('./connection');

async function viewDepartments() {
  const res = await pool.query('SELECT * FROM department');
  console.table(res.rows);
}

async function viewRoles() {
  const res = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
}

async function viewEmployees() {
  const res = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department,
           r.salary, m.first_name AS manager
    FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
  `);
  console.table(res.rows);
}

// The next four will involve prompts before running SQL:
async function addDepartment() {
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Department name:' }
  ]);
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added department: ${name}`);
}

async function addRole() {
  const departments = await pool.query('SELECT * FROM department');
  const { title, salary, department_id } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Role title:' },
    { type: 'input', name: 'salary', message: 'Salary:' },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select department:',
      choices: departments.rows.map(d => ({ name: d.name, value: d.id }))
    }
  ]);
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, department_id]
  );
  console.log(`Added role: ${title}`);
}

async function addEmployee() {
  const roles = await pool.query('SELECT * FROM role');
  const employees = await pool.query('SELECT * FROM employee');
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: 'First name:' },
    { type: 'input', name: 'last_name', message: 'Last name:' },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select role:',
      choices: roles.rows.map(r => ({ name: r.title, value: r.id }))
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select manager:',
      choices: [{ name: 'None', value: null }].concat(
        employees.rows.map(e => ({
          name: `${e.first_name} ${e.last_name}`,
          value: e.id
        }))
      )
    }
  ]);
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id]
  );
  console.log(`Added employee: ${first_name} ${last_name}`);
}

async function updateEmployeeRole() {
  const employees = await pool.query('SELECT * FROM employee');
  const roles = await pool.query('SELECT * FROM role');
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select employee:',
      choices: employees.rows.map(e => ({
        name: `${e.first_name} ${e.last_name}`,
        value: e.id
      }))
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select new role:',
      choices: roles.rows.map(r => ({ name: r.title, value: r.id }))
    }
  ]);
  await pool.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [role_id, employee_id]
  );
  console.log('Employee role updated.');
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
