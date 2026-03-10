-- days between dates
SELECT DATEDIFF(end_date,start_date) AS total_days
FROM projects;

-- expiry after 30 days
SELECT DATE_ADD(CURDATE(), INTERVAL 30 DAY) AS expiry_date;

-- date before 7 days
SELECT DATE_SUB(CURDATE(), INTERVAL 7 DAY);

-- weekend records
SELECT *
FROM orders
WHERE DAYOFWEEK(created_at) IN (1,7);

-- convert string date and show month name
SELECT MONTHNAME(STR_TO_DATE('15-04-2025','%d-%m-%Y'));