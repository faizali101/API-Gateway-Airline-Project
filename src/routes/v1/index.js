const express = require('express');
const UserRoutes = require('./user-routes');
const { InfoController } = require('../../controllers');
const {AuthReq} = require('../../middlewares')
const router = express.Router();

router.get('/info', AuthReq.checkAuth, InfoController.info);

router.use('/user', UserRoutes)
module.exports = router;