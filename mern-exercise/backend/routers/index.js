const express = require('express');
const router = express.Router({
  strict:true,
  mergeParams: true,
  caseSensitive: true
});


router.get('/',(req,res,next)=>{
  res.send('hello');
});


module.exports = router;