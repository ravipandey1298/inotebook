const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

  const User = mongoose.model('user', userSchema)
  // Using this we can create index in our Database if we did not want any index in our application we don't have to use this createIndexes();
  User.createIndexes();
  module.exports = User;