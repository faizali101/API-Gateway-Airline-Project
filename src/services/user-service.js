const {UserRepository, RoleRepository} = require('../repositories');
const userRep = new UserRepository();
const rolerepo = new RoleRepository();
const { StatusCodes } = require('http-status-codes');
const {AppError, errorresponse, successresponse} = require('../utils');
const bcrypt = require('bcrypt');
const {auth, enums} = require('../utils/common');
const { col } = require('sequelize');

async function create(data) {
    try {
        const user = await userRep.create(data);
        const role = await rolerepo.getRoleByName(enums.USER_ROLES.CUSTOMER);
        await user.addRole(role);
        return user;
    } catch (error) {
        console.log(error);
     if (error.name == 'SequelizeValidationError'|| error.name == 'SequelizeUniqueConstraintError') {
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
        if (error instanceof AppError) throw error;
        console.log(error);
          throw new AppError('CANNOT SIGN IN.', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError("IMISSING TOKEN.", StatusCodes.BAD_REQUEST)
        }
        const response = auth.verifyToken(token);
        const user = await userRep.get(response.id);
        if (!user) {
            throw new AppError("NOT A USER.", StatusCodes.BAD_REQUEST)

        }
        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == 'JsonWebTokenError') {
          throw new AppError('INVALID JWT TOKEN.', StatusCodes.BAD_REQUEST)
        }
        console.log(error);
        throw new AppError('COULD NOT AUTHETICATE.', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    create, signin, isAuthenticated
}
