const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = {
  getProducts,
};
