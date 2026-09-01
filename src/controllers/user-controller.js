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
        return res
                  .status(StatusCodes.CREATED)
                  .json(successresponse(user, 'Successfully signed up!'));
    } catch (error) {
        console.log(error);
        return res
                  .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(errorresponse(error, error.explanation || error.message));
    }
}

async function signin (req, res) {
    try {
         const user = await UserService.signin({
            email : req.body.email,
            password: req.body.password
         })
        return res
                  .status(StatusCodes.ACCEPTED)
                  .json(successresponse(user, 'Successfully signed in!'));
    } catch (error) {
        console.log(error);
        return res
                  .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(errorresponse(error, error.explanation || error.message));
    }
}

module.exports = {signup, signin}
