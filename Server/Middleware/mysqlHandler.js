const mysql = require("mysql");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
  connectionLimit: 10,
};

const con = mysql.createPool(config);

module.exports = con;
