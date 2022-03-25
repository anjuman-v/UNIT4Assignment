const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    name: {type: String, required:true},
    price: {type: Number, required: true},
    imgUrl: [{type: String, required:true}]

},{

    versionKey: false,
    timestamps:true

})

module.exports = mongoose.model("product", productSchema)