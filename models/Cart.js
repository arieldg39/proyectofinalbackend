const { model, Schema, default: mongoose } = require("mongoose");

const CartSchema = new Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" 
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product" 
    },
    quantity: {
        type: Number,
        default: 1,
    },         
},{
    versionKey: false
})


const Cart = model("Cart", CartSchema);

module.exports = Cart;