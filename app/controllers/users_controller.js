const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const {aunthenticateUser} = require('../middlewares/aunthentication')

router.post("/", (req, res)=>{
    // res.send("You reached User model.")
    let user = new User(req.body);
    user.save().then((user)=>{
        // console.log(user);
        return user.generateToken();
    }).then((token)=>{
        // console.log(token);
        res.header('x-auth', token).send(user.shortInfo());
    }).catch((err)=>{
        res.send(err);
    })
});

router.get('/', (req, res)=>{
    User.find().then((user)=>{
        // console.log(user)
        res.send(user);
    }).catch((err)=>{
        res.send(err);
    })
});

router.delete('/:id', (req, res)=>{
    User.findOneAndRemove({_id:req.params.id}).then((user)=>{
        if(user){
            res.send({
                user,
                notice:`User Deleted Succesfully. `
            })
        }else{
            res.send({
                notice:`User not exist.`
            })
        }
    }).catch((err)=>{
        res.send(err);
    })
});


// LOGOUT
router.delete('/logout', aunthenticateUser, (req, res)=>{
    let user = req.locals.user;
    let token = user.locals.token;
    let activeToken = user.tokens.find(function(inDbtoken){
        return inDbtoken.token == token;
    });
    user.tokens.id(activeToken._id).remove();
    user.save().then((user)=>{
        res.send(`your succesfully loged-out.`);
    }).catch((err)=>{
        res.send(err);
    })
})

router.get('/orders', aunthenticateUser, (req, res)=>{
    // console.log(req.header('x-auth'));
    // console.log(req.query);  if u sending your token in URL , u can acces it via req.quary
    // console.log(res);
    console.log(req.locals)
    res.send('Your in orders list page.')
})

module.exports = {
    usersController:router
}