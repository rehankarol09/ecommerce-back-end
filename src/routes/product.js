const express = require('express');
const router = express.Router();
const { requiresignin, adminMiddleware } = require('../common-middleware');
const { createProduct, getAllProductsBySlug, updateProducts, getProductById } = require('../controller/product');
const multer = require('multer');
//const upload = multer({dest:'uploads/'});
const shortid = require('shortid');
const path = require('path');


//storing file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})


var upload = multer({ storage })


router.post('/product/create', requiresignin, adminMiddleware, upload.array('productpicture'), createProduct);
router.get('/products/:slug',getAllProductsBySlug);
router.put('/products/update/:id',upload.array('productpicture'),updateProducts);
router.get('/product/:id',getProductById);




module.exports = router;