const mongoose = require('mongoose');
const _ = require('lodash');
var UserSchema = require('./../Models/UserSchema');

module.exports = function (EntrySchema)
{
    EntrySchema.statics.getEntries = function(userSchema) {
        var followingList = userSchema.Followings;           
        var entry = this;
     
        var values = new Array();
        for(var i =0;i<followingList.length;i++)
        {
            values.push(followingList[i].FollowingID);
        }
        
        return entry.aggregate([
            {$match: {$or: [ {Owner: userSchema._id},  {Owner: { $in: values }}]}},
            {$lookup:{
                from: "users",
                localField : "Owner",
                foreignField: "_id",
                as: "UserInfo"
            }},
            {$project:{
                'UserInfo.tokens':0,
                'UserInfo.Password':0,
                'UserInfo.Followers':0,
                'UserInfo.Followings':0
            }},
            {$sort:{CreateDate:-1}}
            
        ]);
    };
} 