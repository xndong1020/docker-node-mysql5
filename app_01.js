const express = require("express");
const app = express();
const router = express.Router();
// const sequelize = require("./db");
// const db = require('./database');
const db=require('./dbpool');

// const path = __dirname + "/views/";
const port = process.env.PORT || 8080;

// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path));


// now you can start using db query
// simple query

db.query("UPDATE emp SET sex=1, salary=5000 WHERE eid=10", function(err, result){
  if (err) console.log('err occurred', err);
  console.log('result from update', result)
});
// db.query("INSERT INTO emp VALUES(NULL, 'sty', 1, '1999-7-1', 8000, 20)");

// 不推荐在query中直接给值，values单独给
// db.query("INSERT INTO emp VALUES(?,?,?,?,?,?)", [null, 'abcd', 1, '1999-7-1', 8000, 20], function(err, result){
//   if(err) throw err;
//   console.log(result);
// });

// 直接将对象插入数据库
var emp={
  ename:'ccc',
  birthday: '1995-2-3',
  sex:1,
  salary:9000
}

// db.query('INSERT INTO emp SET ?', [emp], function (err, result) {
//   if(err) throw err;
//   console.log(result);
// });

db.query('DELETE FROM emp WHERE ename="ccc"', function (err, result) {
  if(err) throw err;
  console.log('delete result', result)
});

db.query("SELECT * FROM `emp` WHERE ename='ccc' AND salary=9000", function(err, results, fields) {
  if (err) console.log('err occurred', err); // print err if there is any
  console.log('results from query', results); // results contains rows returned by server
});


app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

app.listen(port, function() {
  console.log(`Example app listening on ${port}!`);
});

