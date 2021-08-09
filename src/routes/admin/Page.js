const express = require('express');
const router = express.Router();
const {createPage, getPage} = require('../../controller/admin/Page');
const {upload, adminMiddleware,requiresignin} = require('../../common-middleware/index');

router.post('/page/create',requiresignin,adminMiddleware, upload.fields(
    [

        { name: 'banners', maxCount: 8 },
        { name: 'products', maxCount: 9 }

    ]
), createPage);
    
router.get('/page/:category/:type',getPage);

module.exports = router;