const express = require("express");
const { decoToken } = require("../middlewares/auth");
const router = express.Router();
const { createCart, deleteProduct, getCart, addToCart, addToCartMany } = require("./../controllers/cart")

router.post("/createCart", createCart);
router.post("/addToCart", addToCart)
router.post("/addToCartMany", addToCartMany)
router.patch("/deleteProduct", deleteProduct);
router.get("/getCart",  decoToken, getCart);

module.exports = router