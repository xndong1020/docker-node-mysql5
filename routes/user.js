const express = require('express');
const pool = require('../dbpool');
var router = express.Router();

//------------------------------- start: create user & redirect to details after register successfully (use uid to search for user) ----------------------------------------------
router.get('/reg', function(req, res, next) {
  // 给用户生成一个表单
  res.render('user_reg', { title: 'User register' });
});

router.post('/reg', (req, res) => {
  const obj = req.body;
  console.log(obj);
  // 验证 uname不为空
  // if (!obj.uname) {
  //   res.send({ code: 401, msg: 'uname required' });
  //   // 报错： Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  //   // 因为多次使用了send
  //   // 所以要加 return
  //   return;
  // }
  let i = 400;
  for (const key in obj) {
    if (!obj[key]) {
      i++;
      res.send({ code: 400, msg: `${key} + is required` });
      return
    }
  }

  pool.query('INSERT INTO xz_user SET ?', [obj], function(err, result) {
    if (err) {
      console.log('error has occurred', err);
      throw err;
    }
    // console.log('result', result);
    if (result.affectedRows > 0) {
      console.log('insertResult', result);
      // 获得刚刚生成的user id，因为uid是新生成的，所以不能用obj.uid的方法获得
      pool.query('SELECT MAX(uid) AS uid FROM xz_user', function(err, result) {
        const [rows, fields] = result;

        // console.log('newUserId', rows.uid);
        // console.log('user name',obj.uname)
        // console.log('user id', obj.uid)
        // console.log('result', result)
        res.redirect(`/user/details/${rows.uid}`);
      });
    }
  });
});

router.get('/details/:id', function(req, res, next) {
  const { id } = req.params;
  res.render('user_details', { title: `您的用户Id是 ${id}` });
});

//------------------------------- end: create user & redirect to details after register successfully----------------------------------------------
router.get('/login', function (req, res) {
  res.render('user_login', {title: 'User login'})
})
router.post('/login', function(req, res) {
  const obj = req.body;
  console.log(obj);
  if (!obj.uname) {
    res.send({ code: 401, msg: 'user name is required' });
    return;
  }
  if (!obj.upwd) {
    res.send({ code: 402, msg: 'user password is required' });
    return;
  }
  pool.query(
    'SELECT * FROM xz_user WHERE uname=? AND upwd=?',
    [obj.uname, obj.upwd],
    function(err, result) {
      if (err) throw err;
      console.log('login result', result);
      if (result.length > 0) {
        res.send({ code: 200, msg: 'login success' });
      } else {
        res.send({ code: 202, msg: 'uname or upwd error' });
      }
    }
  );
});

router.get('/details', function(req, res) {
  const obj = req.query;
  // console.log(obj);
  if (!obj.uid) {
    res.send({ code: 401, msg: 'uid is invalid' });
    return;
  }
  pool.query('SELECT * from xz_user WHERE uid=?', [obj.uid], function(
    err,
    result
  ) {
    if (err) throw err;
    res.send(result);
  });
  res.render('user_update', { title: 'User update' });
});

router.post('/update', function(req, res) {
  // 1.获取数据
  const obj = req.body;
  // console.log(obj);

  // 2.验证数据
  let i = 400;
  for (let key in obj) {
    if (!obj[key]) {
      i++;
      res.send({ code: i, msg: key + ' is required' });
      return;
    }
  }

  // 3.执行sql语句
  // 取出用户编号
  const uid = obj.uid;
  // 删除对象中的编号属性，因为uid一般不能修改
  delete obj.uid;
  console.log(obj);
  pool.query('UPDATE xz_user SET ? WHERE uid=?', [obj, uid], function(
    err,
    result
  ) {
    if (err) throw err;
    // console.log(result)
    if (result.affectedRows > 0) {
      res.redirect(`/user/list`)
      return
    } 
    else {
      res.send({ code: 201, msg: 'Update error' });
    }
  });
});

router.get('/list', function (req, res, next) {
  res.render('user_list', {title: 'User list'})
})

router.post('/list', function(req, res) {
  const obj = req.body;
  console.log(obj);
  let { count, pageNo } = obj;
  if (!count) {
    count = 2;
  }
  if (!pageNo) {
    pageNo = 1;
  }
  // 转整型
  count = parseInt(count);
  pageNo = parseInt(pageNo);

  // 计算开始 - 不同也从哪个数据开始显示
  var start = (pageNo - 1) * count;
  // 执行sql语句
  pool.query('SELECT * FROM xz_user LIMIT ?, ?', [start, count], function(
    err,
    result
  ) {
    if (err) throw err;
    console.log(result)
    res.send(JSON.stringify(result));
  });
});

router.get('/delete', function (req, res) {
  res.render('user_delete', {title: 'User delete'})
})

router.post('/delete', function(req, res) {
  const obj = req.body;
  console.log(obj);
  if (!obj.uid) {
    res.send({ code: 401, msg: 'uid is required' });
    return;
  }
  pool.query('DELETE from xz_user WHERE uid=?', [obj.uid], function(
    err,
    result
  ) {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: 'Deleted' });
    } else {
      res.send({ code: 201, msg: 'delete error' });
    }
  });
});

module.exports = router;
