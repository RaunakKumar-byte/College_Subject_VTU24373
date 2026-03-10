CREATE TABLE drivers(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50),
otp INT
);

DELIMITER //
CREATE TRIGGER before_driver_insert
BEFORE INSERT ON drivers 
FOR EACH ROW
BEGIN
SET NEW.otp = FLOOR(1000 + RAND()*9000);
END //
DELIMITER ;

CREATE TABLE orders(
order_id INT PRIMARY KEY AUTO_INCREMENT,
total_price INT
);

CREATE TABLE dishes(
dish_id INT PRIMARY KEY AUTO_INCREMENT,
price INT
);

CREATE TABLE order_items(
order_id INT,
dish_id INT
);

DELIMITER //
CREATE TRIGGER after_add_dish
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
UPDATE orders
SET total_price = total_price +
(SELECT price FROM dishes WHERE dish_id = NEW.dish_id)
WHERE order_id = NEW.order_id;
END //
DELIMITER ;

CREATE TABLE posts(
id INT AUTO_INCREMENT PRIMARY KEY,
content VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee(
id INT PRIMARY KEY,
name VARCHAR(50),
salary INT
);

DELIMITER //
CREATE TRIGGER prevent_negative_salary
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
IF NEW.salary < 0 THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Salary cannot be negative';
END IF;
END //
DELIMITER ;

CREATE TABLE employee_audit(
emp_id INT,
old_salary INT,
changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER employee_update_audit
AFTER UPDATE ON employee
FOR EACH ROW
BEGIN
INSERT INTO employee_audit(emp_id,old_salary)
VALUES(OLD.id,OLD.salary);
END //
DELIMITER ;