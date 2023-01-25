const { model, Schema } = require('mongoose');

const ProductsTypeSchema = new Schema({
    type: {
        type: String,
    },
},{
    versionKey: false
})

const ProductsType = model('ProductsType', ProductsTypeSchema);

module.exports = ProductsType;
