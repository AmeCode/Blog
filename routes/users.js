const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const passportConfig = require('../config/passport')

// register
router.post('/register',(req,res,next)=>{

  let newUser= new User({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
  });
  /*newUser.save((res,err)=>{
    if(err){
      res.json({success:false,msg:err})
    }
    else {
      res.json({success:true,msg:'added a new user!'})
    }
  })*/
  User.addUser(newUser,(err,user)=>{
    if(err){
      res.json({success:false,msg:err})
    }
    else {
      res.json({success:true,msg:'added a new user!'})
    }
  });
});
// profile
/*router.route('/profile')
  .get(passport.authenticate('jwt', { session: false },(req,res,next)=>{
    res.json({message:'hello'})
  }));*/
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  res.json({user:req.user})
});
// authenticate
router.post('/authenticate',(req,res,next)=>{
 const username=req.body.username;
 const password=req.body.password;
 User.getUserByUsername(username,(err,user)=>{
   if(err) throw err;
   if(!user){
     return res.json({success:false,msg:'User not found'});
   }
   User.comparePassword(password,user.password,(err,isMatched)=>{
     if(err) throw err;
     if(isMatched) {
       //payload is expected to be a plain object, so we use .toJSON()
       const Token=jwt.sign(user.toJSON(),config.secret,{expiresIn: 800000});

       res.json({
         success:true,
         token: 'JWT '+Token,
         user:{
           id:user._id,
           name:user.name,
           email:user.email
         }
       })
     }
     else return res.json({success:false,msg:'Wrong Password'});
   })
 })
});

module.exports = router;
