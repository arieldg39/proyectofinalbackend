const Product = require("../models/Product");
const ProductsType = require("../models/ProductsType");

const addProductMiddleware = async (req, res, next) => {
    try {
        const { name, brand, price, image, hotItem, stock, type } = req.body;
        if (!type) return res.status(400).json({ message: "El campo type es requerido" });
        if (!name) return res.status(400).json({ message: "El campo name es requerido" });
        if (!brand) return res.status(400).json({ message: "El campo brand es requerido" });
        if (!price) return res.status(400).json({ message: "El campo price es requerido" });
        if (!image) return res.status(400).json({ message: "El campo image es requerido" });
        if (!hotItem) return res.status(400).json({ message: "El campo hot item es requerido" });
        if (!stock) return res.status(400).json({ message: "El campo stock es requerido" });
        const typeFound = await ProductsType.findById(type);
        if (!typeFound) return res.status(400).json({ message: "El tipo de producto no existe" });
        next();
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });        
    }
};

const deleteProductsMiddleware = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "El parametro id es requerido" });
        const product = await Product.findById(id);
        if (!product) return res.status(400).json({ message: "El id ingresado es inexistente" });
        next();
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

module.exports = {
    addProductMiddleware,
    deleteProductsMiddleware,
};