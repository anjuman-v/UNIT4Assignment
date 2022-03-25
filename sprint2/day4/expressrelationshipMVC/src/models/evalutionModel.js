const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({

    DateOfEvaluation:{type: Date, required:true, default: Date.now },
    instructor: { type: String,  required:true },
    topicName:{ type: String, required: true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    marks:{ type: Number, required: true}

},{

    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("evaluation", evaluationSchema);
