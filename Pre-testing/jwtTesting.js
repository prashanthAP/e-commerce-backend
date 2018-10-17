const jwt = require('jsonwebtoken');
 let user = {
     username: "prashanth",
     email:'pk@gmail.com'
 }
 let password = `pk12345`

 let token = jwt.sign(user, password);
 console.log(token);

let person = jwt.verify(token, 'pk12345');
console.log(person);