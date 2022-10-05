const mysql = require("mysql2");

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

    //query to return all departments
    queryDepartments() {
        return this.db.promise().query(
            `SELECT DM.name, DM.id from department DM;`);
    }
}

module.exports = new sqlQueries(db);
