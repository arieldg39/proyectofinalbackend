const path = require("path");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product")

const addToCart = async (req, res) => {
    try {
      const { productId, quantity, userId } = req.body;
      let cart = await Cart.findOne({ user: userId });
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      if (cart) {
        const productIndex = cart.products.findIndex(
          (product) => product.product.toString() === productId
        );
        if (productIndex !== -1) {
          const newQuantity = cart.products[productIndex].quantity + quantity;
          if (product.stock < newQuantity) {
            return res
              .status(400)
              .json({ message: "No hay suficiente stock para este producto" });
          } else {
            cart.products[productIndex].quantity = newQuantity;
          }
        } else {
          if (product.stock < quantity) {
            return res
              .status(400)
              .json({ message: "No hay suficiente stock para este producto" });
          } else {
            cart.products.push({ product: productId, quantity });
          }
        }
        cart = await cart.save();
        return res
          .status(200)
          .json({ message: "Producto agregado al carrito", cart });
      } else {
        if (product.stock < quantity) {
          return res
            .status(400)
            .json({ message: "No hay suficiente stock para este producto" });
        } else {
          const newCart = new Cart({
            user: userId,
            products: [{ product: productId, quantity }],
          });
          await newCart.save();
          return res
            .status(200)
            .json({ message: "Carrito creado correctamente", cart: newCart });
        }
      }
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

const createCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const { _id: userId } = req.user;

        const user = await User.findById(userId).populate("cart");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const { cart } = user;
        const productFoundInCart = cart.products.find(
            (product) => product.product.toString() === productId
        );

        if (!productFoundInCart) {
            cart.products.push({ product: productId, quantity });
        } else {
            productFoundInCart.quantity += quantity;
        }
        await cart.save();
        return res
            .status(200)
            .json({ message: "Producto agregado al carrito correctamente" });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

const deleteProductFromCart = async (req, res) => {
  try {
      const { userId } = req;
      const { productId } = req.body
      const cartFound = await Cart.findOne({ user: userId })
      if (!cartFound) {
          return res.status(200).json({
              message: "El usuario no tiene carritos activos",
              tipoerror: "no",
          });
      }
      const newProductList = cartFound?.products?.filter((product) => product._id.toString() !== productId)
      const cartUpdated = await Cart.findOneAndUpdate({ user: userId }, { products: newProductList })
      return res.status(200).json({
          message: "Producto eliminado correctamente",
          cart: cartUpdated,
          tipoerror: "si",
      });
  } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
  }
}

const getCart = async (req, res) => {
    try {
        const { userId } = req;
        const cartFound = await Cart.findOne({ user: userId }).populate("products.product");
        if (!cartFound) {
            return res.status(200).json({
                message: "El usuario no tiene carritos activos",
                tipoerror: "no",
            });
        }
        return res.status(200).json({
            message: "Carrito ubicado correctamente",
            cart: cartFound,
            tipoerror: "si",
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};


module.exports = {
    createCart,
    deleteProductFromCart,
    getCart,
    addToCart
};
