var rp = require('request-promise');

var SendRequest = function(options) {
   return rp(options).then(function(res){
        return new Promise((resolve,reject)=>{
            if(res)
            {
                resolve(res);
            }
            else
            {
                reject();
            }
        });
    });
};

module.exports = {SendRequest};