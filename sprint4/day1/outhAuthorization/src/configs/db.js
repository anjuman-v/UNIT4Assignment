const mongoose = require("mongoose");

module.exports = ()=>{

    //create db
    mongoose.connect("mongodb://127.0.0.1:27017/OAuth-live");

}