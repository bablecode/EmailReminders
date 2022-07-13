CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Import_Main`()
BEGIN

DECLARE var_ImportLogID INT;
DECLARE var_Contact_recUID INT;
DECLARE var_ClientID varchar(25);
DECLARE var_r1Date varchar(15);
DECLARE var_r1Desc varchar(255);
DECLARE finished INT DEFAULT FALSE;

DECLARE tempRecords CURSOR FOR SELECT DISTINCT clientid from importtemp;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

-- clear temp table
-- import CSV to temp table
--		Error - Exit
-- start transaction

-- -------ImportLog

-- Close open ImportLog record
UPDATE ImportLog SET StatusID = 17 WHERE StatusID = 16;
-- Create new ImportLog record
INSERT INTO ImportLog SET ImportDate = current_time(), StatusID = 16;
-- Get new ImportLog ID
SELECT LAST_INSERT_ID() INTO var_ImportLogID;

-- -------Transform temp to Contacts and Patients tables
-- Loop on ClientID
OPEN tempRecords;
temp_loop:LOOP
    FETCH tempRecords INTO var_ClientID;
	IF finished THEN LEAVE temp_loop;
	END IF;
	CALL sp_Import_Reminder_AddContact(var_ClientID, var_ImportLogID);
	--    Get new contact recUID
	SELECT LAST_INSERT_ID() INTO var_Contact_recUID;
    -- Add patients
	CALL sp_Reminder_AddPatients(var_ClientID, var_Contact_recUID, var_ImportLogID);
END LOOP temp_loop;
CLOSE tempRecords;
-- create import action records for all new contact imports
CALL sp_Reminder_AddActions();

END