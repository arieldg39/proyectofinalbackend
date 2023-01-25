const { model, Schema, default:mongoose } = require("mongoose");

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
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductsType',
  },
  },
  {
    versionKey: false,
  }
);

const Product = model('Product', ProductSchema);

module.exports = Product;
