const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required:true},
    pictures: [{type: String, required:true}]

})

module.exports = mongoose.model("gallery", gallerySchema);