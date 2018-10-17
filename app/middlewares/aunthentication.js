const { User } = require('../models/user');

const aunthenticateUser = function(req, res, next){
    let token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        // console.log(user);
        req.locals = {
            user,
            token
        }
        next();
    }).catch((err)=>{
        res.status(401).send(err);
    })
};

module.exports = {
    aunthenticateUser
}