const express=require('express');
const router=express.Router();
const pool=require('../dbpool');

router.get('/', function (req,res) {
    var obj=req.query;
    console.log('obj', obj);
    pool.query('INSERT INTO dept SET ?', [obj], function (err, result) {
        if (err) throw err;
        console.log('result', result);
        if(result.affectedRows>0){
            res.send('Added successfully');  
        }
    })
})

module.exports=router;