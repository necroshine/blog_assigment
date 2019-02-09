const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('bcryptjs');

module.exports = function(UserSchema) {
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch(e){
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

};
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(() => {
        return token;
    });
};
UserSchema.statics.findByCredentials = function(email,password) {
    var User = this;
    
    return User.findOne({email}).then((user) => {
        if(!user)
        {
            return Promise.reject();
        }
        return new Promise((resolve,reject) => {
            crypto.compare(password,User.password,(err,res) =>{
                if(res)
                {
                    resolve(User);
                }
                else
                {
                    reject();
                }
            });
        });
    });    
};
};
