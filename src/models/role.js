'use strict';
const {enums} = require('../utils/common');
const {ADMIN, CUSTOMER, STAFF} = enums.USER_ROLES;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
       this.belongsToMany(models.User, {through: 'User_Roles', as : 'role'})
    }
  }
  role.init({
    name: {type: DataTypes.ENUM({
      values: [ADMIN, CUSTOMER, STAFF],
      defaultValue: CUSTOMER
    }),
          allowNull: false
    }
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};