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

module.exports = router;
