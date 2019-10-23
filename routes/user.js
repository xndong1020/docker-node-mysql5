const express=require('express');
const pool=require('../dbpool');
var router=express.Router();

router.post('/reg', function(req,res){
    var obj=req.body;
    // 验证 uname不为空
    if(!obj.uname){
        res.send({code: 401, msg: 'uname required'});
        // 报错： Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
        // 因为多次使用了send
        // 所以要加 return
        return;
    } 
    if(!obj.upwd){
        res.send({code: 402, msg: 'upwd required'})
        return;
    }
    if(!obj.phone){
        res.send({code: 403, msg: 'phone required'})
        return;
    }
    if(!obj.email){
        res.send({code: 404, msg: 'email required'})
        return;
    }
    pool.query('INSERT INTO ')

    res.send('register successfully');
})

module.exports = router;

