const mongoose = require("mongoose")

const publicationSchema = new mongoose.Schema({
  body:{type:String,required:true}
  
},{
    timestamps:true,
    versionKey:false,

})

const publication = mongoose.model("publication",publicationSchema);

module.exports = publication;