const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  body:{type:String,required:true}
  
},{
    timestamps:true,
    versionKey:false,

})

const comment = mongoose.model("comment",commentSchema);

module.exports = comment;