const inquirer = require("inquirer");
require("console.table");

const qry = require("./lib/query");

//-----------------INITIAL INQUIRER PROMPT/MENU-----------------\\
function startupMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "menu",
                message: "What would you like to do?",
                choices: ["View All Departments", "View All Roles", "View All Employees", "View Manager's Direct Reports", "View Employees by Department", "View Total Utilized Budget of Department","Add Department", "Add Role", "Add Employee", "Update Employee Role", "Update Employee Manager", "Remove Department", "Remove Role", "Remove Employee", "Quit"],
                loop: false
            }
        ]).then((data) => {
            switch(data.menu) {
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View Manager's Direct Reports":
                    viewDirectReports();
                    break;
                case "View Employees by Department":
                    viewEmployeesByDept();
                    break;
                case "View Total Utilized Budget of Department":
                    viewTotalBudget();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "Remove Department":
                    removeDepartment();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Quit":
                    console.log(`Thanks for using Employee Tracker!`)
                    process.exit();
                default:
                    return;
            }
        }
        );
};

//For each of the functions in this seciton, I reference the SQL queries from defined class depending on which function (what is chose in inquirer), and since it is promise based, take the output and displays with console.table, and run the startup menu again
// there are also extra steps with the .map prototype in which I create a new array for the options in the inquirer prompt, which are a (sometimes reformatted) key value pair so I can return the id to the SQL queries instead of the name of employee, role, or dept.

//-----------------VIEW DATA FROM DATABASE SECTION-----------------\\

function viewDepartments() {
    qry.queryDepartments().then(([result]) => {
        console.log(`\n\n\x1b[35mList of All Departments\n\x1b[0m`);
        console.table(result);
        startupMenu();
    })
};

function viewRoles() {
    qry.queryRoles().then(([result]) => {
        console.log(`\n\n\x1b[35mList of All Roles\n\x1b[0m`);
        console.table(result);
        startupMenu();
    })
};

function viewEmployees() {
    qry.queryEmployees().then(([result]) => {
        console.log(`\n\n\x1b[35mList of All Employees\n\x1b[0m`);
        console.table(result);
        startupMenu();
    });
};


function viewDirectReports() {
    qry.queryEmployees().then(([result]) => {
        const managerOptions = result.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "manager_id",
                    message: "Which manager's direct reports would you like to view?",
                    choices: managerOptions,
                    loop: false
                }
            ]).then((data) => {
                qry.queryDirectReports(data.manager_id)
                    .then(([results]) => {
                        console.log(`\n\n\x1b[35mList of Direct Reports\n\x1b[0m`);
                        console.table(results);
                        startupMenu();
                    });
            });
    });
};

function viewEmployeesByDept() {
    qry.queryDepartments().then(([result]) => {
        const deptOptions = result.map(({id, name}) => ({
            name: name,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Which department would you like to view?",
                    choices: deptOptions,
                    loop: false
                }
            ]).then((data) => {
                console.log(data)
                qry.queryByDept(data.id)
                    .then(([results]) => {
                        console.log(`\n\n\x1b[35mEmployees by Department\n\x1b[0m`);
                        console.table(results);
                        startupMenu();
                    });
            });
    });
};

function viewTotalBudget() {
    qry.queryDepartments().then(([result]) => {
        const deptOptions = result.map(({id, name}) => ({
            name: name,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Which department's budget would you like to view?",
                    choices: deptOptions,
                    loop: false
                }
            ]).then((data) => {
                qry.queryTotalBudget(data.id)
                    .then(([results]) => {
                        console.log(`\n\n\x1b[35mTotal Utilized Budget\n\x1b[0m`);
                        console.table(results);
                        startupMenu();
                    });
            });
    });
};

//-----------------ADD TO DATABASE SECTION-----------------\\
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?",
            }
        ]).then((data) => {
            qry.insertDepartment(data)
                .then(() => {
                    console.log(`\n\n\x1b[32mAdded ${data.name} to the department database\n\x1b[0m`);
                    startupMenu();
                });
        });
};

function addRole() {
    qry.queryDepartments().then(([result]) => {
        const options = result.map(({id, name}) => ({
            name: name,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of the role?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: options,
                    loop: false
                }
            ]).then((data) => {
                qry.insertRole(data)
                    .then(() => {
                        console.log(`\n\n\x1b[32mAdded ${data.title} to the role database\n\x1b[0m`);
                        startupMenu();
                    });
            });
    });
};

