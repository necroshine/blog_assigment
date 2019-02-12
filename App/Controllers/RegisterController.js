
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs'); 
var _ = require('lodash');
var rh = require('./../Middleware/RequestHandler');

var router = express.Router();

router.get("/",(req,res)=>{
    res.render('Register.hbs');
});

router.post("/",(req,res)=>{
    var user = _.pick(req.body,['DisplayName','AccountName','Email', 'Password']);
 
    var options = {
        method: 'POST',
        uri: 'http://localhost:9999/User/Signup',
        body: user,
        json: true,
        resolveWithFullResponse: true,
        header:{
            'content-type': 'application/json'
        } // Automatically stringifies the body to JSON
    };
    rh.SendRequest(options).then((callbackResponse) => {                
        var authToken = callbackResponse.headers['x-auth'];
        var userObject = _.pick(callbackResponse.body,['DisplayName','AccountName','Email','_id','Followers','Followings']);
        console.log(req.session);        
        req.session.currentuser = JSON.stringify(userObject);
        req.session.token = authToken;
        console.log(req.session.token);
        res.status(200).send();
    }).catch((e)=>{
        console.log(e.message);
        res.status(400).send();
    });
});

module.exports = router;