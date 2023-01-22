const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    category: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    hotItem: {
      type: Boolean,
      require: true,
      default: false,
    },
    stock: {
      type: Number,
      require: true,
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
