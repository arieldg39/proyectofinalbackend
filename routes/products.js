const { Router } = require("express");
const { getProducts, addProduct, editProduct, deleteProduct, getHotItem } = require("../controllers/products");
const { deleteProductsMiddleware } = require("../middlewares/products");
const router = Router();

router.get("/products", getProducts);
router.get("/hotItem", (req,res,next) => next(), getHotItem);
router.post("/addProducts",addProduct);
router.put("/editProducts/:id", editProduct)
router.delete("/:id", deleteProductsMiddleware ,deleteProduct);


module.exports = router;
