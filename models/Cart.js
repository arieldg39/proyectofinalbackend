const { model, Schema, default:mongoose } = require("mongoose");

const CartSchema = new Schema({
    owner: {
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
                default: 1,
            },     
            _id: false     
        } 
    ]
},{
    versionKey: false
})


const Cart = model("CartSchema", CartSchema);

module.exports = Cart;