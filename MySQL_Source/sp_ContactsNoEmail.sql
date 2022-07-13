CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ContactsNoEmail`()
BEGIN
SELECT 
	concat(lastName, ', ', firstName) as fullName, 
    recUID, 
    clientID, 
    address, 
    Coalesce(phone,'') as phone,
    Coalesce(email,'') as email, 
    clientStatusID, 
    processed, 
    include
FROM contacts as c join ImportLog as i on c.ImportID = i.ImportID
WHERE i.StatusID=16 AND (c.email IS NULL OR c.email = '')
ORDER BY lastName ASC, firstName ASC;
END