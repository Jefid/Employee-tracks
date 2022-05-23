const { connect } = require('http2');
const inquirer = require('inquirer');
const { Connection } = require('mysql2');
const mysql = require('mysql2');
require('dotenv').config();

const PORT = process.env.PORT || 3305;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: 'employee_database',
  },
  console.log(`Connected on ${PORT}`)
);

// Start server after DB connection
db.connect(err => {
    if (err) throw err;

    console.log('Database connected.');
  
  //AREA TO ADD INQUIRER PROMPTS AND CONSOLE LOG INQUIRERE SPLASH SCREEN

  promptUser();
});
function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'directory',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add department',
          'Add role',
          'Add employee',
          'Update employee role',
          'Exit',
        ],
      },
    ])
    .then((response) => {
      if (response.directory === 'View all departments') {
        viewDeps();
      } else if (response.directory === 'View all roles') {
        viewRoles();
      } else if (response.directory === 'View all employees') {
        viewEmps();
      } else if (response.directory === 'Add department') {
        addDep();
      } else if (response.directory === 'Add role') {
        addRole();
      } else if (response.directory === 'Add employee') {
        addEmp();
      } else if (response.directory === 'Update employee role') {
        updateRole();
      } else if (response.directory === 'Exit') {
        exit();
      }
    });
}

function viewDeps() {
  let sql = `SELECT * FROM department`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log(`
    =========================`);
    promptUser();
  });
}

function viewRoles() {
  let sql = `SELECT * FROM roles`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log(`
    =========================`);
    promptUser();
  });
}

function viewEmps() {
  let sql = `SELECT * FROM employee`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log(`
    =========================`);
    promptUser();
  });
}

async function addDep() {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'depName',
        message: 'What is the name of the new department?',
      },
    ])
    .then((answer) => {
      db.query(`INSERT INTO department SET ?`, {
        department_name: answer.depName,
      });
    });
  console.log(`Database updated
      =============================`);
  promptUser();
}

async function addRole() {
  // name, salary, department
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the new role:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary associated with this role: (no commas)',
      },
      {
        type: 'input',
        name: 'roleDep',
        message: 'Please enter the department ID for this role: ',
      },
    ])
    .then((answer) => {
      if (answer === 'Other') {
        addDep();
      }
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [answer.roleName, answer.roleSalary, answer.roleDep];
      db.query(sql, params, (err) => {
        if (err) throw err;
        console.log(`Database updated
      =============================`);
        promptUser();
      });
    });
}

async function addEmp() {
  // first, last, role, manager
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the employee first name:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the employee last name:',
      },
      {
        type: 'input',
        name: 'empRole',
        message: 'What is the role ID associated with this employee?',
      },
      {
        type: 'input',
        name: 'empMgr',
        message: 'Please enter the manager ID associated for this employee: ',
      },
    ])
    .then((answer) => {
      if (answer.empRole === 'Other') {
        addRole();
      }
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [
        answer.firstName,
        answer.lastName,
        answer.empRole,
        answer.empMgr,
      ];
      db.query(sql, params, (err) => {
        if (err) throw err;
        console.log(`Database updated
      =============================`);
        promptUser();
      });
    });
}

async function updateRole() {
  // update role
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'empID',
        message:
          'Enter the ID number of the employee you would like to update:',
      },
      {
        type: 'input',
        name: 'roleID',
        message: 'Enter the ID of the new role for this employee: ',
      },
    ])
    .then((answer) => {
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [answer.roleID, answer.empID];
      db.query(sql, params, (err) => {
        if (err) throw err;
        console.log(`Database updated
      =============================`);
        promptUser();
      });
    });
}

function exit(){
  console.log('Bye!');
};

//Bonus

// Fulfilling any of the following can add up to 20 points to your grade. Note that the highest grade you can achieve is still 100:

// Application allows users to update employee managers (2 points).

// Application allows users to view employees by manager (2 points).

// Application allows users to view employees by department (2 points).

// Application allows users to delete departments, roles, and employees (2 points for each).

// Application allows users to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (8 points).
