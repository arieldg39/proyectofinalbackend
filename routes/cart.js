const express = require("express");
const router = express.Router();
const { createCart, deleteProduct, getCart } = require("./../controllers/cart")

router.post("/createCart", createCart)
router.patch("/deleteProduct", deleteProduct)
router.get("/getCart", getCart)

module.exports = router