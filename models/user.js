'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:{
        msg : "Email already used"
      },
      validate: {
        notEmpty:{
          msg : "Email is required"
        },
        notNull : {
          msg : "Email is required"
        },
        isEmail:{
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          msg : "Password is required"
        },
        notNull : {
          msg : "Password is required"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance,options){
        instance.password = hash(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};