require('../config/config');
var express = require('express');
var authenticate = require('./../Middleware/Authenticate'); 
var EntrySchema = require('./../Models/EntrySchema');
const _ = require('lodash');
var router = express.Router();

router.use(authenticate);

router.get('/',authenticate,function(req,res){
    EntrySchema.getEntries(req.user).then((entries) => {
        res.status(200).send(entries);
    }).catch((e)=>{
        console.log(e);
        res.status(400).send();
    });
});


router.post('/Post',authenticate,(req,res) => {
    var user = req.user;
    var body = _.pick(req.body,['Title','Text']);
   // console.log(body);
    var entry = new EntrySchema(body);
    entry.Owner = user._id;
    entry.save().then((doc) => {
        res.status(200).send(doc);
    },()=>{
        res.status(400).send();
    });
});



module.exports = router;