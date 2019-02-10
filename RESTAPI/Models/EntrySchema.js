const {ObjectID} = require('mongodb');
const mongoose = require('./../DB/mongoose');
const validator = require('validator'); 

var EntrySchema = mongoose.Schema(
    {
        Title:{
            type:String,
            require:true,
            trim:true,
            minlength:1
        },
        Text:{
            type:String,
            require:true,
            trim:true,
            minlength:1
        },
        CreateDate:{
            type:Date,
            require:true,
            trim:true,
            default: Date.now
        },
        Owner:{
            type: mongoose.Schema.Types.ObjectId,
            require:true
        }
    }
);

require('./../Middleware/Entry')(EntrySchema); 

var Entry = mongoose.model('Entry',EntrySchema);

module.exports = Entry;