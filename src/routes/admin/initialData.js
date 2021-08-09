const express = require('express');
const {requiresignin, adminMiddleware } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.post('/initialData',requiresignin,adminMiddleware,initialData);

module.exports = router;