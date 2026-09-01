const { StatusCodes } = require('http-status-codes');
const { errorresponse } = require('../utils/common');
const { AppError } = require('../utils/errors');
const { UserService } = require('../services');
const { isAuthenticated } = require('../services/user-service');
const { response } = require('express');

function validateAuthRequest (req, res, next) {
    if (!req.body.email || !req.body.password) {
        const error = new AppError('Email or password not found', StatusCodes.BAD_REQUEST);
        return res
                  .status(error.statusCode)
                  .json(errorresponse(error, 'Something went wrong while authenticating'));
    }
    next();
}

async function checkAuth (req, res, next) {
    try { const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response
            next ();
        }
    } catch (error) {
         return res
                  .status(error.statusCode)
                  .json(errorresponse(error, 'Something went wrong while authenticating'));
    }
}


module.exports = {
    validateAuthRequest, checkAuth
}