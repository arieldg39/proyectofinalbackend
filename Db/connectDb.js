const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(Error);
  }
};

module.exports = connectDb;
