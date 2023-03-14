const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const allProducts = await Product.paginate({}, { limit, page });
    res.send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getfilteredProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, brand, price, image, hotItem, stock, type } = req.body;
    if (!type)
      return res.status(400).json({ message: "El campo type es requerido" });
    if (!name)
      return res.status(400).json({ message: "El campo name es requerido" });
    if (!brand)
      return res.status(400).json({ message: "El campo brand es requerido" });
    if (!price)
      return res.status(400).json({ message: "El campo price es requerido" });
    if (!image)
      return res.status(400).json({ message: "El campo image es requerido" });
    if (!hotItem)
      return res
        .status(400)
        .json({ message: "El campo hot item es requerido" });
    if (!stock)
      return res.status(400).json({ message: "El campo stock es requerido" });
    const typeFound = await ProductsType.findOne({ type });
    if (!typeFound)
      return res.status(400).json({ message: "El tipo de producto no existe" });
    const newProduct = new Product({ ...req.body, type: typeFound._id });
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Producto creado correctamente", product: newProduct });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await ProductsType.findOne({ type: req.body.type });
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      ...req.body,
      type: type._id,
    });
    res.status(200).json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.body.id;
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: "Producto borrado exitosamente" });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const getHotItem = async (req, res) => {
  try {
    const hotItem = await Product.find({ hotItem: "true" });
    res.status(200).json({ hotItem });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getfilteredProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getHotItem,
  getProduct,
};