const express = require('express');
const router = express.Router();
// register
router.get('/register',(req,res,next)=>{
  res.send('connected to \/register ');
});
// profile
router.get('/profile',(req,res,next)=>{
  res.send('connected to \/profile');
});
// authenticate
router.get('/authenticate',(req,res,next)=>{
  res.send('connected to \/authenticate')
});
// validate
router.get('/validate',(req,res,next)=>{
  res.send('connected to \/validate')
});

module.exports = router;
