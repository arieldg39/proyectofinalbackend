const express = require("express");
const { decoToken } = require("../middlewares/auth");
const router = express.Router();
const { buyCart, deleteProductFromCart, getCart, addToCart } = require("./../controllers/cart");
const { checkProductStock } = require("../middlewares/products");

router.patch("/buyCart", buyCart);
router.post("/addToCart", checkProductStock ,addToCart)
router.delete("/delete", decoToken, deleteProductFromCart)
router.get("/getCart",  decoToken, getCart);

module.exports = router