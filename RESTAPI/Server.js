var express = require('express');
var parser = require('body-parser');

var {mongoose} = require('./DB/mongoose');

var app = express();



app.listen(9999,() => {
    console.log('Server start listening on 9999');
});

