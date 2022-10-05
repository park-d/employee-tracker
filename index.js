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
                    break;
                case "View All Employees":
                    break;
                case "View Manager's Direct Reports":
                    break;
                case "View Employees by Department":
                    break;
                case "Add Department":
                    break;
                case "Add Role":
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

startupMenu();
