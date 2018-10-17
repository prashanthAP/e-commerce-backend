// Creating user model with following fields
// username
// email
// password : encrypted and store 

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        maxlength:64,
        minlength:4,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // validate property allow to create own validation.
        validate:{
            validator: function(value){
                return validator.isEmail(value);
            },
            message:function(){
                return `Invalid Email formate`;
            }
        }
        
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:120
    },
    tokens:[{token:{type:String}}]
});


// model level pre-post hook methods 
userSchema.pre('save', function(next){
    let user = this;;
    bcrypt.genSalt(10).then((salt)=>{
        bcrypt.hash(user.password, salt).then((hashed)=>{
            user.password = hashed;
            next();
        })
    }).catch((err)=>{
        res.send(err)
    })
})


//TokenGeneration instance Method 
userSchema.methods.generateToken = function(next){
    let user = this;
    let tokendata = {
        _id:user.id
    };
    let token = jwt.sign(tokendata, 'super12345');
    user.tokens.push({token});
    return user.save().then(()=>{
        return token;
    })
}

// Instance method 
userSchema.methods.shortInfo = function(){
    let user = this;
    console.log(user);
    return {
        username:user.username,
        email:user.email,
        _id:user.id
    }
}

// Statics Method.
userSchema.statics.findByToken = function(token){
    let User = this;
    // console.log(token);
    let tokendata;
    try{
       tokenData = jwt.verify(token, "super12345");
        // console.log(token);
        // console.log(tokenData);
    }catch(e){
        return Promise.reject(e);
    }

    return User.findOne({
        _id:tokenData._id,
        "tokens.token":token
    }).then((user)=>{
        if(user){
            return Promise.resolve(user);
        }else{
            return Promise.reject(user);
        }
    })
}
// creating user model 
const User = mongoose.model("User", userSchema);

module.exports = {
    User
}