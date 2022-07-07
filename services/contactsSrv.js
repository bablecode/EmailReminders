const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');


async function getContacts(filterType){
  let sql;
  switch (filterType) {
    case 'ALL':
      sql = 'CALL sp_ContactsGetAll()';
      break;
    case 'EMAIL':
      sql = 'CALL sp_ContactsHasEmail()';
      break;
    case 'NOEMAIL':
      sql = 'CALL sp_ContactsNoEmail()';
      break;
    case 'PASTDUE':
      sql = 'CALL sp_ContactsPastDue()';
      break;
    case 'UNPROCESSED':
      sql = 'CALL sp_ContactsUnprocessed()';
      break;
    case 'PROCESSED':
      sql = 'CALL sp_ContactsProcessed()';
      break;
    case 'EXCLUDED':
      sql = 'CALL sp_ContactsExcluded()';
      break;
    default:
      break;
    
  };
  const [rows, fields] = await db.query(sql,[]);
  return rows[0];
};

//sp_Contact_ToggleINC(5)

async function Contact_ToggleINC(recID){
  const sql = 'CALL sp_Contact_ToggleINC(?)';
  let parms=[];
  parms[0] = recID;
  const data = await db.query(sql,parms);
  return data;
}


module.exports = {
  getContacts,
  Contact_ToggleINC
}