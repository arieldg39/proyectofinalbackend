const { model, Schema, default: mongoose } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    outstanding: {
        type: Boolean,
    },
    price: {
        type: Number,
    },
    stock: {
        type: String,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductsType',
    },
},{
    versionKey: false
})

const Product = model('Product', ProductSchema);

module.exports = Product;