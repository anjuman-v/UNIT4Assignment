const mongoose = require("mongoose")

module.exports = () =>{
    return mongoose.connect("mongodb+srv://anjuman:anjuman@1999@cluster0.qunov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
}
module.exports = connect