const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require("cors");
const products = require("./routes/products");
const user = require("./routes/user");
const cart = require("./routes/cart");
const connectDb = require("./Db/connectDb");
const ProductsType = require("./routes/productsTypes");

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/products", products);
app.use("/productsType", ProductsType)
app.use("/user", user);
app.use("/cart", cart);

app.get("/", (req, res) => {
    res.json({ message: "Backend encontrado" });
});

app.listen(4000, () => console.log("Servidor funcionando en puerto 4000"));
