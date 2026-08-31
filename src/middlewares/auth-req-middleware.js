const {StatusCodes} = require('http-status-codes');
const {errorresponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateAuthRequest (req, res, next) {
    if(!req.body.email || !req.body.password) {
        errorresponse.message= 'something went wrong while authetication';
        errorresponse.error= new AppError('Email or password not found ')
    }
}

module.exports = {
    validateAuthRequest
}