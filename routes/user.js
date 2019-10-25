const express = require('express');
const pool = require('../dbpool');
var router = express.Router();



router.get('/test/:id', function(req, res, next) {
  const { id } = req.params
  res.render('user_reg', { title: `Redirect from post method` });
});

router.post('/redirect', (req, res) => {
  // 使用POSTMAN，或者表单  向该路径/user/redirect发一个request, 会跳转到上面的/user/test/1 路径
  res.redirect('/user/test/1'); 
})

router.get('/reg', function(req, res, next) {
  
  // const obj = req.body;
  
  // // 验证 uname不为空
  // if (!obj.uname) {
  //   res.send({ code: 401, msg: 'uname required' });
  //   // 报错： Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  //   // 因为多次使用了send
  //   // 所以要加 return
  //   return;
  // }
  // if (!obj.upwd) {
  //   res.send({ code: 402, msg: 'upwd required' });
  //   return;
  // }
  // if (!obj.phone) {
  //   res.send({ code: 403, msg: 'phone required' });
  //   return;
  // }
  // if (!obj.email) {
  //   res.send({ code: 404, msg: 'email required' });
  //   return;
  // }
  // pool.query('INSERT INTO xz_user SET ?', [obj], function(err, result) {
  //   if (err) throw err;
  //   // console.log('result', result);
  //   if (result.affectedRows > 0) {
  //     res.send({ code: 200, msg: 'register successfully' });
  //   }
  // });
  res.render('user_reg', { title: 'User register' });
});

// router.post('/login', function(req, res) {
//   const obj = req.body;
//   console.log(obj);
//   if (!obj.uname) {
//     res.send({ code: 401, msg: 'user name is required' });
//     return;
//   }
//   if (!obj.upwd) {
//     res.send({ code: 402, msg: 'user password is required' });
//     return;
//   }
//   pool.query(
//     'SELECT * FROM xz_user WHERE uname=? AND upwd=?',
//     [obj.uname, obj.upwd],
//     function(err, result) {
//       if (err) throw err;
//       console.log('login result', result);
//       if (result.length > 0) {
//         res.send({ code: 200, msg: 'login success' });
//       } else {
//         res.send({ code: 202, msg: 'uname or upwd error' });
//       }
//     }
//   );
// });

// router.get('/detail', function(req, res) {
//   const obj = req.query;
//   // console.log(obj);
//   if (!obj.uid) {
//     res.send({ code: 401, msg: 'uid is invalid' });
//     return;
//   }
//   pool.query('SELECT * from xz_user WHERE uid=?', [obj.uid], function(
//     err,
//     result
//   ) {
//     if (err) throw err;
//     res.send(result);
//   });
//   res.render('user_reg', { title: 'User register' });
// });

// router.post('/update', function(req, res) {
//   // 1.获取数据
//   const obj = req.body;
//   // console.log(obj);

//   // 2.验证数据
//   let i = 400;
//   for (let key in obj) {
//     // console.log(key, obj[key])
//     if (!obj[key]) {
//       i++;
//       res.send({ code: i, msg: key + ' is required' });
//       return;
//     }
//   }

//   // 3.执行sql语句
//   // 取出用户编号
//   const uid = obj.uid;
//   // 删除对象中的编号属性，因为uid一般不能修改
//   delete obj.uid;
//   console.log(obj);
//   pool.query('UPDATE xz_user SET ? WHERE uid=?', [obj, uid], function(
//     err,
//     result
//   ) {
//     if (err) throw err;
//     // console.log(result)
//     if (result.affectedRows > 0) {
//       res.send({ code: 200, msg: 'Update successful' });
//     } else {
//       res.send({ code: 201, msg: 'Update error' });
//     }
//   });
// });

// router.get('/list', function(req, res) {
//   const obj = req.query;
//   console.log(obj);
//   let { count, pageNo } = obj;
//   if (!count) {
//     count = 2;
//   }
//   if (!pageNo) {
//     pageNo = 1;
//   }
//   // 转整型
//   count = parseInt(count);
//   pageNo = parseInt(pageNo);

//   // 计算开始 - 不同也从哪个数据开始显示
//   var start = (pageNo - 1) * count;
//   // 执行sql语句
//   pool.query('SELECT * FROM xz_user LIMIT ?, ?', [start, count], function(
//     err,
//     result
//   ) {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// router.get('/delete', function(req, res) {
//   const obj = req.query;
//   console.log(obj);
//   if (!obj.uid) {
//     res.send({ code: 401, msg: 'uid is required' });
//     return;
//   }
//   pool.query('DELETE from xz_user WHERE uid=?', [obj.uid], function(
//     err,
//     result
//   ) {
//     if (err) throw err;
//     console.log(result);
//     if (result.affectedRows > 0) {
//       res.send({ code: 200, msg: 'Deleted' });
//     } else {
//       res.send({ code: 201, msg: 'delete error' });
//     }
//   });
// });



module.exports = router;
