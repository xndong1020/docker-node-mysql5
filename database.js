// get the client
const mysql = require("mysql2");

// create the connection to database 创建连接对象
const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: 'pass',
  database: "xz"
});

module.exports = connection