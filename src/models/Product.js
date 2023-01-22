const { model, Schema, default: mongoose } = require('mongoose');

const ProductSchema = new Schema({
    category: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    outstanding: {
        type: Boolean,
    },
    price: {
        type: Number,
        require: true,
    },
    hotItem: {
        type: Boolean,
        require: true,
        default:false,
    },
    stock: {
        type: Number,
        require: true,
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