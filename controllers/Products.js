const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (error) {
    res.status(500).send(error)
  }
};

const addProduct = async (req, res) => {
  try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(200).json({ message: 'Producto creado correctamente' });
  } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
