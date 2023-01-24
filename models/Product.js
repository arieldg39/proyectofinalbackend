const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      img1: String,
      img2: String,
      img3: String,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    hotItem: {
      type: Boolean,
      required: true,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Product", ProductSchema);
