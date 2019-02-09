const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = mongoose.Schema({
    displayname:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    accountname:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email:{
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
    password:{
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
      }]
});

require('./../Middleware/User')(UserSchema);


UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password'))
    {
        crypto.genSalt(10,(err,salt)=>{
            crypto.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                next();
            });
        });
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;