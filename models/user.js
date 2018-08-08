const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
  name:{type: String, required: true},
  email:{type: String, required: true},
  username:{type: String, required: true, unique:true},
  password:{type: String, default: '', required:true}
});
/* handles Validation otherwise Validation error*/
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
const User = module.exports= mongoose.model('User',UserSchema);
module.exports.getUserById= function (id, callback) {
  User.findOne({ _id: id },callback);
};
module.exports.getUserByUsername= function(username,callback){
  const query={username:username};
  User.findOne(query,callback);
};
module.exports.addUser= function (newUser, callback) {
  newUser.save(callback);
};
module.exports.comparePassword= function (candidatePassword,hash,callback) {
  bcrypt.compare(candidatePassword,hash,(err,isMatched)=>{
    if(err) throw err;
    callback(null,isMatched);
  })
}
