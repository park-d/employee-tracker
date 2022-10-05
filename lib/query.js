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

    //query to return all roles joins on department to get the right data to display
    queryRoles() {
        return this.db.promise().query(
            `SELECT RL.title, RL.id, DM.name, RL.salary FROM role RL INNER JOIN department DM ON DM.id = RL.department_id;`);
    }

    //method that holds a query to return all employees joins on department, role, and itself to get the right data to display
    queryEmployees() {
        return this.db.promise().query(
            `SELECT EE.id, EE.first_name, EE.last_name, RL.title, RL.salary, DM.name, CONCAT(EEM.first_name, ' ', EEM.last_name) Manager FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM ON RL.department_id = DM.id LEFT JOIN employee EEM ON EE.manager_id = EEM.id;`);
    }

    //method that displays a selected manager's direct reports joins on department, role, and itself to get the right data to display
    queryDirectReports(manager) {
        return this.db.promise().query(
            `SELECT EE.id, EE.first_name, EE.last_name, RL.title, RL.salary, DM.name, CONCAT(EEM.first_name, ' ', EEM.last_name) Manager FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM ON RL.department_id = DM.id LEFT JOIN employee EEM ON EE.manager_id = EEM.id WHERE EE.manager_id = ?;`, manager);
    }

    //method that displays a selected department's employees joins on department, role, and itself to get the right data to display
    queryByDept(dept) {
        return this.db.promise().query(
            `SELECT EE.id, EE.first_name, EE.last_name, RL.title, RL.salary, DM.name, CONCAT(EEM.first_name, ' ', EEM.last_name) Manager FROM employee EE INNER JOIN role RL on EE.role_id = RL.id INNER JOIN department DM ON RL.department_id = DM.id LEFT JOIN employee EEM ON EE.manager_id = EEM.id WHERE DM.id = ?;`, dept);
    }

    //method that displays a selected department's total budget joins on department and role to get the right data to display
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
    //method that updates a selected employees role in the employee database
    updateEmployeeRole(role, id) {
        return this.db.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`, [role, id]
        );
    }
    //method that updates a selected employees manager in the employee database
    updateEmployeeManager(manager, id) {
        return this.db.promise().query(
            `UPDATE employee SET manager_id = ? WHERE id = ?`, [manager, id]
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
