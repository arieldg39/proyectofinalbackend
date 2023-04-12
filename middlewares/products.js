const product = require('../models/Product')
const Cart = require("../models/Cart")

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

const checkProductStock = async (req, res, next) => {
    const { productId, quantity, userId } = req.body;
    
    try {
        const Product = await product.findById(productId);

        if (!Product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart) {
            return next();
        }

        let cartItemCount = 0;

        cart.products.forEach((cartProduct) => {
            if (cartProduct.product._id.equals(Product._id)) {
            cartItemCount += cartProduct.quantity;
            }
        });

        if (Product.stock < (quantity + cartItemCount)) {
            return res.status(400).json({ message: 'No hay suficiente stock para este producto' });
        }

        next();
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};


module.exports = {
    deleteProductsMiddleware,
    checkProductStock
};