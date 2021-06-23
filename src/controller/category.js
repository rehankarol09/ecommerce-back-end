const slugify = require('slugify');
const Category = require('../models/category');


function createCategories(category, parentId = null) {
    const categorylist = [];
    let categories;
    if (parentId == null) {
        categories = category.filter((cat) => cat.parentId == undefined);
    }
    else {
        categories = category.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of categories) {
        categorylist.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(category, cate._id),

        });
    }

    return categorylist;
}

exports.AddCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        
    }

    if(req.file){
        categoryObj.CategoryImage = process.env.API +'/public/'+ req.file.filename
    }


    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(200).json({ error });

        if (category) {

            return res.status(201).json({
                category
            });
        }


    });
}

exports.getCategory = (req, res) => {
    try {
        Category.find({})
            .exec((error, category) => {
                if (error) return res.status(200).json({ error });

                if (category) {
                    const categorylist = createCategories(category);
                    res.status(201).json({
                        categorylist
                    });


                }

            });
    }
    catch (err) {
        console.log(err);
    }
}


