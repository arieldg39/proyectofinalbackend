const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
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
    // type: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ProductsType",
    // },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Product", ProductSchema);
