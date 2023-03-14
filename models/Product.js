const { model, Schema, default: mongoose } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'El campo nombre es obligatorio'],
      trim: true,
    },
    image: {
      img1: Object,
      img2: Object,
      img3: Object,
    },
    name: {
      type: String,
      required: [true, 'El campo nombre es obligatorio'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'El campo marca es obligatorio'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'El campo descripción es obligatorio'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'El campo precio es obligatorio'],
      trim: true,
      min: 0,
    },
    hotItem: {
      type: String,
      required: [true, 'El campo destacados es obligatorio'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'El campo stock es obligatorio'],
      trim: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ProductsType',
      required: [true, 'El campo categoría es obligatorio'],
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

ProductSchema.plugin(mongoosePaginate);
module.exports = model('Product', ProductSchema);