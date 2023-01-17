const { model, Schema, default: mongoose } = require('mongoose');

const TypeProductsSchema = new Schema({
    type: {
        String,
    },
    versionKey: false
})

const TypeProducts = model('TypeProducts', TypeProductSchema);

module.exports = TypeProducts;