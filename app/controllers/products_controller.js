const express = require('express');
const { validateID } = require("../middlewares/utilities");
const { Product } = require("../models/product");
const router = express.Router();

//Adding product 
router.post("/", (req, res)=>{
    let body = req.body;
    let product = new Product(body);
    product.save().then((product)=>{
        res.send(product);
    }).catch((err)=>{
        res.send(err);
    })
});

//List All the Products
router.get('/', (req, res)=>{
    Product.find().populate("category", 'name').then((products)=>{
        res.send(products);
    }).catch((err)=>{
        res.send(err);
    })
});

// Read Product by its ID.
router.get('/:id', validateID, (req, res)=>{
    Product.findOne({_id:req.params.id}).populate('category', "name").then((product)=>{
        if(product){
            res.send(product);
        }else{
            res.send({
                notice:"Products not found."
            });
        }
    }).catch((err)=>{
        res.send(err);
    })
});

//Update Product by its ID.
router.put('/:id', validateID, (req, res)=>{
    Product.findOneAndUpdate({_id:req.params.id},{$set:req.body}, {new:true}).then((product)=>{
        if(product){
            res.send({
                product,
                notice:`product updated succesfully.`
            });
        }
    }).catch((err)=>{
        res.send(err);
    })
});

// Deleting Product by Id.
router.delete("/:id", validateID, (req, res)=>{
    Product.findByIdAndRemove({_id:req.params.id}).then((product)=>{
        if(product){
            res.send(product);
        }else{
            res.send({
                notice:`Product not found.`
            });
        }
    }).catch((err)=>{
        res.send(err);
    })
})

module.exports = {
    productsController:router
}