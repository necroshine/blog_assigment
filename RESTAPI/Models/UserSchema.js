const {ObjectID} = require('mongodb');
const mongoose = require('./../DB/mongoose');
const validator = require('validator');
const crypto = require('bcryptjs');

var UserSchema = mongoose.Schema({
    DisplayName:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    AccountName:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    Email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }

    },
    Password:{
        type: String,
        required: true,        
        minlength: 6,
        unique: true,
    },
    tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }],
      Followers: [{
          FollowerID: {
              type: ObjectID
          }
      }],
      Followings: [{
        FollowingID: {
            type: ObjectID
        }
    }]

});

require('./../Middleware/User')(UserSchema);


UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('Password'))
    {       
        crypto.genSalt(10,(err,salt)=>{
            crypto.hash(user.Password,salt,(err,hash)=>{                
                user.Password=hash;
 
                next();
            });
        });
    }
    else
    {
        next();
    }

});
var User = mongoose.model('User', UserSchema);

module.exports = User;