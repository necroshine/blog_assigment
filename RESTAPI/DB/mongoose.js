var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin:9562757@microblog-hku9i.mongodb.net/test?retryWrites=true',{useNewUrlParser: true},(err)=>{
    if(err)
    {
        console.log(`Error while connecting to MongoDB: ${err.message}`);
    }
    else
    {
        console.log('MongoDB connected.');
    }
});

module.exports = {mongoose};

