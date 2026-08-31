const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const {successresponse, errorresponse } = require('../utils');

/*
POST : /users
req-body {email & password : STRING}
*/
async function signup(req, res) {
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
        });
        successresponse.data = user;
        return res.status(StatusCodes.CREATED).json({successresponse});
    } catch (error) {
        errorresponse.error = error;
        return res.status(error.statusCode).json(errorresponse)
    }
}

module.exports = {signup}