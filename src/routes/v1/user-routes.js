const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
const {AuthReq} = require('../../middlewares')



router.post('/signup', AuthReq.validateAuthRequest, UserController.signup);

router.post('/signin', AuthReq.validateAuthRequest, UserController.signin);

router.post('/role',AuthReq.checkAuth, AuthReq.isAdmin, UserController.addRoles);
// router.post('/role', UserController.addRoles);


module.exports = router