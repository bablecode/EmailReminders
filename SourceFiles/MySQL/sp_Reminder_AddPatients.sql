CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Reminder_AddPatients`(
IN vClientID varchar(15), vContactRecUID INT, vImportID INT
)
BEGIN

INSERT INTO Patients(recUIDContact, PatientName, CSPatientID, ServiceDesc, clientID, ImportID, DueDate, Include)
select vContactRecUID, petname, 0, Reminder, clientID, vImportID, STR_TO_DATE(RemDate, '%m/%d/%Y') as d, 1
FROM
(SELECT ClientID, 
	petname,
	reminder1date as RemDate,
    reminder1 as Reminder
    FROM importtemp
    WHERE ClientID = vClientID AND reminder1date > ''
UNION ALL
SELECT ClientID, 
	petname,
    reminder2date,
    reminder2
    FROM importtemp
    WHERE ClientID = vClientID AND reminder2date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder3date,
    reminder3
    FROM importtemp
    WHERE ClientID = vClientID AND reminder3date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder4date,
    reminder4
    FROM importtemp
    WHERE ClientID = vClientID AND reminder4date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder5date,
    reminder5
    FROM importtemp
    WHERE ClientID = vClientID AND reminder5date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder6date,
    reminder6
    FROM importtemp
    WHERE ClientID = vClientID AND reminder6date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder7date,
    reminder7
    FROM importtemp
    WHERE ClientID = vClientID AND reminder7date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder8date,
    reminder8
    FROM importtemp
    WHERE ClientID = vClientID AND reminder8date > ''
UNION ALL
SELECT ClientID, 
	petname,    
    reminder9date,
    reminder9
FROM importtemp
WHERE ClientID = vClientID AND reminder9date > '') as t;


END