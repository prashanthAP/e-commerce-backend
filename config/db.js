const mongoose = require ("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Re-Practice-EcommerceDb', {useNewUrlParser:true, useCreateIndex:true}).then(()=>{
    console.log('YOur connect to Re-Practice-EcommerceDb');
}).catch((err)=>{
    console.log(err);
});

module.exports = {
    mongoose
}


