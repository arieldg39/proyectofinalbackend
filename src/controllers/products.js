const Products = require("../models/Product");

const getProducts = async (req,res)=>{
  try {
    const allProducts = await Products.find()
      res.json(allProducts)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getProducts
}