// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: 'pass',
  database: "tedu"
});

module.exports = connection