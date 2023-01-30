const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const allProducts = await Product.paginate({},{limit, page});
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

const editProduct = async (req, res) => {
  try {
      const { Id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(Id, req.body, { new: true });
      res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
  } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
      const { id } = req.query;
      await Product.deleteOne({ _id: id });
      res.status(200).json({ message: 'Producto borrado exitosamente' });
  } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct
};
