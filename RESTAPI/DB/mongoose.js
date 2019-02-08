var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:9562757@microblog-hku9i.mongodb.net/test?retryWrites=true'); 

module.exports = {mongoose};