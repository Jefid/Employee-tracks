INSERT INTO department (id, department_name)
VALUES
  (1, 'Engineering'),
  (2, 'Finance'),
  (3, 'Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 2),
  ('Salesperson', 200000, 2),
  ('Lead Engineer', 300000, 1),
  ('Software Engineer', 400000, 1),
  ('Account Manager', 500000, 2),
  ('Accountant', 600000 , 2),
  ('Legal Team Lead', 700000, 3),
  ('Lawyer', 8000000, 3);

  INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 0),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 2),
  ('Charles', 'LeRoi', 4, 1),
  ('Katherine', 'Mansfield', 5, 1),
  ('Dora', 'Carrington', 6, 4),
  ('Edward', 'Bellamy', 7, 5),
  ('Montague', 'Summers', 8, 1),
  ('Octavia', 'Butler', 1, 1),
  ('Unica', 'Zurn', 2, 6);
