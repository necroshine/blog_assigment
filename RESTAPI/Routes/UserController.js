require('../config/config');
var express = require('express');
var mongoose = require('./../DB/mongoose');
var UserSchema = require('./../Models/UserSchema');
var authenticate = require('./../Middleware/Authenticate');
const _ = require('lodash');
var router = express.Router();


router.get('/me',authenticate,function(req,res){
    res.json({
        Message: 'Get User Controller'
    });
})

router.post('/Signup',function(req,res){
    var body = _.pick(req.body,['DisplayName','AccountName','Email','Password']);
    var user = new UserSchema(body);
     
    user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400).send(e);
      })
});

router.post('/Login',function (req,res){
    var body = _.pick(req.body, ['Email', 'Password']);

    UserSchema.findByCredentials(body.Email,body.Password).then((user)=>{
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        });
    }).catch((e) => {
        console.log(e);
        res.status(401).send();
    });

});

router.post('/Logout', authenticate, function(req,res){
    console.log(req.user);
   req.user.removeToken(req.token).then(()=>{
       res.status(200).send();
   },() => {
       res.status(400).send();
   })
});

router.post('/Follow',authenticate,function(req,res){

});

router.post('/Unfollow',authenticate,function(req,res){

});

module.exports = router;