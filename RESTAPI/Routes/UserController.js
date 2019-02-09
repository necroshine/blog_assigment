require('../config/config');
var express = require('express');
var UserSchema = require('./../Models/UserSchema');
var authenticate = require('./../Middleware/Authenticate');

var router = express.Router();

router.use(authenticate);

router.get('/',function(req,res){
    res.json({
        Message: 'Get User Controller'
    });
})


module.exports = router;