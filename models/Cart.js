const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product" 
            },
            quantity: {
                type: Number,
                default: 1,
            },     
            _id: false     
},{
    versionKey: false
})


const Cart = model("CartSchema", CartSchema);

module.exports = Cart;