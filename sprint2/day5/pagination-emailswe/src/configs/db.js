const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://anjumam:anjuman@1999@cluster0.jo06w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};
