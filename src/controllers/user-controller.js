const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const {successresponse, errorresponse } = require('../utils/common');

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
        return res
                  .status(StatusCodes.CREATED)
                  .json({successresponse});
    } catch (error) {
        errorresponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(errorresponse)
    }
}

async function signin (req, res) {
    try {
         const user = await UserService.signin({
            email : req.body.email,
            password: req.body.password
         })
        successresponse.data = user;
        return res 
                  .status(StatusCodes.ACCEPTED)
                  .json(successresponse);
    } catch (error) {
         
        console.log(error);
        return res 
        .status(error.statusCode)
        .json(errorresponse)
    }
}

module.exports = {signup, signin}