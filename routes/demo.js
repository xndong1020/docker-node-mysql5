const express = require('express');
const pool = require('../dbpool');
var router = express.Router();
// 添加路由
// 1. 测试接口 myAjax
router.get("/ajaxDemo", function (req, res) {
  res.send("my first ajax program")
});
// 2. get method 的登陆
router.get("/get_login",(req, res)=>{
  const $uname=req.query.uname;
  const $upwd=req.query.upwd;
  if(!$uname){
    res.send("User name not exist")
    return
  }
  if(!$upwd){
    res.send("user pwd not exist")
    return
  }
  const sql="SELECT * FROM xz_user WHERE uname=? and upwd=?";
  pool.query(sql,[$uname, $upwd], (err, result)=>{
    if(result.length>0){
      res.send("1");
    }else{
      res.send("0");
    }
  })
})

// restful 规则的登陆
// /接口名称：参数值&：参数值
router.get("/login/:uname&:upwd", (req, res)=>{
  // 获取用户名和密码
  const $uname=req.params.uname;
  const $upwd=req.params.upwd;
  console.log($uname+"..."+$upwd)
  // 注意，restful 不能在后台进行非空验证，费用验证要在前台进行，节省服务器资源
});

// post login 接口 **一半restful是用post写注册，登陆一般是用get，这里只是作为练习
router.post("/post_login", (req, res)=>{
  const $uname=req.body.uname
  const $upwd=req.body.upwd
  if(!$uname){
    res.send("user name is required")
    return
  }
  if(!$upwd){
    res.send("pwd is required")
    return
  }

  const sql="select * from xz_user where uname=? and upwd=?";
  pool.query(sql, [$uname, $upwd],(err, result)=>{
    if(result.length>0){
      res.send("1");
    }else{
      res.send("0")
    }
  })
})

// userlist， 查询所有用户
router.get("/userlist", (req, res)=>{
  const sql="select * from xz_user"
  pool.query(sql, (err, result)=>{
    if(err) throw err;
    res.send(result);
  })
})

module.exports = router;
