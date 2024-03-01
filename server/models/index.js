const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const UserModel = require("./user");
const ProductsModel = require("./products");
const FriendsModel=require("./friends");

const User = UserModel(Database, Sequelize);
const Products = ProductsModel(Database, Sequelize);
const Friends = FriendsModel(Database,Sequelize);


      
Products.belongsTo(User, { foreignKey: 'idUser' });
User.hasMany(Products, { foreignKey: 'idUser' });

  Friends.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

User.hasMany(Friends, {
    foreignKey: 'userId',
    as: 'friends'
  });

module.exports = {
    User,
    Products,
    Friends,
    connection: Database,
};
