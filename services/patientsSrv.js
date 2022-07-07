const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');


// const getPatients = async (req, res) => {
//   const sql = 'CALL sp_getPatients(?)';
//   const [rows, fields] = await db.query(sql,req.params.id);
//   res.status(200).json(rows[0]);
// };

async function getPatients(recordID){
  const sql = 'CALL sp_getPatients(?)';
  const [rows, fields] = await db.query(sql,[recordID]);
  return rows[0];
};

async function Patient_ToggleINC(recID){
  const sql = 'CALL sp_Patient_ToggleINC(?)';
  let parms=[];
  parms[0] = recID;
  const data = await db.query(sql,parms);
  return data;
}


module.exports = {
  getPatients,
  Patient_ToggleINC
}