// const {mongoose} = require('../../config/db');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const { Category } = require('../models/category');

// Creating productSchema.
const productSchema = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    description:{
        type:String,
        required:true,
        minlength:10,
        maxLength:1000
    },
    codEligible:{
        type:Boolean,
        default:true,
        required:true
    },
    stock:{
        type:Number,
        min:0,
        required:true
    },
    maxUnitPurchase:{
        type:Number,
        required:true,
        min:1
    },
    lowStockAlert:{
        type:Number,
        required:true,
        min:0
    }
});

// Creating own Static method for product model schema (all static methods are attached to schema. and you should not use ES6 arrow function)
productSchema.statics.findByCategory = function(id){
    let Product = this;
    return Product.find({category:id});
}

// Creating Product model
const Product = mongoose.model('Product', productSchema);

//exporting model
module.exports = {
    Product
}