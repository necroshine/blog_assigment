const express = require('express');
var session = require('express-session');
const hbs = require('hbs');
const _ = require('lodash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var home = require('./Controllers/HomeController');
var register = require('./Controllers/RegisterController');
var app = express();

hbs.registerPartials(__dirname + '/Views/shared');

app.set('view engine','hbs');
app.set('trust proxy',1);
app.use(cookieParser());
app.use(session({
  secret: 'ApplicationSecretKey',
  resave:false,
  saveUninitialized: true,
  cookie:{secure:true}
}));
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