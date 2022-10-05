# SQL - Employee Tracker
[![This repository is Unlicensed and free to use.](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

## Description
A content management system (CMS) that allows non-developers to easily view and interact with information stored in databases. This application is a command-line application from to manage a company's employee database, using [node.js](https://nodejs.org/en/), [Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4), and [Mysql](https://www.npmjs.com/package/mysql2).
  
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
In order to use this application, [node.js](https://nodejs.org/en/) must be installed, and the dependencies in the package.json must be installed as well.

## Usage 
In order to use this application, the user must run the application using node.js in the command line. It will then prompt the user with questions to interact with the database, as well as to edit the database. The user can view all departments, view all roles, view all employees, view employees by manager, view employees by department, add a department, add a role, add an employee, update an employee role, update employee managers, delete departments, roles, and employees, view the total utilized budget of a department, and exit the application.

---

Video walkthrough of working application

![Video walkthrough of working application](./assets/gifs/employee-tracker-walkthrough.gif)

## Credits
While working on this project, our instructor, Poornima, told us to create a separate class file that would hold the SQL queries we use in the index.js file. And used the following libraries:
- [node.js](https://nodejs.org/en/)
- [npm inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [console.table](https://www.npmjs.com/package/console.table)

Also, the instructions for the assignment told us to use promises for this assignment, and the webpage I used for reference is included below. Additionally, used the following webpages for reference:
- [The map() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [process.exit()](https://www.geeksforgeeks.org/how-to-exit-process-in-node-js/)
- [process.exit()](https://nodejs.org/dist/latest-v16.x/docs/api/process.html)
- [.promise()](https://www.npmjs.com/package/mysql2)

## License
Licensed by The Unlicense
