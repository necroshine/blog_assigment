require('../config/config');
var express = require('express');
var authenticate = require('./../Middleware/Authenticate'); 

var router = express.Router();

router.use(authenticate);

router.get('/',function(req,res){
    res.json({
        Message: 'Get Entry Controller'
    });
})


module.exports = router;