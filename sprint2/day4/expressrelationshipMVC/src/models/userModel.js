const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


    firstName:{ type: String, required: true},
    lastName: { type: String, required: true},
    gender: { type: String, required: true},
    DOB:{ type: Date, required: true},
    
}, {

    versionKey: false,
    timestamps:true
})


module.exports = mongoose.model("user", userSchema);
