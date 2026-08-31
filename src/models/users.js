'use strict';
const {
  Model,
  col
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig } = require('../config');
const serverConfig = require('../config/server-config');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    email: {
      type :DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isEmail: true
      }
    },
    password: {
      type :DataTypes.STRING,
      allowNull: false,
      validate : {
        len: [3,10]
      }
    }
  }, {
    sequelize,
    modelName: 'users'
  });

  users.beforeCreate((user)=> {
    const encryptedPassword = bcrypt.hashSync(user.password, +serverConfig.SALT_ROUND);
    user.password  = encryptedPassword
  });
  return users;
};