const { Router } = require("express");
const { getProducts, addProduct, editProduct, deleteProduct, getHotItem } = require("../controllers/products");
const { deleteProductsMiddleware, addProductMiddleware } = require('../middlewares/products')
const router = Router();

router.get("/products", getProducts);
router.get("/hotItem", (req,res,next) => {console.log('ruta correcta'); next()}, getHotItem);
router.post("/addProducts", addProductMiddleware,addProduct);
router.put("/editProducts:id", editProduct)
router.delete("/deleteProducts", deleteProductsMiddleware , deleteProduct);

module.exports = router;
