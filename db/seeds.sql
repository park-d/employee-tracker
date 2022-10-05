INSERT INTO department (name)
VALUES 
('Management'),
('Accounting'),
('Human Resources'),
('Warehouse'),
('Reception'),
('Sales'),
('Product Oversight');

INSERT INTO role (title, salary, department_id)
VALUES 
('Chief Financial Officer',500000,1),
('Vice President, North East Region and Director of New Media',250000,1),
('Regional Manager',175000,1),
('Assistant to the Regional Manager',150000,1),
('Assistant Regional Manager',150000,1),
('Senior Accountant',125000,2),
('Accountant',100000,2),
('Human Resources Representative',100000,3),
('Warehouse Foreman',75000,4),
('Warehouse Staff',50000,4),
('Receptionist',50000,5),
('Regional Director in Charge of Sales',125000,6),
('Sales Representative',90000,6),
('Customer Service Representative',50000,7),
('Supplier Relations',50000,7),
('Quality Assurance',50000,7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('David','Wallace',1,NULL),
('Ryan','Howard',2,1),
('Michael','Scott',3,1),
('Dwight K.','Schrute',4,3),
('Jim','Halpert',5,3),
('Angela','Martin',6,3),
('Kevin','Malone',7,6),
('Oscar','Martinez',7,6),
('Toby','Flenderson',8,2),
('Darryl','Philbin',9,3),
('Jerry','DiCanio',10,10),
('Madge','Madsen',10,10),
('Lonnie','Collins',10,10),
('Roy','Anderson',10,10),
('Pam','Beesly',11,3),
('Andy','Bernard',12,5),
('Phyllis','Lapin',13,16),
('Stanley','Hudson',13,16),
('Todd','Packer',13,16),
('Kelly','Kapoor',14,3),
('Meredith','Palmer',15,3),
('Creed','Bratton',16,3);
