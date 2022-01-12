
const express = require('express');
const router=express.Router();

const { signup, signin, signout } = require('../../controller/admin/auth');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../../Validators/auth');
const { requiresignin,adminMiddleware} = require('../../common-middleware');




router.post('/admin/signup', validateSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validateSigninRequest,isRequestValidated, signin);
router.post('/admin/signout',requiresignin,adminMiddleware,signout);



module.exports = router;