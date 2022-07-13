CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActionsGetByClient`(
IN recID VARCHAR(255)
)
BEGIN
	Select ActionDate, Note, CodeDesc
FROM Actions join Codes ON ActionType = CodesID
WHERE ClientID = recID
ORDER BY ActionDate DESC;
END