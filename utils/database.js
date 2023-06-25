const mysql = require("mysql2/promise");

// create the connection to database
const dbConnection = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_USERNAME,
  port: process.env.MYSQL_DB_PORT,
});

module.exports = dbConnection;
