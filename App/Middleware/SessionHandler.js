var sessionManager = (req,res,next) => {
    
    var currentUser = req.session.CurrentUser;
    if(!currentUser)
    {
        return Promise.reject();
    }
    var token = req.session.UserToken;
    if(!token)
    {
        return Promise.reject();
    }
    next();
    
};

module.exports = sessionManager;