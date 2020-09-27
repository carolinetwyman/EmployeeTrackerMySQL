/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employeeTracker ;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("IT"), ("HR"), ("Ops"), ("Sales"), ("DevOps");

INSERT INTO role (title, salary, department_id)
VALUES
    ('Solutions Architect', 120000, 5),
    ('Solutions Consultant', 80000, 5),
    ('Technical Analyst', 70000, 5),
    ('People Person', 100000, 2),
    ('National Account Manager', 160000, 3),
    ('Sales Lead', 125000, 4),
    ('Sales Guy', 70000, 4),
    ('Ops Lead', 250000, 4),
    ('Scheduler', 30000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Paul', 'Rudd', 1, NULL),
    ('Amy', 'Schumer', 2, 1),
    ('Petey', 'Pablo', 3, NULL),
    ('Kevin', 'Bacon', 4, 3),
    ('Tan', 'France', 5, NULL),
    ('Mila', 'Kunis', 6, 5),
    ('Ringo', 'Starr', 7, NULL),
    ('Barry', 'White', 8, 7);
