const Cart = require("../models/Cart");

const createCart = async (req, res) => {
    try {
        let quantityNew=0;
        let id_cart;
        const { product, quantity } = req.body;   
        console.log(product+" - "+quantity);
        /*const cart = await Cart.findOne({ userid: req.userid}) 
        if(!cart) {
            const payload = {                
                ...req.body,
                userid: req.userId
            }
            console.log(payload);
            const cart = new Cart(payload);
            await cart.save()
            return res.status(200).json({ message: "Carrito creado correctamente", cart, tipoerror:'ok'})
        } */        
        const productFoundInCart = await Cart.findOne({ product});        
        if(!productFoundInCart) {
            const payload = {                
                ...req.body,
                //userid: req.userId                
            }            
            const cart = new Cart(payload);
            await cart.save()
            return res.status(200).json({ message: "Producto Agregado al Carrito", cart, tipoerror:'ok'})
        }else{        
            const productFoundInCart = await Cart.find({ product});
            productFoundInCart.map((cartItem) =>{
                if (cartItem.product?.toString() !== product) return cartItem;
                quantityNew= cartItem.quantity + quantity;
                id_cart=cartItem._id;
            })            
            const cartUpdate = await Cart.findByIdAndUpdate(id_cart,{ quantity: quantityNew }, { new: true });
            //const cartLeng = await Cart.findOne({ userid: userid}).count.length;
            
            return res.status(200).json({ message: "Cantidad Modificada!!!", cartUpdate, tipoerror:'ok'});
        }
        
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message, tipoerror:'error' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const cartFound = await Cart.findOne({ owner: req.userId })
        const productInCart = cartFound.products.find((cartItem) => cartItem.product.toString() === product)
        if (quantity >= productInCart.quantity) {
            const updatedCart = await Cart.findbyIdAndUpdate(
            cartFound._id,
            { $pull: { product: req.body} },
            { new: true }
            );
        return res.status(200).json({ message: "Carrito creado correctamente", updatedCart})
        }
        const newProductList = cartFound.products.find((cartItem) =>{
                if (cartItem.product?.toString() !== product) return cartItem;
                return {
                    product,
                    quantity: cartItem.quantity - quantity,
                }
            })
        const cartUpdate = await Cart.findByIdAndUpdate(cartFound._id ,{products: newProductList}, {new: true})
        return res.status(200).json({ message: "Carrito editado exitosamente", cart: cartUpdate})
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message })
    }
}

const getCart = async (req, res) => {    
    try {
        const cartFound = await Cart.find();
        if (!cartFound) {
            return res.status(400).json({ message: "El usuario no tiene carritos activos" })
        }                     
        return res.status(200).json({ message: "Carrito conseguidoexitosamente", cart: cartFound})
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message })        
    }
}

module.exports = {
    createCart,
    deleteProduct,
    getCart
}