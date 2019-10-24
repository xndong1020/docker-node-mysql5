const express = require('express');
const app = express();
// 引入body-parser中间件
const bodyParser=require('body-parser');
const userRouter = require('./routes/user.js');
// const addRouter=require('./routes/add.js');


// const path = path.join(__dirname, 'views');

const port = process.env.PORT || 8080;



app.use(express.static('public'));

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// 使用body-parser中间件，这样就能在提交表单的时候使用 req.body 拿到 数据
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRouter);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



