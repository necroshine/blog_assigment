var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs'); 

var router = express.Router();

router.get("/",(req,res)=>{
    res.render('Home.hbs');
})

module.exports = router;