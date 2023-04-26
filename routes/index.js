const express = require('express');
const router = express.Router();

const ProductsType = require("./productsTypes");
const products = require("./products");
const user = require("./user");
const cart = require("./cart");

router.use("/products", products);
router.use("/productsType", ProductsType)
router.use("/user", user);
router.use("/cart", cart);

module.exports = router;
