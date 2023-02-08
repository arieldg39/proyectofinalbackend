const { Router } = require("express");
const {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getHotItem,
  getProduct,
} = require("../controllers/Products");
const { deleteProductsMiddleware } = require("../middlewares/products");
const router = Router();

router.get("/products", getProducts);
router.get("/hotItem", getHotItem);
router.post("/addProducts", addProduct);
router.put("/editProducts/:id", editProduct);
router.delete("/:id", deleteProductsMiddleware, deleteProduct);
router.get("/getProduct/:id", getProduct);

module.exports = router;
