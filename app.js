const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyparser = require('body-parser');
const config = require('./config/database');
const mongoose = require('mongoose');
const users = require('./routes/users');
const app = express();
const port = 3000;
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>console.log('connected to database!'));
mongoose.connection.on('error',()=>console.log('error connecting to the database!!'));
app.listen(port,()=>{
  console.log("connected on port "+port)
});
app.get('/',(req,res)=>{
  res.send('connected to \/')
});
app.use(cors());
app.use(bodyparser.json());
app.use('/users',users);
app.use(express.static(path.join(__dirname,'public')));

