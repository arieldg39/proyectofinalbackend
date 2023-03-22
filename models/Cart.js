const { model, Schema, default: mongoose } = require("mongoose");

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
    }, {
        versionKey: false
    });

const Cart = model("Cart", CartSchema);

module.exports = Cart;