const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  fiistName :{type:String,required:true},
  lastName:{type:String,required:true},
  age:{type:Number,required:true},
  email:{type:String,required:true}
},{
    timestamps:true,
    versionKey:false,

})

const user = mongoose.model("user",userSchema);

module.exports = user;