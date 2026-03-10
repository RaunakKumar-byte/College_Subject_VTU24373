-- net salary after 10% tax
DELIMITER //
CREATE FUNCTION net_salary(salary INT)
RETURNS INT
DETERMINISTIC
BEGIN
RETURN salary - (salary * 0.10);
END //
DELIMITER ;

---------------------------------------------

-- user activity
DELIMITER //
CREATE FUNCTION user_status(last_login DATE)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
IF DATEDIFF(CURDATE(),last_login) <= 30 THEN
RETURN 'Active';
ELSE
RETURN 'Inactive';
END IF;
END //
DELIMITER ;

---------------------------------------------

-- tax slab
DELIMITER //
CREATE FUNCTION tax_calculation(salary INT)
RETURNS INT
DETERMINISTIC
BEGIN
DECLARE tax INT;

IF salary <= 300000 THEN
SET tax = 0;
ELSEIF salary <= 600000 THEN
SET tax = salary * 0.10;
ELSEIF salary <= 1000000 THEN
SET tax = salary * 0.20;
ELSE
SET tax = salary * 0.30;
END IF;

RETURN tax;
END //
DELIMITER ;

---------------------------------------------

-- experience category
DELIMITER //
CREATE FUNCTION experience_category(years INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
IF years < 2 THEN
RETURN 'Fresher';
ELSEIF years <= 5 THEN
RETURN 'Junior';
ELSEIF years <= 10 THEN
RETURN 'Mid';
ELSE
RETURN 'Senior';
END IF;
END //
DELIMITER ;

---------------------------------------------

-- late fee calculator
DELIMITER //
CREATE FUNCTION late_fee(days_late INT)
RETURNS INT
DETERMINISTIC
BEGIN
DECLARE fee INT;
SET fee = days_late * 50;

IF fee > 1000 THEN
SET fee = 1000;
END IF;

RETURN fee;
END //
DELIMITER ;