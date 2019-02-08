const mongoose = require('mongoose');
const validator = require('validator');



var User = mongoose.model('User',{
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
    }
});

module.exports = {User};