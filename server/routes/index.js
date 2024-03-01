const router = require("express").Router();

const databaseRouter = require("./database");
const userRouter = require("./user");
const productRouter = require("./product");
const friendsRouter = require("./friends");

router.use("/database", databaseRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/friends", friendsRouter);

module.exports = router;
