const express = require('express');
const pool = require('../dbpool');
var router = express.Router();
// 添加路由
// 1. 登陆接口， 是用restful的get方法
router.get('/v1/login/:uname&:upwd', (req, res) => {
  // get params
  const _uname = req.params.uname;
  const _upwd = req.params.upwd;
  const sql = 'select * from `xz_user` where `uname`=? and `upwd`=?';
  pool.query(sql, [_uname, _upwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log('111', result);
      res.send('1');
    } else {
      console.log('000', result);
      res.send('0');
    }
  });
});

// 2.userlist 查get 不需要参数
router.get('/v1/userlist', (req, res) => {
  const sql = 'select * from xz_user';
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 根据uid删除用户
router.delete('/v1/deluser/:uid', (req, res) => {
  const _uid = req.params.uid;
  const sql = 'delete from xz_user where uid=?';
  pool.query(sql, [_uid], (err, result) => {
    if (err) throw err;
    res.send('1');
  });
});

// 根据uid查询某一个用户信息  restful--get
router.get('/v1/queryuser/:uid', (req, res) => {
  const _uid = req.params.uid;
  const sql = 'select * from `xz_user` where uid=?';
  pool.query(sql, [_uid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send('0');
    }
  });
});

// 修改用户信息的接口 put
router.put('/v1/updateuser', (req, res) => {
  // 1. 接收前端传过来的信息
  const _uid = req.body.uid;
  const _uname = req.body.uname;
  const _upwd = req.body.upwd;
  const _phone = req.body.phone;
  const _email = req.body.email;
  const _user_name = req.body.user_name;
  const _gender = req.body.gender;
  // 2. sql语句
  const sql =
    'UPDATE `xz_user` SET uname=?, upwd=?, email=?, phone=?, user_name=?, gender=? WHERE uid=?';
  // 3. 连接池进行数据操作
  pool.query(
    sql,
    [_uname, _upwd, _email, _phone, _user_name, _gender, _uid],
    (err, result) => {
      if (err) console.log('err', err);
      console.log(result);
      res.send('1');
    }
  );
});

module.exports = router;
