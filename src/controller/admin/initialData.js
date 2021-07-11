const Category = require('../../models/category');
const Product = require('../../models/product')


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


exports.initialData = async (req,res) =>
{
 const categories = await Category.find({}).exec();
 const products = await Product.find({})
 .select('_id name slug description quantity price category productpictures')
 .populate({path:'category',select:'_id name'})
 .exec();
 res.status(200).json({
     categories:createCategories(categories),
     products
 })

}