<<<<<<< HEAD:src/routes/products.js
const express = require('express');
const router = express.Router();

const { getProducts } = require('./../controllers/products');

router.get("/layout", getProducts);
=======
const { Router } = require("express");
const { getProducts } = require("../controllers/Products");
const router = Router();

router.get("/:?", getProducts);
>>>>>>> modelosProductos:routes/products.js

module.exports = router;
