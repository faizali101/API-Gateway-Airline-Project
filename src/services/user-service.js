const {UserRepository} = require('../repositories');
const userRep = new UserRepository();
const { StatusCodes } = require('http-status-codes');
const {AppError, errorresponse, successresponse} = require('../utils');

async function create(data) {
    try {
        const user = await userRep.create(data);
        return user;
    } catch (error) {
     if (error.name == 'SequelizeValidationError') {
            let explantions = [];
            error.errors.forEach((err) => {
                explantions.push(err.message);
            });
            throw new AppError(explantions, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a user object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    create
}
