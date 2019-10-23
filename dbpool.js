// get the client
const mysql = require("mysql2");

// create the connection to database 创建连接对象
const pool = mysql.createPool({
  host: "db",
  user: "root",
  password: 'pass',
  database: "xz",
  connectionLimit:20 //设置连接池的大小
});

module.exports = pool