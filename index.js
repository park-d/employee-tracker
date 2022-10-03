const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const fs = require("fs");

inquirer
    .prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        }
    ]).then((data) => {
        switch(data.menu) {
            case "View All Employees":
                console.log("function that queries employee table")
                break;
            case "Add Employee":
                console.log("function that inserts into employee table")
                break;
            case "Update Employee Role":
                console.log("function that updates employee record")
                break;
            case "View All Roles":
                console.log("function that queries role table")
                break;
            case "Add Role":
                console.log("function that inserts into role table")
                break;
            case "View All Departments":
                console.log("function queries department table")
                break;
            case "Add Department":
                console.log("function that inserts into department table")
                break;
            case "Quit":
                console.log("ends the application")
                break;
            default:
                return;
        }
    }
    );
