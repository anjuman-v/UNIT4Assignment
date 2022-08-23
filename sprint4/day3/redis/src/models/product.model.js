const mongoose = require("mongoose");

const productSechma = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
},{

    versionKey:false,
    timestamps:true

});

module.exports = mongoose.model("product", productSechma);