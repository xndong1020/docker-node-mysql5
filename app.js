const express = require('express');
const path = require('path');
// 引入body-parser中间件
// const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');
// const addRouter=require('./routes/add.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;

// app.use(express.static('public'));

app.use(express.json());
// 使用body-parser中间件，这样就能在提交表单的时候使用 req.body 拿到 数据
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports=app;