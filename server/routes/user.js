const router = require("express").Router();

const userController = require("../controllers").userController;

router.get("/getAllUsers", userController.getAllUsers);

router.post("/createUser", userController.createUser);
router.post("/login", userController.userLogin);

module.exports =router;