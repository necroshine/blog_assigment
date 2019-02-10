const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('bcryptjs');

module.exports = function (UserSchema) {

    UserSchema.methods.addFollowing = function(FollowingID){
        var user = this;
        return user.updateOne({
        $push:{
            Followings: {FollowingID}
        }
        });
    };
    UserSchema.methods.removeFollowing = function(FollowingID){
        var user = this;
        return user.updateOne({
        $pull:{
            Followings: {FollowingID}
        }
        });
    };
    UserSchema.methods.removeToken = function (token) {
        var user = this;

        return user.updateOne({
            $pull: {
                tokens: { token }
            }
        });
    };

    UserSchema.methods.toJSON = function () {
        var user = this;
        var userObject = user.toObject();

        return _.pick(userObject, ['_id', 'DisplayName', 'AccountName', 'Email', 'Followers', 'Followings']);
    };

    UserSchema.statics.findByToken = function (token) {
        var User = this;
        var decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            return Promise.reject();
        }

        return User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        },{'Followings._id':0});

    };

    UserSchema.methods.generateAuthToken = function () {

        var user = this;
        var access = 'auth';
        var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

        user.tokens = user.tokens.concat([{ access, token }]);

        return user.save().then(() => {

            return token;
        });
    };
    UserSchema.statics.findByCredentials = function (Email, Password) {
        var User = this;

        return User.findOne({ Email }).then((user) => {

            if (!user) {
                return Promise.reject();
            }

            return new Promise((resolve, reject) => {
                crypto.compare(Password, user.Password, (err, res) => {

                    if (res) {
                        resolve(user);
                    }
                    else {
                        reject();
                    }
                });
            });


        });
    };
};
