const { Router } = require("express");
const { getProducts, addProduct, editProduct, deleteProduct } = require("../controllers/products");
const { deleteProductsMiddleware, addProductMiddleware } = require('../middlewares/products')
const router = Router();

router.get("/products", getProducts);
router.post("/addProducts", addProductMiddleware,addProduct);
router.put("/editProducts:id", editProduct)
router.delete("/deleteProducts", deleteProductsMiddleware , deleteProduct);

module.exports = router;
