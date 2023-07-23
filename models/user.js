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
        args : true,
        messege : "Email already used"
      },
      validate: {
        notEmpty:{
          messege : "Email is required"
        },
        notNull : {
          messege : "Email is required"
        },
        isEmail:{
          args: true,
          messege: "Invalid email format"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          messege : "Password is required"
        },
        notNull : {
          messege : "Password is required"
        },
        min : {
          args : 8,
          messege : "Password min 8 character"
        }
      }
    }
  }, {
    hooks: {
      beforeBulkCreate(instance,options){
        instance.password = hash(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};