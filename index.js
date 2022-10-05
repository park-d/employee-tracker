const inquirer = require("inquirer");
require("console.table");

const qry = require("./lib/query");

function startupMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "menu",
                message: "What would you like to do?",
                choices: ["View All Departments", "View All Roles", "View All Employees", "View Manager's Direct Reports", "View Employees by Department", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Update Employee Manager", "Quit"],
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
                    break;
                case "View Employees by Department":
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    break;
                case "Update Employee Role":
                    break;
                case "Update Employee Manager":
                    break;
                case "Quit":
                    break;
                default:
                    return;
            }
        }
        );
};

function viewDepartments() {
    qry.queryDepartments().then(([result]) => {
        console.log(`\n\n\x1b[33mList of All Departments\n\x1b[0m`);
        console.table(result);
    }).then(() => startupMenu());

};

function viewRoles() {
    qry.queryRoles().then(([result]) => {
        console.log(`\n\n\x1b[33mList of All Roles\n\x1b[0m`);
        console.table(result);
    }).then(() => startupMenu());
};

function viewEmployees() {
    qry.queryEmployees().then(([result]) => {
        console.log(`\n\n\x1b[33mList of All Employees\n\x1b[0m`);
        console.table(result);
    }).then(() => startupMenu());
};

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?",
            }
        ]).then((data) => {
            console.log(data);
            qry.insertDepartment(data)
                .then(() => {
                    console.log(`\n\n\x1b[35mAdded ${data.name} to the department database\n\x1b[0m`);
                    startupMenu();
                });
        });
};

function addRole() {
    qry.queryDepartments().then(([data]) => {
        const options = data.map(({id, name}) => ({
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
                        console.log(`\n\n\x1b[35mAdded ${data.title} to the role database\n\x1b[0m`);
                        startupMenu();
                    });
            });
    });
};
startupMenu();
