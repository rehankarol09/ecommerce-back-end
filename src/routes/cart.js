const express = require('express');
const { requiresignin, userMiddleware ,adminMiddleware} = require('../common-middleware');
const { addItemToCart } = require('../controller/cart');
const router = express.Router();


router.post('/cart/create',requiresignin,userMiddleware,addItemToCart);

module.exports=router;