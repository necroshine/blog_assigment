var UserSchema = require('./../Models/UserSchema');
 
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
  
    UserSchema.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      next();
    }).catch((e) => {
      res.status(401).send('Invalid Operation');
    });
  };
  
  module.exports = authenticate

