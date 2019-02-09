var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true},(err)=>{
    if(err)
    {
        console.log(`Error while connecting to MongoDB: ${err.message}`);
    }
    else
    {
        console.log('MongoDB connected.');
    }
});

module.exports = mongoose;

