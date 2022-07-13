CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ContactsPastDue`()
BEGIN
SELECT DISTINCT
	concat(lastName, ', ', firstName) as fullName, 
    c.recUID, 
    c.clientID, 
    address, 
    Coalesce(phone,'') as phone,
    Coalesce(email,'') as email, 
    clientStatusID, 
    processed, 
    c.include
FROM contacts as c join ImportLog as i on c.ImportID = i.ImportID 
	LEFT JOIN Patients as p on c.recUID = p.recUIDContact
WHERE Date(p.DueDate) < CURDATE();
END