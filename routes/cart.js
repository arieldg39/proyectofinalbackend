const express = require("express");
const { decoToken } = require("../middlewares/auth");
const router = express.Router();
const { createCart, deleteProduct, getCart } = require("./../controllers/cart")

router.post("/createCart",decoToken, createCart)
router.patch("/deleteProduct", deleteProduct)
router.get("/getCart",decoToken, getCart)

module.exports = router