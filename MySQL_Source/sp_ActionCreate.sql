CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActionCreate`(
IN vClientID VARCHAR(255), vActionType INT, vNote VARCHAR(255), vcontactID INT
)
BEGIN
	INSERT INTO Actions(ActionType, Note, recUIDcontact, ClientID) 
	VALUES(vActionType, vNote, vcontactID, vClientID);
END