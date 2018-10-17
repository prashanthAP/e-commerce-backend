const {mongoose} = require('../../config/db');
const Schema = mongoose.Schema;

// Creating a Schema.
const categorySchema = new Schema({
    name:{
        type:String,
        require:true
    }
});

categorySchema.methods.catshortInfo = function(){
    let category = this;
    return {
        name:category.name
    }
}

// Creating a model of Schema category
const Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category
}
