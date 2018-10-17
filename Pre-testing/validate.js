const validate = require("validator");

const mail = `prashanthgmail.com`;

let check = validate.isEmail(mail);
console.log(check);