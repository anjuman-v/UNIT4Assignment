const express = require("express");


const app = express();

module.exports = app;

app.use(express.json());

const productCont = require("./controllers/product.controler");

app.use("/products", productCont);
