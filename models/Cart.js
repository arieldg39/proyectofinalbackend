const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
    userid:{
        type: Schema.Types.ObjectId,
        ref: "user" 
    },
    product: {
        type: Schema.Types.ObjectId,
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