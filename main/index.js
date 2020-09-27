const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
    showPrompts();
}

async function showPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do in the employee database?",
            choices: [
                {
                    name: "Get Employees",
                    value: "SELECT_EMPLOYEES"
                },
                {
                    name: "Get Employees By Department",
                    value: "SELECT_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "Get Employees By Manager",
                    value: "SELECT_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "INSERT_EMPLOYEE"
                },
                {
                    name: "Update Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Get Roles",
                    value: "SELECT_ROLES"
                },
                {
                    name: "Add Role",
                    value: "INSERT_ROLE"
                },
                {
                    name: "Get Departments",
                    value: "SELECT_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "INSERT_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "SELECT_EMPLOYEES":
            return getEmployees();
        case "INSERT_EMPLOYEE":
            return insertEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateRole();
        case "SELECT_DEPARTMENTS":
            return getDepartments();
        case "INSERT_DEPARTMENT":
            return addDepartment();
        case "SELECT_ROLES":
            return getRoles();
        case "INSERT_ROLE":
            return addRole();
        default:
            return quit();
    }
}

async function getEmployees() {
    const employees = await db.getEmployees();

    console.log("\n");
    console.table(employees);

    showPrompts();
}

async function updateRole() {
    const employees = await db.getEmployees();

    const allEmployees = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: allEmployees
        }
    ]);

    const roles = await db.getRoles();

    const allRoles = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "What job does this person have?",
            choices: allRoles
        }
    ]);

    await db.updateRole(employeeId, roleId);

    console.log("Updated employee's role");

    showPrompts();
}

async function getRoles() {
    const roles = await db.getRoles();

    console.log("\n");
    console.table(roles);

    showPrompts();
}

async function addRole() {
    const departments = await db.getDepartments();

    const allDepartments = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const role = await prompt([
        {
            name: "title",
            message: "What is the job title?"
        },
        {
            name: "salary",
            message: "What is the yearly salary for this job?"
        },
        {
            type: "list",
            name: "department_id",
            message: "In which department is this job?",
            choices: allDepartments
        }
    ]);

    await db.addRole(role);

    console.log(`Added ${role.title}`);

    showPrompts();
}

async function getDepartments() {
    const departments = await db.getDepartments();

    console.log("\n");
    console.table(departments);

    showPrompts();
}

async function addDepartment() {
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the department are you adding?"
        }
    ]);

    await db.addDepartment(department);

    console.log(`Added ${department.name}`);

    showPrompts();
}

async function insertEmployee() {
    const roles = await db.getRoles();
    const employees = await db.getEmployees();

    const employee = await prompt([
        {
            name: "first_name",
            message: "first name?"
        },
        {
            name: "last_name",
            message: "last name?"
        }
    ]);

    const allRoles = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is this person's title?",
        choices: allRoles
    });

    employee.role_id = roleId;

    await db.insertEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name}`
    );

    showPrompts();
}

function quit() {
    console.log("Until next time!");
    process.exit();
}