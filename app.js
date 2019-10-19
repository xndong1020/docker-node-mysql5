const express = require("express");
const app = express();
const router = express.Router();
// const sequelize = require("./db");
const db = require('./database');

// const path = __dirname + "/views/";
const port = process.env.PORT || 8080;

// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path));


// now you can start using db query
// simple query
db.query("SELECT * FROM `dept`", function(err, results, fields) {
  console.log('err', results); // results contains rows returned by server
  console.log('results', results); // results contains rows returned by server
});


app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

app.listen(port, function() {
  console.log(`Example app listening on ${port}!`);
});
