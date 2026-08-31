const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
const {AuthReq} = require('../../middlewares')



router.post('/signup', AuthReq.validateAuthRequest, UserController.signup);

router.post('/signin', AuthReq.validateAuthRequest, UserController.signin);


module.exports = router