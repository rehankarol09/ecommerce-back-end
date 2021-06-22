const express = require('express');
const { requiresignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const { AddCategory, getCategory } = require('../controller/category');



router.post('/category/create',requiresignin,adminMiddleware,AddCategory);

router.get('/category/fetch',getCategory);


module.exports = router;