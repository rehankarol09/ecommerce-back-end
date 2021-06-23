const express = require('express');
const { requiresignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const { AddCategory, getCategory } = require('../controller/category');
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


router.post('/category/create',requiresignin,adminMiddleware,upload.single('CategoryImage'),AddCategory);

router.get('/category/fetch',getCategory);


module.exports = router;