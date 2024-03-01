const router = require("express").Router();
const productController = require("../controllers").productController;

router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductsByUser/:idUser", productController.getProductsByUser);
router.get("/getProducts", productController.getProducts);

router.post("/createProduct", productController.createProduct);

router.delete("/deleteProduct/:id", productController.deleteProducts);



module.exports =router;