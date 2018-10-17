const bcrypt = require('bcryptjs');
// console.log(bcrypt);
let encryptPassword = '$2a$10$HLzSe.bM87iE5RDKKcU4Ce6QrcMB6NidNJpRwROBjneG.we4hCHEK';

bcrypt.compare('prashh123', encryptPassword).then((pass)=>{
    console.log(pass);
}).catch((err)=>{
    console.log(err);
})