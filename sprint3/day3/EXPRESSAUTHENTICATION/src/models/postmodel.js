const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
