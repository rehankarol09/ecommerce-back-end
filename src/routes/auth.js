
const express = require('express');
const { sign } = require('jsonwebtoken');
const { signup, sigin } = require('../controller/auth');
const router=express.Router();
//const User = require('../models/user');


router.post('/signup',signup);

router.post('/signin',sigin);



module.exports = router;