const { Router } = require("express");
const { getProducts } = require("../controllers/Products");
const router = Router();

router.get("/:?", getProducts);

module.exports = router;
