const path = require("path");
const Cart = require("../models/Cart");
const User = require("../models/User");

/* const createCart = async (req, res) => {
    try {
        const quantityNew=0;
        const id_cart = id;
        const { product, quantity, userid, id } = req.body;   
        const cart = await Cart.find({ userid: userId }).populate('product');
        if(!cart) {
            const payload = {                
                ...req.body,
                userid
            }
            const cart = new Cart(payload);
            await cart.save()
            return res.status(200).json({ message: "Carrito creado correctamente", cart, tipoerror:'agregado'})
@@ -32,25 +31,77 @@ const createCart = async (req, res) => {
                id_cart=cartItem._id;
            })            
            const cartUpdate = await Cart.findByIdAndUpdate(id_cart,{ quantity: quantityNew }, { new: true });
            
            return res.status(200).json({ message: "Cantidad Modificada!!!", cartUpdate, tipoerror:'cantidad'});
        }
        
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message, tipoerror:'error' })
    }
} */

const addToCart = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;
        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            const productIndex = cart.products.findIndex(
                (product) => product.product.toString() === productId
            );
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            cart = await cart.save();
            return res
                .status(200)
                .json({ message: "Producto agregado al carrito", cart });
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
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

const addToCartMany = async (productId, quantity, userId) => {
    try {
        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            const productIndex = cart.products.findIndex(
                (product) => product.product.toString() === productId
            );
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            cart = await cart.save();
            return { message: "Producto agregado al carrito", cart };
        } else {
            const newCart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
            });
            await newCart.save();
            return { message: "Carrito creado correctamente", cart: newCart };
        }
    } catch (error) {
        return { error: error.message };
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

const deleteProduct = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const cartFound = await Cart.findOne({ owner: req.userId });
        const productInCart = cartFound.products.find(
            (cartItem) => cartItem.product.toString() === product
        );
        if (quantity >= productInCart.quantity) {
            const updatedCart = await Cart.findbyIdAndUpdate(
                cartFound._id,
                { $pull: { product: req.body } },
                { new: true }
            );
            return res
                .status(200)
                .json({ message: "Carrito creado correctamente", updatedCart });
        }
        const newProductList = cartFound.products.find((cartItem) => {
            if (cartItem.product?.toString() !== product) return cartItem;
            return {
                product,
                quantity: cartItem.quantity - quantity,
            };
        });
        const cartUpdate = await Cart.findByIdAndUpdate(
            cartFound._id,
            { products: newProductList },
            { new: true }
        );
        return res
            .status(200)
            .json({ message: "Carrito editado exitosamente", cart: cartUpdate });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

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

const deleteProductFromCart = async (req, res) => {
    try {
        const { userId } = req;
        const { productId } = req.body
        const cartFound = await Cart.findOne({ user: userId })
        console.log(cartFound.products.map((p) => p))
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

module.exports = {
    createCart,
    deleteProduct,
    getCart,
    addToCart,
    addToCartMany,
    deleteProductFromCart,
};
