const { model, Schema, default:mongoose } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema(
  {
    image: {
      img1: Object,
      img2: Object,
      img3: Object,
    },
    name: {
      type: String,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    hotItem: {
      type: String,
    },
    stock: {
      type: Number,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ProductsType',
  },
  },
  {
    versionKey: false,
  }
);

ProductSchema.plugin(mongoosePaginate);

module.exports  = model('Product', ProductSchema);
