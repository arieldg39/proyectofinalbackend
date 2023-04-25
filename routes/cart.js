const express = require("express");
const { decoToken } = require("../middlewares/auth");
const router = express.Router();
const { createCart, deleteProductFromCart, getCart, addToCart } = require("./../controllers/cart");
const { checkProductStock } = require("../middlewares/products");

router.post("/createCart", createCart);
router.post("/addToCart", checkProductStock ,addToCart)
router.patch("/", decoToken, deleteProductFromCart)
router.get("/getCart",  decoToken, getCart);

module.exports = router