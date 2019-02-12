
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs'); 
var _ = require('lodash');
var rh = require('./../Middleware/RequestHandler');
var session = require('./../Middleware/SessionHandler');
var router = express.Router();

router.get("/",session.session,(req,res)=>{
    var user = JSON.parse(req.session.currentuser);
    var options = {
        method: 'GET',
        uri: 'http://localhost:9999/Entry/',        
        json: true,
        resolveWithFullResponse: true,
        header:{
            'content-type': 'application/json',
            'x-auth':user.Token
        } // Automatically stringifies the body to JSON  
        
    };
    rh.SendRequest(options).then((response)=>{
        console.log(response.body);
    }).catch((ex)=>{
        console.log(ex.message);
    });
    res.render('Index.hbs',{ CurrentUser: user,FeedList : List });
});

module.exports = router;
