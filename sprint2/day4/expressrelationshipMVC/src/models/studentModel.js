const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    rollId: { type: String, required:true},
    currentBatch: { type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true },
    evaluationIds : [{ type: mongoose.Schema.Types.ObjectId, ref: "evaluation", required: true}]


},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("student", studentSchema);