// const mysql = require('mysql');
const mysql = require('mysql2/promise');
const config = require('../config/config'); 

const pool = mysql.createPool(config.db)

async function query(sql, params) {
  const data = await pool.execute(sql,params);
  //err handler

  return data;
}


// async function query(sql, params) {
//   const connection = await mysql.createConnection(config.db);
//   connection.config.namedPlaceholders = true;
//   const data = await connection.execute(sql,params);
//   //err handler
//   return data;
// }


module.exports = {
  query
}