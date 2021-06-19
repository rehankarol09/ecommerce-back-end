
const express = require('express');
const router=express.Router();
const { sign } = require('jsonwebtoken');
const { signup, signin } = require('../../controller/admin/auth');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../../Validators/auth');




router.post('/admin/signup', validateSignupRequest,isRequestValidated,signup);

router.post('/admin/signin',validateSigninRequest,isRequestValidated, signin);

/*router.post('/admin/profile',requiresignin,(req,res)=>{
    res.status(400).json({
      user:"profile"
    });
});*/


module.exports = router;