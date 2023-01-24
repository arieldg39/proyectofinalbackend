const { Router } = require("express");
const { getProducts, addProduct } = require("../controllers/Products");
const router = Router();

router.get("/products", getProducts);
router.post("/addProducts", addProduct);

module.exports = router;
