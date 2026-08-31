const CrudRepository = require('./crud-repository');
const {users}= require('../models')

class UserRepository extends CrudRepository{
    constructor() {
        super(users);
    }

    async getUserByEmail (email) {
        const user = await users.findOne({ where : {email: email}})
        return user;
    }
}
module.exports = {
    UserRepository
}