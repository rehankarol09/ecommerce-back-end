const slugify = require('slugify');
const Category = require('../models/category');
const shortid = require('shortid');


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
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        createdBy:req.user._id
    }

    if(req.file){
        categoryObj.CategoryImage = process.env.IMAGE_HOST +'/public/'+ req.file.filename
    }


    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });

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
                if (error) return res.status(400).json({ error });

                if (category) {
                    const categorylist = createCategories(category);
                    res.status(201).json({
                        categorylist
                    });
                }
            });
    }
    catch ({err}) {
        console.log(err.response);
    }
}


exports.updateCategories = async (req, res) => {
try {
    const { _id, name, parentId, type } = req.body;
    let updatedcategories=[];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] != '') {
                category.parentId = parentId[i];
            }
            const updatecategory = await Category.findOneAndUpdate({_id:_id[i]}, category, {new:true});
            updatedcategories.push(updatecategory);
        }

        return res.status(201).json({updatedcategories});

    }
    else {
        const category = { name, type };
        if (parentId != '') {
            category.parentId = parentId
        }
        const updatecategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
        return res.status(201).json({updatecategory});
    }

} catch ({error}) {
    console.log(error)
}
}


exports.deleteCategories = async (req, res) =>
{
    const {ids} = req.body.payload;
    let deletecategories = [];
    for(let i=0;i<ids.length;i++)
    {
        const deletecategory = await Category.findOneAndDelete({_id:ids[i]._id});
        deletecategories.push(deletecategory);
    }
    if(deletecategories.length === ids.length)
    {
        return res.status(200).json({message:'Category removed'})
    }
    else{
        return res.status(401).json({message:'Something went wrong'})
    }

}

