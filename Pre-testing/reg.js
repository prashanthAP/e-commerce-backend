const bcrypt = require('bcryptjs');
// console.log(bcrypt);
 let password = `prashh1234`;

 bcrypt.genSalt(10).then((hashed)=>{
    bcrypt.hash(password, hashed).then((hashedPassword)=>{
        console.log(hashedPassword);
    }).catch((err)=>{
        console.log(err);
    })
 }).catch((err)=>{
     console.log(err);
 })