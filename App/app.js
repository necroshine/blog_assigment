const express = require('express');
const hbs = require('hbs');
const _ = require('lodash');
var bodyParser = require('body-parser');
var home = require('./Controllers/HomeController');
var register = require('./Controllers/RegisterController');
var app = express();

hbs.registerPartials(__dirname + '/Views/shared');

app.set('view engine','hbs');

app.set('views',__dirname+'/views');
app.use(bodyParser.json({
    extended: true
  }));
app.use('/static',express.static('public'));
app.use('/Home',home); 
app.use('/Register',register); 

app.listen(8080,()=>{
    console.log('web app started at 8080');
});