const {UserRepository} = require('../repositories');
const userRep = new UserRepository();
const { StatusCodes } = require('http-status-codes');
const {AppError, errorresponse, successresponse} = require('../utils');
const bcrypt = require('bcrypt');
const {auth} = require('../utils/common');
const { col } = require('sequelize');

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

async function signin(data) {
    try{
        const user = await userRep.getUserByEmail(data.email);
        if (!user) {
            throw new AppError("NO USER FOUND WITH THIS EMAIL!! TRY AGAIN.", StatusCodes.NOT_FOUND)
        }
        const passwordMatch = auth.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError("INVALID PASSWORD!! TRY AGAIN.", StatusCodes.BAD_REQUEST)
        }
        const jwt = auth.createToken({
            id: user.id,
            email: user.email
        })
        return jwt;
    }catch(error){
        console.log(error);
          throw new AppError('CANNOT SIGN IN.', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    create, signin
}
