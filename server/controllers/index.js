const databaseController = require("./database");
const userController= require("./user");
const productController = require("./product");
const friendsController= require("./friends");

const controllers={
    databaseController,
    userController,
    productController,
    friendsController
}

module.exports = controllers;