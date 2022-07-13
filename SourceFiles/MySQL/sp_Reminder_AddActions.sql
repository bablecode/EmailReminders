CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Reminder_AddActions`()
BEGIN
	INSERT INTO actions(ActionType, Note, recUIDContact, ClientID) 
	Select 15, 'SYSTEM IMPORT', contactID, clientID FROM
	(SELECT recUID as contactID, clientID 
		FROM contacts c
		join importlog i on c.importid = i.importid
		WHERE i.statusID = 16) as t;
END