const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "OmNamahShivaay1221",
    database: "employeeTracker"
});
connection.connect(function (err) {
    if (err) throw err;
    connection.query = util.promisify(connection.query);
});

class db {
    constructor(connection) {
        this.connection = connection;
    }
    
    getEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department on role.department_id = department.id"
        )
    }
    
    getDepartments() {
        return this.connection.query(
            "SELECT * FROM department"
        )
    }

    getRoles() {
        return this.connection.query(
            "SELECT * FROM role"
        )
    }

    updateRole(employeeID) {
        return this.connection.query(
            "UPDATE employee SET role WHERE employee.id = ?", employeeID
        )
    }
    
    insertEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        )
    }

    addRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        )
    }

    addDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department
        )
    }

}

module.exports = new db(connection);

