const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyparser = require('body-parser');
const config = require('./config/database');
const mongoose = require('mongoose');
const users = require('./routes/users');
const CircularJSON = require('circular-json');
const app = express();
const port = 8080;
mongoose.connect(config.database,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>console.log('connected to database!'));
mongoose.connection.on('error',()=>console.log('error connecting to the database!!'));
app.listen(port,()=>{
  console.log("connected on port "+port)
});
app.get('/',(req,res)=>{
  res.send('connected to \/')
});
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
});
app.use(cors());
app.use(bodyparser.json());
app.use('/users',users);
app.use(express.static(path.join(__dirname,'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
