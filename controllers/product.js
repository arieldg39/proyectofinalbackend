const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
    
},{
    versionKey: false
})

const Products = model('products', ProductSchema);

module.exports = Product;