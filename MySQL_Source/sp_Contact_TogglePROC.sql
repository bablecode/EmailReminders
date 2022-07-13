CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Contact_TogglePROC`(
	IN recordID INT
)
BEGIN
	UPDATE Contacts SET Processed = NOT Processed
	WHERE recUID = recordID;
END