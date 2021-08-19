const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

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

exports.getAllProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id type')
        .exec((error, category) => {
            if (error) return res.status(400).json({ error });
            //else return res.status(200).json({ category });
            if (category) {
                Product.find({ category: category._id })
                    .exec((error, product) => {
                        if (error) return res.status(400).json({ error });
                        res.status(200).json({
                            product,
                            productsbyprice: {
                                Under5k: product.filter(product => product.price <= 5000),
                                Under10k: product.filter(product => product.price <= 10000 && product.price > 5000),
                                Under20k: product.filter(product => product.price > 10000 && product.price <= 20000),
                                Under25k: product.filter(product => product.price > 20000 && product.price <= 25000),
                                Under30k: product.filter(product => product.price > 25000 && product.price <= 30000),
                            }
                        })

                    })
            }

        }

        );
}

