-- data.sql
-- Cities
INSERT INTO cities (name) VALUES ('Culiacán');
INSERT INTO cities (name) VALUES ('Mazatlán');
INSERT INTO cities (name) VALUES ('Los Mochis');

-- Employees
INSERT INTO employees (first_name, last_name, mother_last_name, birth_date, salary, active, city_id)
VALUES ('Juan', 'Pérez', 'López', '1985-05-15', 12000.00, true, 1);

INSERT INTO employees (first_name, last_name, mother_last_name, birth_date, salary, active, city_id)
VALUES ('María', 'González', 'Martínez', '1990-08-22', 11500.00, true, 1);

INSERT INTO employees (first_name, last_name, mother_last_name, birth_date, salary, active, city_id)
VALUES ('Carlos', 'Ramírez', 'Sánchez', '1988-03-10', 12500.00, true, 2);

-- Routes
INSERT INTO routes (name, type, capacity, city_id, driver_id)
VALUES ('Ruta 1', 'PERSONAL', 30, 1, 1);

INSERT INTO routes (name, type, capacity, city_id, driver_id)
VALUES ('Ruta 2', 'ITEMS', 80, 1, 2);

INSERT INTO routes (name, type, capacity, city_id, driver_id)
VALUES ('Ruta A', 'PERSONAL', 25, 2, 3);