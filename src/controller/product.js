const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
    

    const {
        name,
        price,
        description,
        category,
        createdby,
        quantity,
        slug
        
    } = req.body;
    

    let productpictures=[];
    if(req.files.length>0)
    {
        productpictures=req.files.map(file=>{
            return {img:file.filename}
        });

    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        description: description,
        category: category,
        createdby: req.user._id,
        productpictures,
        quantity:quantity
    });

    product.save((error,product)=>{
       if(error) return res.status(400).json({error})
       if(product)
       {
           res.status(200).json({
               product
           })
       }
       
    });
}


