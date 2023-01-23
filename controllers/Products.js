const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getProducts,
};
