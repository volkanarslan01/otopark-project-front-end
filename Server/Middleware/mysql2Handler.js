const mysql = require("mysql");

const config = {
  host: process.env.DB2_HOST,
  user: process.env.DB2_USER,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_DATABASE,
  multipleStatements: true,
  connectionLimit: 10,
};

const con = mysql.createPool(config);

module.exports = con;
