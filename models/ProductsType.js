const { model, Schema } = require('mongoose');

const ProductsTypeSchema = new Schema({
    type: {
        type: String,
    },
},{
    versionKey: false
})

module.exports = model('ProductsType', ProductsTypeSchema);
