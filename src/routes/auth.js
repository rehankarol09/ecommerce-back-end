
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../Validators/auth');


router.post('/signup',validateSignupRequest,isRequestValidated,signup);

router.post('/signin',validateSigninRequest,isRequestValidated,signin);



module.exports = router;