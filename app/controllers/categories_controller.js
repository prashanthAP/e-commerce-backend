const express = require('express');
const { Category } = require('../models/category');
const { Product } =  require('../models/product');
const { validateID } = require('../middlewares/utilities');
const router = express.Router();

//Creating Category.
router.post('/', (req, res)=>{
    let body = req.body;
    let category = new Category(body);
    category.save().then((category)=>{
        res.send({
            category,
            notice:`Category created SuccesFully.`
        });
        console.log(category);
    }).catch((err)=>{
        res.send(err);
    })
});

//Listing all Categories
router.get('/', (req, res)=>{
    Category.find().then((category)=>{
        if(category){
            res.send(category);
        }else{
            res.send("Categories not found");
        }
        // console.log(category);
    }).catch((err)=>{
        res.send(err);
    })
});

// Find One 
    validateID
router.get('/:id', validateID, (req, res)=>{
    Category.findOne({_id:req.params.id}).then((category)=>{
        if(category){
            res.send(category);
        }else{
            res.send({
                notice:`Category not found.`
            })
        }
    })
})

//Updating Categories.
router.put('/:id', validateID, (req, res)=>{
    let id = req.params.id;
    console.log(req.body);
    Category.findOneAndUpdate({_id:id}, {$set:req.body}, {new:true, runValidator:true}).then((category)=>{
        res.send(category);
    }).catch((err)=>{
        res.send(err);
    })
})

router.delete('/:id', validateID, (req, res)=>{
    Category.findOneAndRemove({_id:req.params.id}).then((category)=>{
        if(category){
            res.send({
                category,
                notice:`Category ${category.name} Deleted`
            })
        }else{
            res.send({
                notice:`No such category found.`
            })
        }
    }).catch((err)=>{
        res.send(err);
    })
});

// Deleting All Categories.
// router.delete('/', (req, res)=>{
//     Category.findByIdAndDelete().then((categories)=>{
//         if(categories){
//             res.send({
//                 categories,
//                 noti
//             });
//         }else{
//             res.send('NO Categories found');
//         }
//     }).catch((err)=>{
//         res.send(err);
//     })
// })

router.get('/:id/products', validateID, (req, res)=>{
    // Product.find({category:req.params.id}).then((products)=>{
    //     if(products.length>0){
    //         res.send(products);
    //     }else{
    //         res.send(`No sunch product found under this category.`)
    //     }
    // }).catch((err)=>{
    //     res.send(err);
    // })

    // Creating own Static method.
    Product.findByCategory(req.params.id).then((product)=>{
        res.send(product);
    }).catch((err)=>{
        res.send(err);
    })
})
// Exporting controller.
module.exports = {
    categoriesController:router
}