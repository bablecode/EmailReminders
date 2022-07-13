CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Import_Reminder_AddContact`(
IN vClientID VARCHAR(25), vImportID INT
)
BEGIN
INSERT INTO Contacts(LastName, FirstName, Address, Email, ClientID, ClientStatusID, Processed, Include, ImportID)
SELECT DISTINCT substring_index(name,' ', -1) as LastName, 
	left(name,(length(name)-length(substring_index(name,' ', -1)))) as FirstName,
    concat(address, ',',city,' ',state) as address,
    emailaddr,
    clientID as clientID,
    19,
    0,
    if(length(emailaddr)=0,0,1) as inc,
    vImportID
FROM importtemp
WHERE clientID = vClientID;
END