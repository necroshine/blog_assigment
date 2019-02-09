require('./config/config');

const express = require('express');
const parser = require('body-parser');


var userController = require('./Routes/UserController');
var entryController = require('./Routes/EntryController');

var app = express();
app.use(parser.json());

app.use("/User",userController);
app.use('/Entry',entryController)
 
app.listen(process.env.PORT,() => {
    console.log('Server start listening on 9999');
});

