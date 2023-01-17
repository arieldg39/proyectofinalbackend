const { model, Schema, default: mongoose } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
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