-- create default password
SELECT CONCAT(SUBSTRING_INDEX(email,'@',1),'123') AS password
FROM users;

-- clean contact numbers
SELECT REGEXP_REPLACE(contact,'[^0-9]','') AS valid_contact
FROM users;

-- normalize names
SELECT CONCAT(
UPPER(SUBSTRING(name,1,1)),
LOWER(SUBSTRING(name,2))
) AS normalized_name
FROM employees;

-- fallback contact
SELECT COALESCE(mobile,phone,email) AS contact
FROM users;

-- average experience per department
SELECT department,
AVG(TIMESTAMPDIFF(YEAR,joining_date,CURDATE())) AS avg_experience
FROM employees
GROUP BY department;