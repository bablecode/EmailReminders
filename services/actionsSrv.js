const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');


async function getActions(recordID){
  const sql = 'CALL sp_ActionsGetByClient(?)';
  const [rows, fields] = await db.query(sql,[recordID]);
  return rows[0];
};

//IN vClientID VARCHAR(255), vActionType INT, vNote VARCHAR(255), vcontactID INT
async function addAction(clientID, actionType, note, contactID){
  const sql = 'CALL sp_ActionCreate(?, ?, ?, ?)';
  const [rows, fields] = await db.query(sql,[clientID, actionType, note, contactID]);
  return rows[0];
};

module.exports = {
  getActions,
  addAction
}