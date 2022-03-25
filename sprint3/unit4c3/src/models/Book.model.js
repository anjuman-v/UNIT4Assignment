const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
 likes :{type:Number,required:true},
  coverimg:{type:String,required:true},
  content:{type:Number,required:true},
 
},{
    timestamps:true,
    versionKey:false,

})

const book = mongoose.model("book",bookSchema);

module.exports = book;