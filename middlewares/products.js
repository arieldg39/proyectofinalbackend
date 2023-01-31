const product = require('../models/Product')

const deleteProductsMiddleware = async (req, res, next) => {
    try {
        const id = req.body.id;
        if (!id) return res.status(400).json({ message: "El parametro id es requerido" });
        const Product = await product.findById(id);
        if (!Product) return res.status(400).json({ message: "El id ingresado es inexistente" });
        next();
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

module.exports = {
    deleteProductsMiddleware
};