const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    CategoryImage: {
        type: String
    },
    parentId: {
        type: String,
        required: false


    }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema)