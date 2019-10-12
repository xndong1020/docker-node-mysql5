const Sequelize = require("sequelize");

const {
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DB
} = process.env;

// // Option 2: Passing a connection URI
// const db = new Sequelize("db://nicole:pass@localhost:3306/nicole_app");

// const sequelize = new Sequelize("nicole_app", "root", "pass", {
//   host: "db",
//   dialect: "mysql"
// });

const sequelize = new Sequelize(`${MYSQL_DB}`, `root`, `${MYSQL_PASSWORD}`, {
  host: "db",
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
