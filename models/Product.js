const { model, Schema, default:mongoose } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema(
  {
    image: {
      img1: String,
      img2: String,
      img3: String,
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
