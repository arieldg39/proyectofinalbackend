const express = require("express");
const { decoToken } = require("../middlewares/auth");
const router = express.Router();
const { createCart, deleteProduct, getCart, addToCart, addToCartMany } = require("./../controllers/cart");
const { checkProductStock } = require("../middlewares/products");

router.post("/createCart", createCart);
router.post("/addToCart", checkProductStock ,addToCart)
router.delete("/deleteProduct", deleteProduct);
router.get("/getCart",  decoToken, getCart);

module.exports = router