function addEmployee() {
    qry.queryEmployees().then(([resultEmp]) => {
        const managerOptions = resultEmp.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        qry.queryRoles().then(([resultRole]) => {
            roleOptions = resultRole.map(({id, title}) => ({
                name: title,
                value: id
            }));
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the employee's first name?",
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's last name?",
                    },
                    {
                        type: "list",
                        name: "role_id",
                        message: "What is the employee's role?",
                        choices: roleOptions,
                        loop: false
                    },
                    {
                        type: "list",
                        name: "manager_id",
                        message: "Who is the employee's manager?",
                        choices: [{name: "None", value: null}, ...managerOptions],
                        loop: false
                    }
                ]).then((response) => {
                    qry.insertEmployee(response)
                        .then(() => console.log(`\n\n\x1b[32mAdded ${response.first_name} ${response.last_name} to the role database\n\x1b[0m`))
                        .then(() => startupMenu());
                });
        });
    });
};

//-----------------UPDATE DATA IN DATABASE SECTION-----------------\\
function updateEmployeeRole() {
    qry.queryEmployees().then(([resultEmp]) => {
        const employeeOptions = resultEmp.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        qry.queryRoles().then(([resultRole]) => {
            roleOptions = resultRole.map(({id, title}) => ({
                name: title,
                value: id
            }));
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "id",
                        message: "Which employee's role do you want to update?",
                        choices: employeeOptions,
                        loop: false
                    },
                    {
                        type: "list",
                        name: "role_id",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roleOptions,
                        loop: false
                    }
                ]).then((response) => {
                    console.log(response.role_id,response.id)
                    qry.updateEmployeeRole(response.role_id, response.id)
                        .then(() => console.log(`\n\n\x1b[33mUpdated employee's role in the employee database\n\x1b[0m`))
                        .then(() => startupMenu());
                });
        });
    });
};

function updateEmployeeManager() {
    qry.queryEmployees().then(([resultEmp]) => {
        const employeeOptions = resultEmp.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        qry.queryEmployees().then(([resultManager]) => {
            managerOptions = resultManager.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "id",
                        message: "Which employee's manager do you want to update?",
                        choices: employeeOptions,
                        loop: false
                    },
                    {
                        type: "list",
                        name: "manager_id",
                        message: "To which manager do you want to assign the selected employee?",
                        choices: managerOptions,
                        loop: false
                    }
                ]).then((response) => {
                    qry.updateEmployee(response.manager_id,response.id)
                        .then(() => console.log(`\n\n\x1b[33mUpdated employee's manager in the employee database\n\x1b[0m`))
                        .then(() => startupMenu());
                });
        });
    });
};

//-----------------REMOVE FROM DATABASE SECTION-----------------\\
function removeDepartment() {
    qry.queryDepartments().then(([result]) => {
        const deptOptions = result.map(({id, name}) => ({
            name: name,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Which department do you want to remove?",
                    choices: deptOptions,
                    loop: false
                }
            ]).then((response) => {
                qry.deleteDepartment(response.id)
                    .then(() => console.log(`\n\n\x1b[31mRemoved from department database\n\x1b[0m`))
                    .then(() => startupMenu());
            });
    });
};

function removeRole() {
    qry.queryRoles().then(([result]) => {
        const roleOptions = result.map(({id, title}) => ({
            name: title,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "title",
                    message: "Which role do you want to remove?",
                    choices: roleOptions,
                    loop: false
                }
            ]).then((response) => {
                qry.deleteRole(response.title)
                    .then(() => console.log(`\n\n\x1b[31mRemoved from role database\n\x1b[0m`))
                    .then(() => startupMenu());
            });
    });
};

function removeEmployee() {
    qry.queryEmployees().then(([result]) => {
        const employeeOptions = result.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Which employee do you want to remove?",
                    choices: employeeOptions,
                    loop: false
                }
            ]).then((response) => {
                qry.deleteEmployee(response.id)
                    .then(() => console.log(`\n\n\x1b[31mRemoved from employee database\n\x1b[0m`))
                    .then(() => startupMenu());
            });
    });
};

startupMenu();
