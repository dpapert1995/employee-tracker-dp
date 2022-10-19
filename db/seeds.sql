INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Simon', 'Cowell', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jimmy', 'Neutron', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Chester', 'Cheetoh', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Terry', 'Bogart', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Maples', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jason', 'Zimmerman', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Miles', 'Prower', 6, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Engineering');
INSERT INTO department (department_name)
VALUES ('Marketing');
INSERT INTO department (department_name)
VALUES ('IT');
INSERT INTO department (department_name)
VALUES ('HR');

INSERT INTO role (title, salary, department_id)
VALUES ('Senior Manager', 145000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 95000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Digital Marketer', 75000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('IT Specialist', 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 78000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 250000, null);