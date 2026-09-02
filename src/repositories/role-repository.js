const CrudRepository = require('./crud-repository');
const {role}= require('../models')

class RoleRepository extends CrudRepository{
    constructor() {
        super(role);
    }

    async getRoleByName (name) {
        const roles = await role.findOne({ where : {name: name}})
        return roles;
    }
}
module.exports = {
    RoleRepository
};
