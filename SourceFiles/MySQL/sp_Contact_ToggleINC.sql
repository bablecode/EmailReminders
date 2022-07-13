CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Contact_ToggleINC`(
	IN recordID INT
)
BEGIN
	UPDATE Contacts SET Include = NOT Include
	WHERE recUID = recordID;
END