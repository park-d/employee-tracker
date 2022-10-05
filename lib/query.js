//requring mysql2 npm package
const mysql = require("mysql2");

//creating the connection to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

class sqlQueries {
    //refrencing to the db connection from above
    constructor(db) {
        this.db = db;
    }
//-----------------VIEW QUERIES-----------------\\
    //query to return all departments
    queryDepartments() {
        return this.db.promise().query(
            `SELECT DM.name, DM.id from department DM;`);
    }

    //query to return all roles
    queryRoles() {
        return this.db.promise().query(
            `SELECT RL.title, RL.id, DM.name, RL.salary FROM role RL INNER JOIN department DM ON DM.id = RL.department_id;`);
    }

    //method that holds a query to return all employees
    queryEmployees() {
        return this.db.promise().query(
            `SELECT EE.id, EE.first_name, EE.last_name, RL.title, RL.salary, DM.name, CONCAT(EEM.first_name, ' ', EEM.last_name) Manager FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM ON RL.department_id = DM.id LEFT JOIN employee EEM ON EE.manager_id = EEM.id;`);
    }

    //method that displays a selected manager's direct reports
    queryDirectReports(manager) {
        return this.db.promise().query(
            `SELECT EE.id, EE.first_name, EE.last_name, RL.title, RL.salary, DM.name, CONCAT(EEM.first_name, ' ', EEM.last_name) Manager FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM ON RL.department_id = DM.id LEFT JOIN employee EEM ON EE.manager_id = EEM.id WHERE EE.manager_id = ?;`, manager);
    }

    //method that displays a selected department's employees
    queryByDept(dept) {
        return this.db.promise().query(
            `SELECT EE.id, EE.first_name, EE.last_name, RL.title, RL.salary, DM.name, CONCAT(EEM.first_name, ' ', EEM.last_name) Manager FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM ON RL.department_id = DM.id LEFT JOIN employee EEM ON EE.manager_id = EEM.id WHERE DM.id = ?;`, dept);
    }

    //method that displays a selected department's total budget
    queryTotalBudget(id) {
        return this.db.promise().query(
            `SELECT DM.name, SUM(RL.salary) budget FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM on RL.department_id = DM.id WHERE DM.id = ? GROUP BY DM.name;`, id
        );
    }

//-----------------INSERT QUERIES-----------------\\
    //method that inserts a new department into the department database
    insertDepartment(dept) {
        return this.db.promise().query(
            `INSERT INTO department SET ?`, dept);
    }

    //method that inserts a new role into the role database
    insertRole(role) {
        return this.db.promise().query(
            `INSERT INTO role SET ?`, role);
    }

    //method that inserts a new employee into the employee database
    insertEmployee(employee) {
        return this.db.promise().query(
            `INSERT INTO employee SET ?`, employee);
    }

//-----------------UPDATE QUERIES-----------------\\
    //method that updates a selected employees data in the employee database
    updateEmployee(change, id) {
        return this.db.promise().query(
            `UPDATE employee SET ? WHERE ?`, [change, id]
        );
    }

//-----------------DELETE QUERIES-----------------\\
    //method that deletes a selected department
    deleteDepartment(id) {
        return this.db.promise().query(
            `DELETE FROM department WHERE id = ?`, id);
    }

    //method that deletes a selected role
    deleteRole(id) {
        return this.db.promise().query(
            `DELETE FROM role WHERE id = ?`, id);
    }

    //method that deletes a selected employee
    deleteEmployee(id) {
        return this.db.promise().query(
            `DELETE FROM employee WHERE id = ?`, id);
    }
}

module.exports = new sqlQueries(db);
